import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useGetStatusPosts} from "../hooks/useGetStatusPosts.js";
import {useCurrentUser} from "../hooks/useCurrentUser.js";
import Stack from "@mui/material/Stack";
import {PostItem} from "./PostItem.jsx";

function Posts() {

  const {currentUser} = useCurrentUser()
  const {data: posts, isLoading: isPostsLoading} = useGetStatusPosts()

  const currentUserId = currentUser ? currentUser.id : null

  const postsFromOthers = isPostsLoading ? [] : posts.filter(post => post.user.id !== currentUserId)

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Typography variant="h6" gutterBottom>
        Posts from other people
      </Typography>
      <Divider/>
      <Stack spacing={2}>
        {postsFromOthers.map((post) => (
          <PostItem key={post.id} post={post}/>
        ))}
      </Stack>
    </Grid>
  );
}

export default Posts;