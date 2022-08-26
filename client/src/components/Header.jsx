import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Autocomplete, ButtonGroup } from "@mui/material";
import AccountMenu from "./AccountMenu.jsx";
import VisitorMenu from "./VisitorMenu.jsx";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import TextField from "@mui/material/TextField";
import { useGetProfilesSearch } from "../hooks/useGetProfileSearch.js";
import Stack from "@mui/material/Stack";

// Header component for the app
function Header(props) {
  const { title } = props;
  const { isLoggedIn } = useCurrentUser();
  const [searchValue, setSearchValue] = React.useState("");
  // Hook to get the profiles matching the search value
  const { data: profiles, isLoading: isProfilesLoading } = useGetProfilesSearch(
    { query: searchValue }
  );
  const navigate = useNavigate();

  // Handle search input change
  function handleSearchInputChange({ target: { value } }) {
    setSearchValue(value);
  }

  // Handle search selection click
  function handleSearchSelection(e, option) {
    setSearchValue("");
    option && navigate(`/profiles/${option.id}`);
  }

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <RouterLink to="/">
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
        </RouterLink>
        <Stack direction={"row"}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Autocomplete
            size={"small"}
            options={
              isProfilesLoading
                ? []
                : profiles.map((profile) => ({
                    label: `${profile.user.firstName} ${profile.user.lastName}`,
                    id: profile.id,
                  }))
            }
            sx={{ width: 300 }}
            onChange={handleSearchSelection}
            loading={isProfilesLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleSearchInputChange}
                placeholder={"Search friends"}
              />
            )}
          />
        </Stack>
        {isLoggedIn ? <AccountMenu /> : <VisitorMenu />}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
