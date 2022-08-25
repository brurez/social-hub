import { Link as RouterLink } from "react-router-dom";
import { SERVER_URL } from "../../env.js";
import Link from "@mui/material/Link";
import * as React from "react";
import { StartChatButton } from "./StartChatButton.jsx";
import Grid from "@mui/material/Grid";

export function ProfileItem(props) {
  return (
    <>
      <Grid container key={props.profile.id}>
        <Grid item xs={2} display={"flex"}>
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
        <Grid item xs={5} display={"flex"} alignItems={"center"}>
          <RouterLink to={"/profiles/" + props.profile.id}>
            <Link variant={"body2"}>
              {props.profile.user.firstName} {props.profile.user.lastName}
            </Link>
          </RouterLink>
        </Grid>
        <Grid item xs={5} display={"flex"} alignItems={"center"} justifyContent={"end"}>
           <StartChatButton user2Id={props.profile.user.id} />
        </Grid>
      </Grid>
    </>
  );
}
