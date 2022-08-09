import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useGetProfiles} from "../hooks/useGetProfiles.js";
import {SERVER_URL} from "../../env.js";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {Link as RouterLink} from 'react-router-dom';
import {useCurrentUser} from "../hooks/useCurrentUser.js";

function ProfileItem(props) {
  return <Box width={"100%"}>
    <RouterLink to={"/"}>
      <img height={20} src={SERVER_URL + props.profile.profilePic}
           alt={props.profile.user.firstName + "" + props.profile.user.lastName}/>
      <Link pl={1} variant={"body2"}>{props.profile.user.firstName} {props.profile.user.lastName}</Link>
    </RouterLink>
    <Typography variant={"body2"}>{props.profile.location}</Typography>
    <Divider/>
  </Box>;
}

function HomeSidebar(props) {
  const {data: profiles, isLoading: isProfilesLoading} = useGetProfiles()
  const {currentUser} = useCurrentUser()

  const profilesToFollow = isProfilesLoading ? [] : profiles.filter(profile => profile.user.id !== currentUser.id)

  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h6" gutterBottom>
        Who to follow
      </Typography>
      <Paper sx={{p: 2}}>
        <Stack direction="row" spacing={1} alignItems="center">
          {profilesToFollow.map((profile) => (
            <ProfileItem profile={profile}/>
          ))}
        </Stack>
      </Paper>
    </Grid>
  );
}

export default HomeSidebar;