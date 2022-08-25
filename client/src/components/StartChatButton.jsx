import { useChatDrawer } from "../hooks/useChatDrawer.js";
import Button from "@mui/material/Button";
import { ChatBubble } from "@mui/icons-material";
import * as React from "react";

export function StartChatButton({ user2Id, size = "small" }) {
  const { openChatDrawer } = useChatDrawer();
  return (
    <Button
      sx={{ ml: 4 }}
      size={size}
      color={"secondary"}
      startIcon={<ChatBubble />}
      onClick={() => openChatDrawer(user2Id)}
    >
      {size === "small" ? "Chat" : "Start chat" }
    </Button>
  );
}
