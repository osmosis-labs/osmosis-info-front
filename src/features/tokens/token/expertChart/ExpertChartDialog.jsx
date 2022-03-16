import { Dialog, makeStyles, Slide } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme) => {
	return {
		expertChartDialogRoot: {},
	}
})

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const ExpertChartDialog = ({ open, onClose }) => {
	const classes = useStyles()

	const handleClose = () => {
		onClose()
	}

	return (
		<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
			<div className={classes.expertChartDialogRoot}>Plop</div>
		</Dialog>
	)
}

export default ExpertChartDialog
