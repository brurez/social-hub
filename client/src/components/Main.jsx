import Grid from "@mui/material/Grid";
import Posts from "./Posts.jsx";
import Sidebar from "./Sidebar.jsx";
import * as React from "react";

export default function Main({ sidebar, posts, title }) {
  return (
    <main>
          {/*<MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>*/}
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Posts title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
  )
}