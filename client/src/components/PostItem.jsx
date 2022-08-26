import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { SERVER_URL } from "../../env.js";
import PropTypes from "prop-types";
import * as React from "react";
import { AppLink } from "./AppLink";

// Component that show a compact information of a single user/profile
export function PostItem(props) {
  return (
    <Card sx={{ display: "flex", mb: 1 }} variant={"outlined"}>
      <CardContent sx={{ width: "100%" }}>
        <AppLink to={"/posts/" + props.post.id}>
          <Typography variant="h5" component={"h3"} gutterBottom>
            {props.post.title}
          </Typography>
        </AppLink>
        <Typography variant="body2" gutterBottom>
          {props.post.description.slice(0, 160)}
          {props.post.description.length > 160 ? "..." : ""}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"} mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            by {props.post.user.firstName} {props.post.user.lastName}
          </Typography>

          <Typography variant="subtitle2" color={"text.secondary"} gutterBottom>
            on {new Date(props.post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
      <CardMedia
        component={"img"}
        image={
          props.post.image
            ? SERVER_URL + props.post.image
            : "https://picsum.photos/200?blur=10?random=" + props.post.id
        }
        title={props.post.title}
        sx={{ width: 140 }}
      />
    </Card>
  );
}

PostItem.propTypes = { post: PropTypes.any };
