import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { Box, TextField, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { hideDialog } from "../store/modal";
import { saveContent } from "../store/app";

const emails = ["username@gmail.com", "user02@gmail.com"];
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

export default function SimpleDialog() {
  const classes = useStyles();
  const dialog = useSelector((store) => store.dialog);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (dialog.type === "EDIT_FILE") setOpen(true);
    else setOpen(false);
    setLabel(dialog.data?.content);
  }, [dialog.type]);

  const handleClose = () => {
    dispatch(hideDialog());
  };

  const submitHanlder = () => {
    dispatch(saveContent({ id: dialog.data.id, content: label }));
    dispatch(hideDialog());
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
          minWidth: 700,
        },
      }}
    >
      <Box p={5} display="flex" alignItems="center">
        <img width="70" src={process.env.PUBLIC_URL + "/assets/document.png"} />
        <Box p={1} />
        <Typography variant="h5">{dialog.data?.label}</Typography>
      </Box>
      <TextField
        multiline
        rows={15}
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter Text.."
        variant="outlined"
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
      />
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          style={{
            border: "1px solid #000",
            borderRadius: 50,
            width: 200,
            color: "#fff",
          }}
          onClick={submitHanlder}
          disabled={!label}
        >
          Save File
        </Button>
      </Box>
    </Dialog>
  );
}
