import { makeStyles } from "@material-ui/core"
import { useEffect } from "react"
const useStyles = makeStyles((theme) => {
	return {
		rootDetails: {
            padding: "8px 8px",
            backgroundColor: theme.palette.primary.main,
			display: "flex",
            flexDirection: "column",
            height: "100%",
			[theme.breakpoints.down("xs")]: {
			},
		},
	}
})
const Details = () => {
	const classes = useStyles()
	return <div className={classes.rootDetails}>Hey</div>
}

export default Details
