import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DEFAULT_PROFILE_PIC, SERVER_URL } from "../../env.js";
import Button from "@mui/material/Button";
import * as React from "react";
import { useGetStatusPost } from "../hooks/useGetStatusPost.js";
import Models from "../lib/Models.js";
import { useNavigate, useParams } from "react-router-dom";
import FormSection from "./FormSection";
import Divider from "@mui/material/Divider";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import { AppLink } from "./AppLink";

export const EditPostContainer = ({ postId, title }) => {
  const { data: post, isLoading: isPostLoading } = useGetStatusPost(postId);
  if (isPostLoading) return <div>Loading...</div>;
  return <EditPost post={post} title={title} />;
};

export const ShowPostContainer = ({ postId, title }) => {
  const { data: post, isLoading: isPostLoading } = useGetStatusPost(postId);
  if (isPostLoading) return <div>Loading...</div>;
  return <DisplayPost post={post} />;
};

export const CreatePostPage = () => <EditPost title={"Create a new post"} />;
export const EditPostPage = () => {
  const params = useParams();
  return <EditPostContainer postId={params.postId} title={"Edit your post"} />;
};
export const ShowPostPage = () => {
  const params = useParams();
  return <ShowPostContainer postId={params.postId} />;
};

export function DisplayPost({ post }) {
  const { isCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  return (
    <FormSection maxWidth={1200}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Typography variant={"h4"} component={"h1"} mb={4}>
            {post.title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign={"right"}>
          {isCurrentUser(post.user.id) && (
            <Button
              variant={"contained"}
              onClick={() => navigate(`/posts/${post.id}/edit`)}
            >
              Edit
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <img
            style={{ width: "100%", height: "auto" }}
            src={
              post.image
                ? SERVER_URL + post.image
                : "https://picsum.photos/200?blur=10?random=" + post.id
            }
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant={"body1"} mb={4}>
            {post.description}
          </Typography>
        </Grid>
      </Grid>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mt={2}
        width={"100%"}
      >
        <AppLink to={"/profiles/" + post.profileId}>
          <Typography variant={"subtitle"} gutterBottom>
            Posted by {post.user.firstName} {post.user.lastName}
          </Typography>
        </AppLink>
        <Typography variant={"subtitle2"} color={"text.secondary"} gutterBottom>
          Post date: {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Box mt={4}>
        <Button onClick={() => navigate("/")}>Back to the home page</Button>
      </Box>
    </FormSection>
  );
}

export function EditPost({ post = {}, title }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await Models.build().createStatusPost(formData);
    navigate("/");
  };

  return (
    <FormSection>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="title"
              label="Title"
              id="title"
              defaultValue={post.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={6}
              fullWidth
              name="description"
              label="Description"
              id="description"
              defaultValue={post.description}
            />
          </Grid>
          <Grid item xs={12} ml={1}>
            <Typography variant="caption" color={"text.secondary"} mr={2}>
              Post image
            </Typography>
            <input
              type={"file"}
              name={"image"}
              id={"image"}
              defaultValue={post.image}
            />
          </Grid>
          <Grid item xs={12} ml={1}>
            {post.image ? (
              <img
                height={200}
                src={SERVER_URL + post.image || DEFAULT_PROFILE_PIC}
                alt={"profile pic"}
              />
            ) : (
              "No image"
            )}
          </Grid>
        </Grid>
        <Box mt={3} display={"flex"} justifyContent={"space-around"}>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{ width: "30%" }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ width: "30%" }}>
            Save
          </Button>
        </Box>
      </Box>
    </FormSection>
  );
}
