import { makeStyles } from "@material-ui/core"

const ChartSkeleton = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootChartSkeleton}>
			<svg
				className={classes.svg}
				id="Layer_1"
				data-name="Layer 1"
				xmlns="http://www.w3.org/1700/svg"
				viewBox="0 0 596.74 348.64"
			>
				<title>line</title>
				<path
					className={classes.path}
					d="M4.5,363.5c17.29-43.4,27.59-55.17,34-54,5.65,1,7.16,11.92,13,12,9.12.13,12.2-26.29,21-27,11.53-.93,19.36,43.39,29,43,13.9-.57,8.6-93.27,37-102,26.65-8.19,58.81,65,84,58,33.79-9.39,19.2-153.09,29-154,12-1.11,39.63,215.06,64,214,11.75-.51,17.19-51.26,32-51,11.85.2,17.84,32.85,23,32,10.88-1.8-7.51-148.28,6-151,8.16-1.64,19.58,50.87,34,50,22.87-1.39,27.18-135.44,46-136,14.38-.42,21.36,77.57,39,78,23.29.57,41.61-134.65,59-133,9.59.91,10.6,42.62,19,43,7.64.34,15.63-33.69,22-69"
					transform="translate(-1.71 -15.97)"
				/>
			</svg>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootChartSkeleton: {
			height: "100%",
			width: "100%",
		},
		svg: {},
		skeleton: {},
		path: {
			fill: "none",
			strokeDashoffset: 1700,
			strokeDasharray: 1700,
			stroke: theme.palette.gray.textDark3,
			strokeMiterlimit: "10",
			strokeWidth: "6px",
			animation: "$loading 2s linear forwards infinite",
		},
		"@keyframes loading": {
			"0%": {
				strokeDashoffset: 1700,
			},
			"50%": {
				strokeDashoffset: 0,
			},
            "100%": {
				strokeDashoffset: -1700,
			},
		},
	}
})

export default ChartSkeleton
