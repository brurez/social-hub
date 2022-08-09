import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useGetStatusPosts} from "../hooks/useGetStatusPosts.js";
import {useCurrentUser} from "../hooks/useCurrentUser.js";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import {SERVER_URL} from "../../env.js";
import CardActionArea from "@mui/material/CardActionArea";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function PostItem(props) {
  const navigate = useNavigate();
  return <Card sx={{display: "flex"}}>
    <Box sx={{flex: "1 0 auto", m: 0}}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {props.post.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {props.post.description}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"} mt={2}>
          <Typography variant="subtitle2" color={"text.secondary"} gutterBottom>
            by {props.post.user.firstName} {props.post.user.lastName}
          </Typography>
          <Typography variant="subtitle2" color={"text.secondary"} gutterBottom>
            on {(new Date(props.post.createdAt)).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={() => navigate(`/posts/${props.post.id}`)}>
          Visit post page
        </Button>
      </CardActions>
    </Box>
    <CardMedia component={"img"}
               image={props.post.image ? SERVER_URL + props.post.image : "https://picsum.photos/200?blur=10?random=" + props.post.id}
               title={props.post.title} sx={{width: 160}}/>

  </Card>;
}

PostItem.propTypes = {post: PropTypes.any};

function Posts() {

  const {currentUser} = useCurrentUser()
  const {data: posts, isLoading: isPostsLoading} = useGetStatusPosts()

  const postsFromOthers = isPostsLoading ? [] : posts.filter(post => post.user.id === currentUser.id)

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