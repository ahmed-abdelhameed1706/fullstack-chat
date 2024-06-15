import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";

const Messages = () => {
  const { messages, isLoading } = useGetMessages();
  const { selectedConversation } = useConversation();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {isLoading && (
        <span className="flex items-center justify-center loading loading-spinner mx-auto h-full " />
      )}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messageEndRef} />
      {!isLoading && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-200">
            Send a message to start a conversation with{" "}
            {selectedConversation?.fullName}
          </p>
        </div>
      )}
    </div>
  );
};
export default Messages;
