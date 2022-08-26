import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import { useLogOut } from "../hooks/useLogOut.js";
import { useNavigate } from "react-router-dom";

// Menu shown on top right when the user is logged in and clicking on the avatar
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, clearCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  // on logout mutation, clear the current user and navigate to the main page
  const { mutate: logOut } = useLogOut({
    onSuccess: () => {
      clearCurrentUser();
      navigate("/");
    },
  });

  // handle the menu opening and closing
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle the logout click
  const handleLogOutClick = () => {
    logOut();
    handleClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {currentUser.firstName && currentUser.firstName[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => navigate("/profiles/" + currentUser.profileId)}
        >
          <Avatar /> My home
        </MenuItem>
        <MenuItem onClick={() => navigate("/edit-profile")}>
          <Avatar /> Edit home
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOutClick}>
          <ListItemIcon>
            <Logout fontSize="small" onClick={logOut} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
