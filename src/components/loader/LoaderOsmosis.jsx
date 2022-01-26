import React, { useEffect } from "react"
import {makeStyles } from "@material-ui/core"
import { createPortal } from "react-dom"
import { useLoader } from "../../contexts/LoaderProvider"
import {ReactComponent as OsmosisSVG} from './OsmosisSVG.svg';
const loaderRoot = document.getElementById("loader-root")

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
		osmosisContainer:{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		svgLogo:{
			width: "100%",
			height: "100%",
		}
}
})

const LoaderOsmosis = () => {
	const classes = useStyles()
	const { openLoader } = useLoader()

	let loaderElt = document.createElement("div")
	useEffect(() => {
		//Didmount
		loaderRoot.appendChild(loaderElt)
		return () => {
			//willUnmount
			loaderRoot.removeChild(loaderElt)
		}
	}, [loaderElt])

	return createPortal(
		<div className={openLoader ? `${classes.loaderRoot} ${classes.loaderRootDisplayed}` : classes.loaderRoot}>
			<div className={classes.osmosisContainer}>
			<OsmosisSVG  className={classes.svgLogo}/>
			</div>
		</div>,
		loaderRoot
	)
}

export default LoaderOsmosis
