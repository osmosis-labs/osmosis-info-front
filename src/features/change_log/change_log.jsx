import { makeStyles } from "@material-ui/core"
import data from "./change_log"
import LogItem from "./log_item"

const ChangeLog = () => {
	const classes = useStyles()

	return (
		<div className={classes.rootChangeLog}>
			<div className={classes.container}>
				<p className={classes.title}>Change log</p>
				<div className={classes.containerItems}>
					<span className={classes.line} />
					{data.map((maj, i) => {
						return <LogItem key={i} date={maj.date} items={maj.items} />
					})}
				</div>
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => {
	return {
		rootChangeLog: {
			marginTop: "30px",
			marginBottom: "30px",
			overflowX: "hidden",
			height: "100%",
			margin: `${theme.spacing(2)}px 0`,
			[theme.breakpoints.down("xs")]: {},
		},
		container: {
			position: "relative",
		},
		line: {
			[theme.breakpoints.down("xs")]: { display: "none" },

			content: "''",
			position: "absolute",
			left: "150px",
			padding: "2px",
			background: "linear-gradient(to bottom, #4200FF, #FF00E5)",
			height: "100%",
			width: "2px",
			"&:after": {
				content: "''",
				position: "absolute",
				left: "-8px",
				bottom: "-15px",
				background: "linear-gradient(to top, #4200FF, #FF00E5)",
				borderRadius: "50%",
				height: "20px",
				width: "20px",
			},
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
			marginBottom: "20px",
		},
	}
})

export default ChangeLog
