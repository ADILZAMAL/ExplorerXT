import React, { useState } from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import { alpha, makeStyles, Typography, withStyles } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import Collapse from "@material-ui/core/Collapse";
import { useSelector, useDispatch } from "react-redux";
import { setActiveFolderId } from "../store/auth";
import { showDialog } from "../store/modal";

const useNodeStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

export default Node = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}))(({ type, id, label, content, ...props }) => {
  const dispatch = useDispatch();
  const classes = useNodeStyles();
  const [open, setOpen] = useState(false);
  const nodes = useSelector((store) => store.app.entities);

  const onClickHandler = () => {
    if (type == "file") {
      dispatch(
        showDialog({
          type: "EDIT_FILE",
          data: {
            id,
            type,
            content,
          },
        })
      );
    } else {
      open === true
        ? dispatch(setActiveFolderId(nodes[id].parentId))
        : dispatch(setActiveFolderId(id));
      setOpen((open) => !open);
    }
  };

  return (
    <TreeItem
      onClick={onClickHandler}
      label={
        <div className={classes.labelRoot}>
          {/* If noe is folder and node is open */}
          {type === "folder" && open && (
            <img
              className={classes.labelIcon}
              src={process.env.PUBLIC_URL + "/assets/folder-open.png"}
              width="15"
            />
          )}
          {/* If node is folder and node is closed */}
          {type === "folder" && !open && (
            <img
              className={classes.labelIcon}
              src={process.env.PUBLIC_URL + "/assets/folder-closed.png"}
              width="15"
            />
          )}
          {/* If node is file  */}
          {type === "file" && (
            <img
              className={classes.labelIcon}
              src={process.env.PUBLIC_URL + "/assets/document.png"}
              width="15"
            />
          )}
          <Typography variant="body2">{label}</Typography>
        </div>
      }
      {...props}
      TransitionComponent={TransitionComponent}
    />
  );
});
