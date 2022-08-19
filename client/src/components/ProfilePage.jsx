import FormSection from "./FormSection";
import {useGetProfile} from "../hooks/useGetProfile.js";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {SERVER_URL} from "../../env.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import {useCurrentUser} from "../hooks/useCurrentUser.js";
import Models from "../lib/Models.js";
import {useGetProfileFriends} from "../hooks/useGetProfileFriends.js";
import Stack from "@mui/material/Stack";
import {ProfileItem} from "./ProfileItem";
import useMessage from "../hooks/useMessage.jsx";

export default function ProfilePage() {
  const params = useParams();
  const {data: profile, isLoading: isProfileLoading} = useGetProfile(params.profileId);
  const {
    data: friendProfiles,
    isLoading: isFriendProfilesLoading,
    refetch: refetchProfileFriends
  } = useGetProfileFriends(params.profileId);
  const navigate = useNavigate();
  const {currentUser, isCurrentUser, isLoggedIn} = useCurrentUser()
  const { showSuccessMessage, showErrorMessage } = useMessage()

  if (isProfileLoading) {
    return <Typography>Loading...</Typography>;
  }

  const handleFriendshipClick = async () => {
    try {
      await Models.build().createFriendship(currentUser.profileId, profile.id)
      refetchProfileFriends();
      showSuccessMessage("You've added " + profile.user.firstName + " as a friend!")
    } catch (e) {
      showErrorMessage(e.response.data.error.message)
    }
  }

  const _friendProfiles = isFriendProfilesLoading ? [] : friendProfiles;

  return (
    <FormSection>
      <Typography variant={"h4"} component={"h1"}
                  mb={4}>{profile.user.firstName + " " + profile.user.lastName}</Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <img height={200}
               src={profile.profilePic ? SERVER_URL + profile.profilePic : "https://picsum.photos/200?blur=10?random=" + profile.id}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant={"body1"} mb={4}>{profile.bio}</Typography>
        </Grid>
      </Grid>
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Typography variant={"subtitle2"} color={"text.secondary"} gutterBottom>
          {profile.location}
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"} mt={2}>
        <Typography variant={"h5"} component={"h2"}>{profile.user.firstName} friends</Typography>
        {_friendProfiles.length === 0 ? <Typography mt={2} variant={"body1"}>No friends so far...</Typography> : (
          <Stack direction={"row"}>
            {_friendProfiles.map((profile) => (
              <ProfileItem profile={profile} key={profile.id}/>
            ))}
          </Stack>)}
      </Box>
      <Stack mt={4} direction={"row"} spacing={2}>
        <Button onClick={() => navigate("/")}>Back to the home page</Button>
        {isCurrentUser(profile.user.id) ?
          <Button variant={"outlined"} onClick={() => navigate(`/profiles/${profile.id}/edit`)}>Edit</Button> :
          <Button disabled={!isLoggedIn} variant={"contained"} onClick={handleFriendshipClick}>Add as friend</Button>
        }
      </Stack>
    </FormSection>
  )
}