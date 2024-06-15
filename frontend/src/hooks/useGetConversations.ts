import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setConversations(data);
      } catch (error: any) {
        console.log("Error in useGetConversations Hook ", error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);
  return { conversations, isLoading };
};

export default useGetConversations;
