import React, { useEffect } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { createPortal } from "react-dom";
const loaderRoot = document.getElementById("loader-root");

const useStyles = makeStyles((theme) => {
    return {
        loaderRoot: {
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "-1",
            opacity: "0",
            transition: "all 0.3s",
        },
        loaderRootDisplayed: {
            zIndex: "1101",
            opacity: "1",
        },
    };
});

const Loader = ({ open }) => {
    const classes = useStyles();

    let loaderElt = document.createElement("div");
    useEffect(() => {
        //Didmount
        loaderRoot.appendChild(loaderElt);
        return () => {
            //willUnmount
            loaderRoot.removeChild(loaderElt);
        };
    }, [loaderElt]);

    return createPortal(
        <div className={open ? `${classes.loaderRoot} ${classes.loaderRootDisplayed}` : classes.loaderRoot}>
            <CircularProgress size={200} thickness={1} />
        </div>,
        loaderRoot
    );
};

export default Loader;