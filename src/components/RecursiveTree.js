import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import Node from "./Node";
import getAncestors from "../utils/getAncestors";
import { useSelector, useDispatch } from "react-redux";
import { setActiveFolderId } from "../store/auth";
const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTree({ nodes }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeFolderId = useSelector((store) => store.auth.activeFolderId);
  let [ancestor, setAncestor] = useState([]);

  useEffect(() => {
    setAncestor(getAncestors(nodes, activeFolderId));
  }, [activeFolderId]);

  // Recursive function to create tree
  const createTree = (nodes = {}, parentId) => {
    return Object.values(nodes).map((node) => {
      if (node.parentId == parentId)
        return (
          <Node
            nodeId={node.id}
            id={node.id}
            label={node.label}
            type={node.type}
            content={node.content}
          >
            {createTree(nodes, node.id)}
          </Node>
        );
    });
  };
  return (
    <TreeView
      expanded={ancestor.map((node) => node[0])}
      className={classes.root}
    >
      {createTree(nodes, null)}
    </TreeView>
  );
}
