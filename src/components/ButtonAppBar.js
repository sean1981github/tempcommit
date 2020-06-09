import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Axios from "../utils/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonAppBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Axios.post("/users/logout");
    props.setLoggedIn(false);
    props.history.push("/login", { message: "You have logged out" });
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="secondary"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography>Welcome, {props.username}!</Typography>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem data-testid="logoutButton" onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
