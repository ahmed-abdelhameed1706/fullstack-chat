import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      try {
        setIsLoading(true);
        const res = await fetch(`/api/messages/${selectedConversation.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setMessages(data);
      } catch (error: any) {
        console.log("Error in useGetMessages Hook ", error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [selectedConversation, setMessages]);

  return { messages, isLoading };
};

export default useGetMessages;
