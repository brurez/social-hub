import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { SERVER_URL } from "../../env.js";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { StartChatButton } from "./StartChatButton.jsx";
import Grid from "@mui/material/Grid";

export function ProfileItem(props) {
  return (
    <>
      <Grid container key={props.profile.id}>
        <Grid item xs={2}>
          <RouterLink to={"/profiles/" + props.profile.id}>
            <img
              height={40}
              src={SERVER_URL + props.profile.profilePic}
              alt={
                props.profile.user.firstName + " " + props.profile.user.lastName
              }
            />
          </RouterLink>
        </Grid>
        <Grid item xs={4} display={"flex"} alignItems={"center"}>
          <RouterLink to={"/profiles/" + props.profile.id}>
            <Link pl={1} variant={"body2"}>
              {props.profile.user.firstName} {props.profile.user.lastName}
            </Link>
          </RouterLink>
        </Grid>
        <Grid item xs={6} display={"flex"} alignItems={"center"} justifyContent={"end"}>
          <StartChatButton user2Id={props.profile.user.id} />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}
