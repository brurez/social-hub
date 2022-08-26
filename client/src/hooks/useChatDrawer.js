import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider.jsx";

// React hook to handle the chat drawer
export function useChatDrawer() {
  const [state, dispatch] = useContext(StoreContext);

  function closeChatDrawer() {
    dispatch({ type: "CLOSE_CHAT" });
  }

  function openChatDrawer(user2Id) {
    closeChatDrawer();

    dispatch({ type: "OPEN_CHAT", payload: { user2Id } });
  }

  return { openChatDrawer, closeChatDrawer, isOpen: state.chat.open, user2Id: state.chat.user2Id };
}
