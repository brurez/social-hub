import Grid from "@mui/material/Grid";
import Posts from "./Posts.jsx";
import HomeSidebar from "./HomeSidebar.jsx";
import * as React from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {useCurrentUser} from "../hooks/useCurrentUser.js";

export default function HomePage() {
  const navigate = useNavigate();
  const {isLoggedIn} = useCurrentUser();
  return (
    <main>
      <Stack p={5} sx={{textAlign: "center"}}>
        <Typography variant={"h4"}>Start today to share your life with everbody</Typography>
        <Box mt={3}>
          {isLoggedIn &&
            <Button variant={"contained"} onClick={() => navigate("/posts/create")}>Create a new Post</Button>}
          {!isLoggedIn &&
            (<>
              <Typography variant={"h6"} mb={2} color={"text.secondary"}>Sign up to be able to post an update about
                your
                life!</Typography>
              <Button sx={{width: 300}} variant={"contained"} onClick={() => navigate("/signup")}>Sign up</Button>
            </>)}
        </Box>
      </Stack>
      <Grid container spacing={5}>
        <Posts/>
        <HomeSidebar/>
      </Grid>
    </main>
  )
}