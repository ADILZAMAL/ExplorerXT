import React from "react";
import findChildNode from "../utils/findChildNode";
import { Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setActiveFolderId } from "../store/auth";
import { showDialog } from "../store/modal";

const Folder = ({ node }) => {
  const dispatch = useDispatch();
  return (
    <Grid item onClick={() => dispatch(setActiveFolderId(node.id))}>
      <img
        width="100"
        src={process.env.PUBLIC_URL + "/assets/folder-closed.png"}
      />
      <Typography variant="body2" align="center">
        {node.label}
      </Typography>
    </Grid>
  );
};

const File = ({ node }) => {
  const dispatch = useDispatch();
  return (
    <Grid
      item
      onClick={() => dispatch(showDialog({ type: "EDIT_FILE", data: node }))}
    >
      <img width="100" src={process.env.PUBLIC_URL + "/assets/document.png"} />
      <Typography variant="body2" align="center">
        {node.label}
      </Typography>
    </Grid>
  );
};

export default function Main() {
  const nodes = useSelector((store) => store.app.entities);
  const activeFolderId = useSelector((store) => store.auth.activeFolderId);
  const child = findChildNode(nodes, activeFolderId);
  if (activeFolderId !== null && child.length === 0) {
    return (
      <Typography variant="h6" align="center">
        Folder is Empty
      </Typography>
    );
  }
  return (
    <Grid container spacing={5}>
      {child.map((node) => {
        if (node.type == "folder") return <Folder node={node} />;
        else return <File node={node} />;
      })}
    </Grid>
  );
}
