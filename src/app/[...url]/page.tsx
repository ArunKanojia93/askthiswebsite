import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { cookies } from "next/headers";

interface Pageprops {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) => decodeURIComponent(component));
  return decodedComponents.join("/");
}

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

const Page = async ({ params }: Pageprops) => {
  const sessionCookie = cookies().get("sessionId")?.value;
  const reconstructedUrl = reconstructUrl({
    url: params.url as string[],
  });

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "");

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

  const { success } = await ratelimit.limit(sessionId);

  if (!isAlreadyIndexed && success) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  if (!success) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-2xl text-white">Too many requests! Please try again later.</p>
      </div>
    );
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
