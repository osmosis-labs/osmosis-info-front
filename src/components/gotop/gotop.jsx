import { makeStyles } from "@material-ui/core"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { useCallback, useEffect, useState } from "react"

const yDetect = 20

const GoTop = () => {
	const classes = useStyles()
	const [show, setShow] = useState(false)

	const classesShow = `${classes.goTop}`
	const classesHide = `${classes.goTop} ${classes.goTopHide}`

	const sroll = (e) => {
		let yPosition = document.querySelector("#mainContainer").scrollTop

		if (yPosition > yDetect && !show) {
			setShow((s) => true)
		} else if (yPosition < yDetect && show) {
			setShow((s) => false)
		}
	}

	useEffect(() => {
		document.querySelector("#mainContainer").addEventListener("scroll", sroll)
		return () => {
			document.querySelector("#mainContainer").removeEventListener("scroll", sroll)
		}
	}, [show])

	const onClick = () => {
		setTimeout(() => {
			document.querySelector("#mainContainer").scrollTo(0, 0)
		})
	}
	return (
		<div className={show ? classesShow : classesHide} onClick={onClick}>
			{" "}
			<ArrowUpwardIcon />
		</div>
	)
}
const useStyles = makeStyles((theme) => {
	return {
		goTop: {
			opacity: "0.5",
			cursor: "pointer",
			transition: "all 0.3s",
			position: "fixed",
			height: "36px",
			width: "36px",
			bottom: "100px",
			right: "100px",
			backgroundColor: "rgba(70, 62, 91, 0.7)",
			borderRadius: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "4px",
			zIndex: "20",
			[theme.breakpoints.down("xs")]: {
				bottom: "20px",
				right: "20px",
			},
			"&:hover": {
				opacity: "0.8",
			},
		},
		goTopHide: {
			opacity: "0 !important",
		},
	}
})
export default GoTop
