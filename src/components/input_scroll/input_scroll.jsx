import { makeStyles } from "@material-ui/core"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useTheme } from "@material-ui/core"

const useStyles = makeStyles((theme) => {
	return {
		rootInputScroll: {
			overflow: "hidden",
			position: "relative",
			maxWidth: "100%",
			zIndex: 1,
			[theme.breakpoints.down("xs")]: {},
		},
		scroll: {
			maxWidth: "100%",
			"&:hover": {},
			"&:focus": {},
			"&::-webkit-scrollbar": { display: "none" },
			display: "grid",
			gridAutoFlow: "column",
			gridGap: "10px",
			cursor: "grab !important",
			overflowX: "scroll",
			justifyContent: "flex-start",
			"-ms-overflow-style": "none",
			"scrollbar-width": "none",
			userSelect: "none",
		},
		icon: {
			position: "absolute",
			top: "50%",
			transform: "translateY(-50%)",
			transition: "all 0.3s ease !important",
			cursor: "pointer",
			backgroundColor: theme.palette.primary.light,
			borderRadius: "50%",
			padding: "5px",
			border: `1px solid ${theme.palette.yellow.gold}`,
		},
		iconLeft: {
			left: "0px",
		},
		iconRight: {
			right: "0px",
		},
		iconDisabled: {
			opacity: 0,
			cursor: "default",
		},
	}
})
const InputScroll = ({ children }) => {
	const classes = useStyles()
	const theme = useTheme()

	const refDiv = useRef(null)

	const classIconLeftDefault = `${classes.icon} ${classes.iconLeft}`
	const classIconRightDefault = `${classes.icon} ${classes.iconRight}`
	const classIconRightDisabled = `${classes.icon} ${classes.iconRight} ${classes.iconDisabled}`
	const classIconLeftDisabled = `${classes.icon} ${classes.iconLeft} ${classes.iconDisabled}`

	const [classIconLeft, setClassIconLeft] = useState(classIconLeftDisabled)
	const [classIconRight, setClassIconRight] = useState(classIconRightDefault)
	const endLeft = useRef(true)
	const endRight = useRef(false)

	useEffect(() => {
		setClassIconLeft(classIconLeftDisabled)
		setClassIconRight(classIconRightDefault)
		refDiv.current.scroll({ left: 0, behavior: "smooth" })
	}, [theme,  refDiv.current])

	const updateScroll = (xScroll) => {
		let leftScroll = refDiv.current.scrollLeft + xScroll
		let rightScroll = leftScroll + refDiv.current.offsetWidth
		let endScroll = refDiv.current.scrollWidth

		if (leftScroll <= 0 && !endLeft.current) {
			endLeft.current = true
			setClassIconLeft(classIconLeftDisabled)
		} else if (leftScroll > 0 && endLeft.current) {
			endLeft.current = false
			setClassIconLeft(classIconLeftDefault)
		}
		if (rightScroll >= endScroll && !endRight.current) {
			endRight.current = true
			setClassIconRight(classIconRightDisabled)
		} else if (rightScroll < endScroll && endRight.current) {
			setClassIconRight(classIconRightDefault)
		}

		refDiv.current.scroll({ left: refDiv.current.scrollLeft + xScroll, behavior: "smooth" })
	}

	const onClickLeft = (e) => {
		updateScroll(-200)
	}
	const onClickRight = (e) => {
		updateScroll(200)
	}
	return (
		<div className={classes.rootInputScroll}>
			<ArrowBackIosNewIcon className={classIconLeft} onClick={onClickLeft} />
			<div className={classes.scroll} ref={refDiv}>
				{children}
			</div>
			<ArrowForwardIosIcon className={classIconRight} onClick={onClickRight} />
		</div>
	)
}

export default InputScroll
