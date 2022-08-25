import Box from "@mui/material/Box";
import {Link as RouterLink} from "react-router-dom";
import {SERVER_URL} from "../../env.js";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {StartChatButton} from "./StartChatButton.jsx";

export function ProfileItem(props) {
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
      <StartChatButton user2Id={props.profile.user.id}/>
      <Typography variant={"body2"}>{props.profile.location}</Typography>
      <Divider />
    </Box>
  );
}
