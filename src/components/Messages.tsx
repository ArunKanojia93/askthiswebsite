import { type Message as TMessage } from "ai/react";
import { MessageSquare } from "lucide-react";
import { Message } from "./Message";

interface MessagesProps {
  messages: TMessage[];
}
export const Messages = ({ messages }: MessagesProps) => {
  return (
    <div className="flex max-h-[calc(100dvh-3.5rem-7rem)] flex-1 flex-col gap-2 overflow-y-auto">
      {messages.length ? (
        messages.map((message) => <Message key={message.id} content={message.content} isUserMessage={message.role === "user"} />)
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center gap-2">
          <MessageSquare className="size-12 text-blue-500" />
          <h3 className="font-semibold text-2xl text-white">You&#39;re all set!</h3>
          <p className="text-zinc-500 text-xl">Ask your first question to get started.</p>
        </div>
      )}
    </div>
  );
};
