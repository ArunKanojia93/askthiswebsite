"use client";

import { Message, useChat } from "ai/react";
import { ChatInput } from "./ChatInput";
import { Messages } from "./Messages";

export const ChatWrapper = ({ sessionId, initialMessages }: { sessionId: string; initialMessages: Message[] }) => {
  const { messages, handleInputChange, input, handleSubmit, setInput } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  return (
    <div className="relative min-h-dvh bg-zinc-900 flex divide-t divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 flex flex-col">
        <Messages messages={messages} />
      </div>
      <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} setInput={setInput} />
    </div>
  );
};
