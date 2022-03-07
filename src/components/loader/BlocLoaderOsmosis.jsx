import React from "react"
import { makeStyles } from "@material-ui/core"
import { ReactComponent as OsmosisSVG } from "./OsmosisSVG.svg"

const useStyles = makeStyles((theme) => {
	return {
		loaderRoot: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: "-1",
			opacity: "0",
			transition: "all 0.3s",
			position: "absolute",
			backgroundColor: "rgba(0, 0, 0, 0.2)",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
		loaderRootBorderRadius: {
			borderRadius: "16px",
		},
		loaderRootDisplayed: {
			zIndex: 20,
			opacity: 1,
		},
		osmosisContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		svgLogo: {
			opacity: 0.7,
			width: "50%",
			height: "50%",
		},
		"@keyframes loadins": {
			"0%, 100%": {
				opacity: 0.2,
			},
			"50%": {
				opacity: 1,
			},
		},
		loading: {
			textShadow: "1px 1px 1px #231d4b",
			"& span": {
				opacity: 0.2,
			},
		},
		letter1: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.1s" },
		letter2: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.2s" },
		letter3: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.3s" },
		letter4: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.4s" },
		letter5: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.5s" },
		letter6: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.6s" },
		letter7: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.7s" },
		letter8: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.8s" },
		letter9: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "0.9s" },
		letter10: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "1s" },
		letter11: { 
			animation: "$loadins 2s linear infinite",
			animationDelay: "1.1s" },
	}
})

const BlocLoaderOsmosis = ({ open, borderRadius = false, classNameLoading, classNameLogoLoading }) => {
	const classes = useStyles()
	let className = borderRadius? `${classes.loaderRoot} ${classes.loaderRootBorderRadius} ` : classes.loaderRoot
	return (
		<div className={open ? `${className} ${classes.loaderRootDisplayed} ${classNameLoading}` : className}>
			<div className={classes.osmosisContainer}>
				<OsmosisSVG className={`${classes.svgLogo} ${classNameLogoLoading}`} />
				<p className={classes.loading}>
					<span className={classes.letter1}>L</span>
					<span className={classes.letter2}>o</span>
					<span className={classes.letter3}>a</span>
					<span className={classes.letter4}>d</span>
					<span className={classes.letter5}>i</span>
					<span className={classes.letter6}>n</span>
					<span className={classes.letter7}>g</span>
					<span className={classes.letter8}> </span>
					<span className={classes.letter9}>.</span>
					<span className={classes.letter10}>.</span>
					<span className={classes.letter11}>.</span>
				</p>
			</div>
		</div>
	)
}

export default BlocLoaderOsmosis
