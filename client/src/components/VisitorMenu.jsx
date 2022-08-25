import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";

export default function VisitorMenu() {
  return (
    <Box>
      <RouterLink to="/signup" style={{ marginRight: 10 }}>
        <Button variant="contained" size="small">
          Sign up
        </Button>
      </RouterLink>
      <RouterLink to="/signin">
        <Button size="small">Sign in</Button>
      </RouterLink>
    </Box>
  );
}
