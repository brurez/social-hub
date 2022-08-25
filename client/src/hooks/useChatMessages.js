import { useEffect, useMemo, useState } from "react";
import ChatSocket from "../lib/ChatSocket.js";
import { useGetUser } from "./userGetUser.js";

export default function useChatMessages({ user1Id = null, user2Id = null }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const { data: user1, isLoading: isUser1Loading } = useGetUser(user1Id);
  const { data: user2, isLoading: isUser2Loading } = useGetUser(user2Id);

  useEffect(() => {
    if (user1Id && user2Id) {
      const _socket = new ChatSocket(user1Id, user2Id);
      setSocket(_socket);
    }
  }, [user1Id, user2Id]);

  useEffect(() => {
    if (socket) {
      const addMessage = (message) => {
        setMessages([
          ...messages,
          {
            text: message.text,
            userId: message.user_id,
            createdAt: message.created_at,
          },
        ]);
      }

      socket.onMessageReceived(addMessage);
    }
  }, [socket, messages]);

  function sendMessage(text) {
    socket.sendMessage(text);
  }

  const _messages = useMemo(() => {
    if (isUser1Loading || isUser2Loading) return [];
    const ms = [...messages]
    ms.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    return ms.map((message) => ({
      text: message.text,
      user: message.userId === user1Id ? user1 : user2,
      createdAt: message.createdAt,
    }));
  }, [messages, user1, user2, isUser1Loading, isUser2Loading]);

  return { messages: _messages, user2, sendMessage };
}
