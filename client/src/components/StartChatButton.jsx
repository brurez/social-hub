import { useChatDrawer } from "../hooks/useChatDrawer.js";
import Button from "@mui/material/Button";
import { ChatBubble } from "@mui/icons-material";
import * as React from "react";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import Tooltip from "@mui/material/Tooltip";

export function StartChatButton({ user2Id, size = "small" }) {
  const { openChatDrawer } = useChatDrawer();
  const { isLoggedIn } = useCurrentUser();
  return (
    <Tooltip title={isLoggedIn ? "" : "You need to sign in to chat"}>
      <span>
        <Button
          disabled={!isLoggedIn}
          size={size}
          color={"secondary"}
          startIcon={<ChatBubble />}
          onClick={() => openChatDrawer(user2Id)}
        >
          {size === "small" ? "Chat" : "Start chat"}
        </Button>
      </span>
    </Tooltip>
  );
}
