import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {useGetProfiles} from "../hooks/useGetProfiles.js";
import {useCurrentUser} from "../hooks/useCurrentUser.js";
import {ProfileItem} from "./ProfileItem.jsx";

function HomeSidebar(props) {
  const {data: profiles, isLoading: isProfilesLoading} = useGetProfiles()
  const {currentUser} = useCurrentUser()

  const currentUserId = currentUser ? currentUser.id : null

  const profilesToFollow = isProfilesLoading ? [] : profiles.filter(profile => profile.user.id !== currentUserId)

  return (
    <Grid item xs={12} md={4}>
      <Typography variant="h6" gutterBottom>
        Who to follow
      </Typography>
      <Paper sx={{p: 2}}>
        <Stack spacing={1} alignItems="center">
          {profilesToFollow.map((profile) => (
            <ProfileItem profile={profile}/>
          ))}
        </Stack>
      </Paper>
    </Grid>
  );
}

export default HomeSidebar;