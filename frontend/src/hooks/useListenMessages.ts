import { useEffect } from "react";

import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

import notification from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      message.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessages([...messages, message]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
