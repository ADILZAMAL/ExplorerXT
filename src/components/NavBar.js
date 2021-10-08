import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import { Box, Divider, IconButton, makeStyles } from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import { useDispatch } from "react-redux";

import Toolbar from "@material-ui/core/Toolbar";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { drawerWidthContext } from "../App";
import BreadCrumb from "./BreadCrumb";
import { showDialog } from "../store/modal";

export default function NavBar() {
  const dispatch = useDispatch();
  const [drawerWidth] = useContext(drawerWidthContext);

  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: `calc(100% - ${drawerWidth}px)`,
      background: theme.palette.background.default,
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFileClick = () => {
    dispatch(showDialog({ type: "ADD_FILE" }));
    setAnchorEl(null);
  };

  const handleFolderClick = () => {
    dispatch(showDialog({ type: "ADD_FOLDER" }));
    setAnchorEl(null);
  };

  return (
    <AppBar elevation={0} position="fixed" className={classes.appBar}>
      <Toolbar
        style={{
          height: 100,
          margin: 24,
          borderBottom: "1px solid rgba(0,0,0,0.3)",
        }}
      >
        <Box display="flex" alignItems="center" width="100%" height="100%">
          <BreadCrumb />
          <Box marginLeft="auto">
            <SearchBar placeholder="Search.." />
          </Box>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AddCircleRoundedIcon
                fontSize="large"
                style={{
                  color: "rgba(253,189,64,255)",
                }}
              />
            </IconButton>
            <Menu
              PaperProps={{
                style: {
                  background: "rgba(44,45,49,255)",
                  color: "#fff",
                  borderRadius: 20,
                  padding: "0 20px",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              open={open}
              // onClose={handleClose}
            >
              <MenuItem onClick={handleFileClick}>File</MenuItem>
              <Divider />
              <MenuItem onClick={handleFolderClick}>Folder</MenuItem>
            </Menu>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
