import { useEffect, useMemo, useState } from "react";
import ChatSocket from "../lib/ChatSocket.js";
import { useGetUser } from "./userGetUser.js";
import MessagingApi from "../lib/MessagingApi.js";

// React hook to handle chat messages
export default function useChatMessages({
  user1Id = null,
  user2Id = null,
  onMessage = () => {},
}) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // gets the user data
  const { data: user1, isLoading: isUser1Loading } = useGetUser(user1Id);
  const { data: user2, isLoading: isUser2Loading } = useGetUser(user2Id);

  // gets all old messages of this chat room
  function fetchOldMessages() {
    MessagingApi.build()
      .getChat(user1Id, user2Id)
      .then((chat) => {
        const _messages = chat.messages.map((message) => {
          return {
            text: message.text,
            userId: message.user.id,
            createdAt: new Date(message.createdAt).getTime() / 1000,
          };
        });
        setMessages(_messages);
      });
  }

  // creates a new socket connection when the users are loaded
  useEffect(() => {
    if (user1Id && user2Id) {
      const _socket = new ChatSocket(user1Id, user2Id);
      setSocket(_socket);
      fetchOldMessages();
    }
  }, [user1Id, user2Id]);

  // listens to new messages when a socket is created
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
      };
      // adds callback to get new messages
      socket.onMessageReceived(addMessage);
    }
  }, [socket, messages]);

  function sendMessage(text) {
    socket.sendMessage(text);
  }

  // memoizes the messages to avoid re-rendering
  const _messages = useMemo(() => {
    if (isUser1Loading || isUser2Loading) return [];
    // callback to make the chat window scroll to the bottom
    setTimeout(onMessage, 500);
    return messages.map((message) => ({
      text: message.text,
      user: message.userId === user1Id ? user1 : user2,
      createdAt: message.createdAt,
    }));
  }, [messages, user1, user2, isUser1Loading, isUser2Loading]);

  return { messages: _messages, user2, sendMessage };
}
