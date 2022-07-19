import { makeStyles } from "@material-ui/core"
import { formatDate } from "../../helpers/helpers"

const LogItem = ({ date, items }) => {
	const classes = useStyles()
	const diffTime = Math.abs(new Date() - date)
	let nbDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	return (
		<div className={classes.rootLogItem}>
			<div className={classes.date}>{formatDate(date)}</div>
			<span className={classes.nbDays}>{nbDays} days</span>
			<div className={classes.items}>
				<ul>
					{items.map((item, i) => {
						if (item.type === "text") {
							return (
								<li key={i} className={classes.text}>
									<p>{item.value}</p>
								</li>
							)
						} else if (item.type === "image") {
							return (
								<li key={i} className={classes.img}>
									<img src={`./assets/change_log/${item.value}`} alt={item.value} />
								</li>
							)
						} else if (item.type === "video") {
							return (
								<li key={i} className={classes.video}>
									<video controls width="250">
										<source src={`./assets/change_log/${item.value}`} type="video/mp4" />
										Sorry, your browser doesn't support embedded videos.
									</video>
								</li>
							)
						}
					})}
				</ul>
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootLogItem: {
			position: "relative",
			display: "flex",
			flexDirection: "row",
			marginBottom: "100px",
			[theme.breakpoints.down("xs")]: {
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
                paddingBottom: "8px",
			},
		},
		date: {
			margin: "auto 0",
			[theme.breakpoints.down("xs")]: {
				margin: "4px 0",
			},
		},

		nbDays: {
			margin: "4px",
			position: "absolute",
			left: "90px",
			background: "red",
			display: "inline-block",
			borderRadius: "50px",
			height: "30px",
			width: "120px",
			display: "flex",
			alignItems: "center",
			zIndex: "3",
			bottom: "-40px",
			justifyContent: "center",
			[theme.breakpoints.down("xs")]: {
				left: "50%",
				transform: "translateX(-50%)",
			},
			"&:before": {
				content: "''",
				position: "absolute",
				background: theme.palette.primary.main,
				borderRadius: "50px",
				height: "30px",
				width: "120px",
				zIndex: "-1",
			},
			"&:after": {
				content: "''",
				position: "absolute",
				background: "red",
				padding: "2px",
				borderRadius: "50px",
				background: "linear-gradient(to right, #4200FF, #FF00E5)",
				height: "30px",
				width: "120px",
				zIndex: "-2",
			},
		},
		items: {
			margin: "0 0 0 120px",
			"& ul": {
				margin: "8px 0",
				"& li": {
					margin: "4px 0",
				},
			},
			[theme.breakpoints.down("xs")]: {
				margin: "0 0 0 0",
				width: "85%",
			},
		},
		text: {},
		img: {
			listStyleType: "none",
			borderRadius: "1px",
			"& img": {
				[theme.breakpoints.down("xs")]: {
					maxWidth: "95%",
					display: "flex",
					justifyContent: "center",
					margin: "auto",
				},
			},
		},
		video: {
			listStyleType: "none",
			borderRadius: "1px",
			"& video": {
				[theme.breakpoints.down("xs")]: {
					maxWidth: "95%",
					display: "flex",
					justifyContent: "center",
					margin: "auto",
				},
			},
		},
	}
})

export default LogItem
