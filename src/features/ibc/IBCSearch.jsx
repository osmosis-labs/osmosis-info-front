import React from "react"
import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		IBCSearchRoot: {
			margin: `${theme.spacing(2)}px 0`,
			display: "flex",
			flexDirection: "column",
		},
		content: {
			maxWidth: "1200px",
		},
		input: {
			backgroundColor: theme.palette.primary.light,
			color: theme.palette.gray.contrastText,
			outline: "none",
			border: "none",
			padding: theme.spacing(1),
			borderRadius: theme.spacing(2),
			width: "500px",
			fontSize: "16px",
			"&::placeholder": {
				color: theme.palette.gray.dark,
			},
			[theme.breakpoints.down("sm")]: {
				width: "90%",
			},
		},
	}
})

const IBCSearch = ({ ibcSearch, setIbcSearch }) => {
	const classes = useStyles()

	return (
		<div className={classes.IBCSearchRoot}>
			<div className={classes.content}>
				<input
					placeholder="Search IBC by token name"
					onChange={(e) => {
						setIbcSearch(e.target.value)
					}}
					className={classes.input}
					value={ibcSearch}
				/>
			</div>
		</div>
	)
}

export default React.memo(IBCSearch)
