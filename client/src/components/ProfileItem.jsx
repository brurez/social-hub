import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { SERVER_URL } from "../../env.js";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as React from "react";
import Button from "@mui/material/Button";
import { ChatBubble } from "@mui/icons-material";
import { useChatDrawer } from "../hooks/useChatDrawer.js";

export function ProfileItem(props) {
  const { openChatDrawer } = useChatDrawer();
  return (
    <Box width={"100%"} key={props.profile.id}>
      <RouterLink to={"/profiles/" + props.profile.id}>
        <img
          height={20}
          src={SERVER_URL + props.profile.profilePic}
          alt={props.profile.user.firstName + " " + props.profile.user.lastName}
        />
        <Link pl={1} variant={"body2"}>
          {props.profile.user.firstName} {props.profile.user.lastName}
        </Link>
      </RouterLink>
      <Button
        sx={{ ml: 4 }}
        size={"small"}
        startIcon={<ChatBubble />}
        onClick={() => openChatDrawer(props.profile.user.id)}
      >
        Start chat
      </Button>
      <Typography variant={"body2"}>{props.profile.location}</Typography>
      <Divider />
    </Box>
  );
}
