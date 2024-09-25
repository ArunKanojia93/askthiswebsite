"use client";
import { Logo } from "@/components/Logo";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url) {
      const isValidUrl = url.startsWith("https://") || url.startsWith("http://");
      if (isValidUrl) {
        window.location.href = window.location.origin + "/" + url;
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 justify-center items-center h-full px-4 text-center sm:px-0">
      <Logo />
      <div className="flex flex-col items-center justify-center gap-2">
        <MessageSquare className="size-12 text-blue-500" />
        <h3 className="font-semibold text-2xl text-white">Enter a link or...</h3>
        <p className="text-zinc-400 text-xl">
          Add{" "}
          <Tooltip closeDelay={100} placement="top-start" color="success" content="Copy URL">
            <Button
              className="text-blue-500 bg-zinc-900 hover:bg-zinc-800"
              onClick={() => {
                navigator.clipboard.writeText("https://askthiswebsite-beta.vercel.app/");
              }}
            >
              https://askthiswebsite-beta.vercel.app/
            </Button>
          </Tooltip>{" "}
          before any URL.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 w-full max-w-sm relative">
        <Input value={url} onChange={(e) => setUrl(e.target.value)} type="text" name="url" id="url" placeholder="https://example.com" className="w-full border border-zinc-700 bg-zinc-800 p-2 rounded-xl text-base pr-16" />
        <Button size="sm" className="absolute z-10 border border-border bg-zinc-900 right-2" type="submit">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
