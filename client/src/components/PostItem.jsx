import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import {SERVER_URL} from "../../env.js";
import PropTypes from "prop-types";
import * as React from "react";

export function PostItem(props) {
  const navigate = useNavigate();
  return <Card sx={{display: "flex", mb: 1}} variant={"outlined"}>
    <Box sx={{flex: "1 0 auto", m: 0}}>
      <CardContent>
        <Typography variant="h5" component={"h3"} gutterBottom>
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