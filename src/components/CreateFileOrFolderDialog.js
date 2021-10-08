import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { Box, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { hideDialog } from "../store/modal";
import { addFileOrFolder } from "../store/app";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "rgba(255, 255, 255, 0.5) !important",
  },
  cssOutlinedInput: {
    color: "#fff",
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const dialog = useSelector((store) => store.dialog);
  const activeFolderId = useSelector((store) => store.auth.activeFolderId);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (dialog.type === "ADD_FILE" || dialog.type === "ADD_FOLDER")
      setOpen(true);
    else setOpen(false);
  }, [dialog.type]);

  const handleClose = () => {
    dispatch(hideDialog());
  };

  const submitHanlder = () => {
    if (dialog.type === "ADD_FILE") {
      dispatch(
        addFileOrFolder({ type: "file", label, parentId: activeFolderId })
      );
    } else {
      dispatch(
        addFileOrFolder({ type: "folder", label, parentId: activeFolderId })
      );
    }
    dispatch(hideDialog());
    setLabel("");
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      PaperProps={{
        style: {
          background: "#2c2d31",
          color: "#fff",
          padding: "50px 20px",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "50px",
        },
      }}
    >
      <Box p={5} display="flex" alignItems="center">
        <img
          width="70"
          src={
            process.env.PUBLIC_URL + dialog.type === "ADD_FOLDER"
              ? "/assets/folder-closed.png"
              : "/assets/document.png"
          }
        />
        <Box p={1} />
        <TextField
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={
            dialog.type === "ADD_FILE" ? "Enter File Name" : "Enter Folder Name"
          }
          variant="outlined"
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          style={{
            border: "1px solid #000",
            borderRadius: 50,
            marginTop: "auto",
            width: 200,
            color: "#fff",
          }}
          onClick={submitHanlder}
          disabled={!label}
        >
          {dialog.type === "ADD_FILE" ? "Create File" : "Creat Folder"}
        </Button>
      </Box>
    </Dialog>
  );
}
