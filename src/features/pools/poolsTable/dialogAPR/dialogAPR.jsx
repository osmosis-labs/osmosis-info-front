import { makeStyles } from "@material-ui/core"

import { Slide, Dialog } from "@mui/material"
import { forwardRef, useState } from "react"
import Paper from "../../../../components/paper/Paper"
import CalculateIcon from "@mui/icons-material/Calculate"
import CloseIcon from "@mui/icons-material/Close"
import PaperAPR from "../paperAPR"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import TotalAPR from "./totalAPR"
import InputAPR from "./inputAPR"
import ButtonAPR from "./boutonAPR"
import { usePrices } from "../../../../contexts/PricesProvider"
const useStyles = makeStyles((theme) => {
	return {
		rootDialogAPR: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		paper: {
			borderRadius: "10px",
			position: "relative",
		},
		closeIcon: {
			position: "absolute",
			right: "10px",
			top: "10px",
			cursor: "pointer",
			transition: "all .3s",
			fontSize: "20px !important",
			color: theme.palette.gray.textDark,
			"&:hover": {
				transition: "all .3s",
				color: theme.palette.gray.dark,
			},
		},
		title: {
			color: theme.palette.primary.contrastText,
			display: "flex",
			alignItems: "center",
			fontSize: "1.2rem",
			marginRight: "30px",
			width: "100%",
		},
		textTitle: {
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
			maxWidth: "350px",
			[theme.breakpoints.down("xs")]: {
				maxWidth: "250px",
				fontSize: "1.1rem",
			},
		},
		iconTitle: {
			padding: "6px",
			marginRight: "10px",
			fontSize: "40px !important",
			border: `1px solid ${theme.palette.yellow.gold}`,
			color: theme.palette.green.subText,
			borderRadius: "50%",
		},
		bubles: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr",
			alignItems: "center",
			justifyContent: "space-between",
			marginTop: "10px",
		},
		buble: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			margin: "0 10px",
			color: theme.palette.gray.textLight,
			backgroundColor: theme.palette.gray.textDark3,
			fontSize: "0.8rem",
			borderRadius: "20px",
			padding: "4px 16px",
			cursor: "pointer",
			transition: "all .3s",
			"&:hover": {
				transition: "all .3s",
				backgroundColor: theme.palette.gray.textDark2,
			},
		},
		stakedDuring: {
			marginTop: "20px",
		},
		stakedDuringTitle: {
			color: theme.palette.primary.contrastText,
			fontSize: "0.9rem",
			margin: "10px 0",
		},
		stakedDuringButton: {},

		arrowContainer: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			margin: "20px 0",
		},
		arrowIcon: {
			fontSize: "30px !important",
			color: theme.palette.gray.textDark,
		},
	}
})

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})
const DialogAPR = ({ data, open, onClose }) => {
	const { priceOsmoBrut } = usePrices()
	const classes = useStyles()
	const [aprPeriode, setAprPeriode] = useState(14)
	const [staked, setStaked] = useState(0)
	const [stakedUSD, setStakedUSD] = useState(0)
	const [swapIsOsmos, setSwapIsOsmos] = useState(false)

	const onChangeStaked = (value, swap) => {
		if (swap) {
			setStakedUSD(value * priceOsmoBrut)
		} else {
			setStakedUSD(value)
		}
		setStaked(value)
		setSwapIsOsmos(swap)
	}

	const onChangeBuble = (value) => {
		onChangeStaked(value, swapIsOsmos)
	}
	return (
		<Dialog
			open={open}
			className={classes.rootDialogAPR}
			TransitionComponent={Transition}
			PaperComponent={PaperAPR}
			onClose={onClose}
		>
			<Paper className={classes.paper}>
				<CloseIcon className={classes.closeIcon} onClick={onClose} />
				<div className={classes.title}>
					<CalculateIcon className={classes.iconTitle} />
					<p className={classes.textTitle}>ROI Calculator for pool {data.name} </p>
				</div>
				<InputAPR onChange={onChangeStaked} value={staked} swapIsOsmos={swapIsOsmos} setSwapIsOsmos={setSwapIsOsmos} />
				<div className={classes.bubles}>
					<span className={classes.buble} onClick={() => onChangeBuble(100)}>
						{swapIsOsmos ? "100 OSMO" : "$100"}
					</span>
					<span className={classes.buble} onClick={() => onChangeBuble(500)}>
						{swapIsOsmos ? "500 OSMO" : "$500"}
					</span>
					<span className={classes.buble} onClick={() => onChangeBuble(1000)}>
						{swapIsOsmos ? "1000 OSMO" : "$1000"}
					</span>
				</div>
				<div className={classes.stakedDuring}>
					<p className={classes.stakedDuringTitle}>Staked for</p>
					<ButtonAPR
						className={classes.stakedDuringButton}
						buttons={[
							{
								id: 1,
								name: "1 Day",
								onClick: () => {
									setAprPeriode(1)
								},
							},
							{
								id: 7,
								name: "7 Days",
								onClick: () => {
									setAprPeriode(7)
								},
							},
							{
								id: 14,
								name: "14 Days",
								onClick: () => {
									setAprPeriode(14)
								},
							},
						]}
						active={aprPeriode}
					/>
				</div>

				<div className={classes.arrowContainer}>
					<ArrowDownwardIcon className={classes.arrowIcon} />
				</div>

				<TotalAPR apr={data.apr} periode={aprPeriode} staked={stakedUSD} />
			</Paper>
		</Dialog>
	)
}

export default DialogAPR
