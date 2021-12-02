import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const useStyles = makeStyles((theme) => ({
  pathRoot: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  pathLink: {
    cursor: "pointer",
  },
  currentPath: {
    color: theme.palette.gray.contrastText,
  },
}));

const TokenPath = ({ token }) => {
  const classes = useStyles();
  const history = useHistory();
  const go = (path) => {
    history.push(path);
  };

  const name = token && token?.name ? token.name : "";
  return (
    <div className={classes.pathRoot}>
      <p
        className={` ${classes.pathLink}`}
        onClick={() => {
          go("/");
        }}
      >
        Overview
      </p>
      <ChevronRightIcon className={classes.icons} />
      <p
        className={` ${classes.pathLink}`}
        onClick={() => {
          go("/tokens");
        }}
      >
        Tokens
      </p>
      <ChevronRightIcon className={classes.icons} />
      <p className={` ${classes.currentPath}`}>{name}</p>
    </div>
  );
};

export default TokenPath;
