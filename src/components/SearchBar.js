import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, Paper } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import propTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  search: {
    marginLeft: 0,
    width: "100%",
    position: "relative",
    borderRadius: "20px",
    color: "#fff",
    backgroundColor: theme.palette.background.darkLight,
    padding: "3px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: "0",
    top: "50%",
    color: grey[700],
    transform: "translate(0%, -50%)",
  },
  inputRoot: {
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "white",
  },
}));

export default function SearchBar({ value, onChange, placeholder }) {
  const classes = useStyles();
  return (
    <Paper style={{}} className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={onChange}
      />
    </Paper>
  );
}

SearchBar.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func,
};
