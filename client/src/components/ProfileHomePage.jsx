import FormSection from "./FormSection";
import { useGetProfile } from "../hooks/useGetProfile.js";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import CoreApi from "../lib/CoreApi.js";
import { useGetProfileFriends } from "../hooks/useGetProfileFriends.js";
import Stack from "@mui/material/Stack";
import { ProfileItem } from "./ProfileItem";
import useMessage from "../hooks/useMessage.jsx";
import Divider from "@mui/material/Divider";
import { useGetProfileStatusPosts } from "../hooks/useGetProfileStatusPosts.js";
import { PostItem } from "./PostItem.jsx";
import { StartChatButton } from "./StartChatButton";

// Page for viewing a profile
export default function ProfileHomePage() {
  const params = useParams();
  // Hook for getting the profile
  const { data: profile, isLoading: isProfileLoading } = useGetProfile(
    params.profileId
  );
  // Hook for getting the profile's posts
  const { data: posts, isLoading: isPostsLoading } = useGetProfileStatusPosts(
    params.profileId
  );
  // Hook for getting the profile's friends
  const {
    data: friendProfiles,
    isLoading: isFriendProfilesLoading,
    refetch: refetchProfileFriends,
  } = useGetProfileFriends(params.profileId);
  const navigate = useNavigate();
  const { currentUser, isCurrentUser, isLoggedIn } = useCurrentUser();
  const { showSuccessMessage, showErrorMessage } = useMessage();

  if (isProfileLoading) {
    return <Typography>Loading...</Typography>;
  }

  // calls api to create a friendship when the user clicks the button
  const handleFriendshipClick = async () => {
    try {
      await CoreApi.build().createFriendship(currentUser.profileId, profile.id);
      refetchProfileFriends();
      showSuccessMessage(
        "You've added " + profile.user.firstName + " as a friend!"
      );
    } catch (e) {
      showErrorMessage(e.response.data.error.message);
    }
  };

  const _friendProfiles = isFriendProfilesLoading ? [] : friendProfiles;
  return (
    <FormSection maxWidth={1200}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Typography variant={"h4"} component={"h1"}>
            {profile.user.firstName + " " + profile.user.lastName}
          </Typography>
        </Grid>
        <Grid item textAlign={"right"} xs={12} md={6}>
          {isCurrentUser(profile.user.id) ? (
            <Button
              variant={"outlined"}
              onClick={() => navigate(`/edit-profile`)}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                disabled={!isLoggedIn}
                variant={"contained"}
                onClick={handleFriendshipClick}
              >
                Add as friend
              </Button>
              <StartChatButton user2Id={profile.user.id} size={"medium"} />
            </>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <img
            width={"100%"}
            style={{ maxWidth: 300 }}
            src={
              profile.profilePic
                ? profile.profilePic
                : "https://picsum.photos/200?blur=10?random=" + profile.id
            }
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant={"body2"} mb={4}>
            {profile.biography}
          </Typography>
        </Grid>
      </Grid>
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Typography variant={"subtitle1"} gutterBottom>
          Location: {profile.location}
        </Typography>
      </Box>
      <Grid container spacing={5} mt={2}>
        <Grid item xs={12} md={4}>
          <Typography variant={"h5"} mb={2} component={"h2"}>
            {profile.user.firstName}'s friends
          </Typography>
          {_friendProfiles.length === 0 ? (
            <Typography mt={2} variant={"body1"}>
              No friends so far...
            </Typography>
          ) : (
            <Stack direction={"column"}>
              {_friendProfiles.map((profile) => (
                <ProfileItem profile={profile} key={profile.id} />
              ))}
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant={"h5"} component={"h2"} mb={2}>
            Posts
          </Typography>
          {!isPostsLoading &&
            posts.map((post) => <PostItem post={post} key={post.id} />)}
        </Grid>
      </Grid>
      <Divider />
      <Stack mt={4} direction={"row"} spacing={2}>
        <Button onClick={() => navigate("/")}>Back to the home page</Button>
      </Stack>
    </FormSection>
  );
}
