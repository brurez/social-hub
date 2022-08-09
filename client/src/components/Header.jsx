import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import {ButtonGroup} from "@mui/material";
import Box from "@mui/material/Box";
import AccountMenu from "./AccountMenu.jsx";
import VisitorMenu from "./VisitorMenu.jsx";
import {useCurrentUser} from "../hooks/useCurrentUser.js";

function Header(props) {
  const {title} = props;
  const { isLoggedIn } = useCurrentUser();

  return (
    <React.Fragment>
      <Toolbar sx={{borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "space-between"}}>
        <RouterLink to="/">
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{flex: 1}}
          >
            {title}
          </Typography>
        </RouterLink>
        <IconButton>
          <SearchIcon/>
        </IconButton>
        { isLoggedIn ? <AccountMenu/> : <VisitorMenu/> }
      </Toolbar>

    </React.Fragment>
  );
}

export default Header;