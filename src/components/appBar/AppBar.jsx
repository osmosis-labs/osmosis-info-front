import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "./logo.png";
import Search from "./Search";

import snowMan from "../../assets/snowman.png";
const useStyles = makeStyles((theme) => {
  return {
    appBarRoot: {
      position: "fixed",
      zIndex: "1",
      marginTop: "40px",
    },
    appBarContent: {
      zIndex: "-2",
      position: "relative",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.palette.primary.dark,
      width: "100vw",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    logo: {
      height: "25px",
      width: "25px",
      cursor: "pointer",
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
      transition: "all 0.3s",
      "&:hover": {
        transform: "rotate(-20deg)",
      },
      [theme.breakpoints.down("sm")]: {
        margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(4)}px`,
      },
    },
    left: {
      display: "flex",
      flexDirection: "row",
      flexGrow: "2",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "space-between",
        width: "100%",
      },
    },
    right: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },

    menu: {
      margin: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(2)}px`,
      [theme.breakpoints.down("sm")]: {
        margin: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(4)}px`,
      },
    },
    menuItem: {
      color: theme.palette.gray.dark,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      textDecoration: "none",
      transition: "all 0.2s",
      "&:hover": {
        color: theme.palette.gray.contrastText,
      },
    },
    menuItemActive: {
      color: theme.palette.gray.contrastText,
      backgroundColor: theme.palette.primary.light,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
    },
  };
});

const AppBar = () => {
  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname, setCurrentPath]);
  return (
    <div className={classes.appBarRoot + " appBar-christmast"}>
      <div className="appBar_container-christmast">
        <img src={snowMan} className="appBar_image-snowman" alt="" />
        <img src={snowMan} className="appBar_image-snowman2" alt="" />
        <div className="reindeer"></div>
      </div>
      <div className={classes.appBarContent}>
        <div className={classes.left}>
          <img
            className={classes.logo}
            src={logo}
            alt="Osmosis logo"
            onClick={() => {
              history.push("/");
            }}
          />
          <div className={classes.menu}>
            <Link
              to="/"
              className={currentPath === "/" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
            >
              Overview
            </Link>
            <Link
              to="/pools"
              className={currentPath === "/pools" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
            >
              Pools
            </Link>
            <Link
              to="/tokens"
              className={currentPath === "/tokens" ? `${classes.menuItem} ${classes.menuItemActive}` : classes.menuItem}
            >
              Tokens
            </Link>
          </div>
        </div>
        <div className={classes.right}>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default AppBar;
