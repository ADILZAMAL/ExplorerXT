import React, { useCallback, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { drawerWidthContext } from "../App";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { Box, Button, CssBaseline, Typography } from "@material-ui/core";
import RecursiveTree from "./RecursiveTree";
import { useSelector } from "react-redux";
const minDrawerWidth = 100;
const maxDrawerWidth = 1000;

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "15px",
    height: "100%",
    margin: theme.spacing(3),
    marginRight: theme.spacing(5),
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.background.darkLight,
    color: "white",
    position: "relative",
  },
  drawer: {
    flexShrink: 0,
  },
  button: {
    border: "1px solid #000",
    borderRadius: 50,
    marginTop: "auto",
    position: "absolute",
    bottom: 15,
    width: 200,
    color: "#fff",
  },
  toolbar: {
    height: 100,
    display: "flex",
    alignItems: "center",
    "&>*": {
      marginRight: 15,
    },
  },

  dragger: {
    color: "#888888",
    display: "flex",
    alignItems: "center",
    width: "35px",
    position: "absolute",
    top: 0,
    right: -40,
    bottom: 0,
    zIndex: 100,
    "&>*": {
      cursor: "ew-resize",
    },
  },
}));

export default function CustomDrawer() {
  const classes = useStyles();
  const nodes = useSelector((store) => store.app.entities) || {};
  const [drawerWidth, setDrawerWidth] = useContext(drawerWidthContext);

  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        PaperProps={{
          style: { width: drawerWidth, backgroundColor: "inherit" },
          className: classes.list,
        }}
      >
        <div className={classes.content}>
          <div className={classes.toolbar}>
            <img src={process.env.PUBLIC_URL + "/assets/logo.png"} width="50" />
            <Typography variant="h6">ExploreXT</Typography>
          </div>
          <div className={classes.dragger}>
            <div onMouseDown={(e) => handleMouseDown(e)}>
              <div>
                <DragIndicatorIcon />
              </div>
            </div>
          </div>
          <RecursiveTree nodes={nodes} />
          <Button className={classes.button}>LOCK</Button>
        </div>
        <Divider />
      </Drawer>
    </Box>
  );
}
