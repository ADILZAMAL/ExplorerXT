import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Main from "./components/Main";

import SideBar from "./components/SideBar";

import NavBar from "./components/NavBar";
import CreateFileOrFolderDialog from "./components/CreateFileOrFolderDialog";
import EditFileDialog from "./components/EditFileDialog";
import { fetchData } from "./store/app";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 100,
  },
  toolbar: theme.mixins.toolbar,
}));

export const drawerWidthContext = createContext();
export const activeFolderIdContext = createContext();

export default function App() {
  const dispatch = useDispatch();
  const [drawerWidth, setDrawerWidth] = useState(300);
  const classes = useStyles();

  // On app load load app data from localStroage
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <drawerWidthContext.Provider value={[drawerWidth, setDrawerWidth]}>
      <div className={classes.root}>
        <NavBar />
        <SideBar />
        <main className={classes.content} style={{ marginLeft: drawerWidth }}>
          <div className={classes.toolbar} />
          <Main />
        </main>
      </div>
      <CreateFileOrFolderDialog />
      <EditFileDialog />
    </drawerWidthContext.Provider>
  );
}
