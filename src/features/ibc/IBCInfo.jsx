import React from "react"
import { makeStyles } from "@material-ui/core"
import cloversPNG from "../../patrickTheme/ressources/clovers4.png"
const useStyles = makeStyles((theme) => {
	return {
		IBCInfoRoot: {
			backgroundColor: theme.palette.primary.dark2,
			width: "100vw",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			position: "relative",
			zIndex: 1,
			"&:after": {
				position: "absolute",
				content: "''",
				top: "0",
				zIndex: -1,
				left: "0",
				width: "100%",
				height: "100%",
				opacity: "0.4",
				background: `url(${cloversPNG}) `,
			},
		},
		content: {
			maxWidth: "1200px",
			width: "90%",
			zIndex: 1,
		},
		header: {
			margin: "40px 0",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			[theme.breakpoints.down("xs")]: {
				flexDirection: "column",
				alignItems: "flex-start",
			},
		},
		title: {
			fontSize: "1.6rem",
			marginRight: "20px",
			color: theme.palette.gray.contrastText,
		},
		bubles: {
			display: "flex",
			flexDirection: "row",
			[theme.breakpoints.down("xs")]: {
				marginTop: "20px",
			},
		},
		buble: {
			marginRight: "15px",
			borderRadius: "50px",
			padding: "4px 14px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: "0.7rem",
			cursor: "pointer",
		},
		bubleSelected: {
			borderWidth: "1px",
			borderStyle: "solid",
		},
		bubleGreen: {
			backgroundColor: "#52EB7D1F",
			color: "#52EB7D",
			borderColor: "#52EB7D",
		},
		bubleOrange: {
			backgroundColor: "#FF82001F",
			color: "#FF8200",
			borderColor: "#FF8200",
		},
		bubleRed: {
			backgroundColor: "#EF34561F",
			color: "#EF3456",
			borderColor: "#EF3456",
		},
		dot: {
			height: "8px",
			width: "8px",
			borderRadius: "50%",
			marginRight: "5px",
		},
		dotGreen: {
			backgroundColor: "#52EB7D",
		},
		dotOrange: {
			backgroundColor: "#FF8200",
		},
		dotRed: {
			backgroundColor: "#EF3456",
		},
		infos: {
			margin: "40px 0",
			display: "flex",
		},
		info: {
			display: "flex",
			flexDirection: "column",
			marginRight: "80px",
		},
		name: {
			fontSize: "0.9rem",
			color: theme.palette.gray.dark,
		},
		data: {
			marginTop: "10px",
			color: theme.palette.gray.contrastText,
			fontSize: "1.5rem",
		},
	}
})

const IBCInfo = ({
	timeLastUpdate,
	statusNormal,
	statusCongested,
	statusBlocked,
	nbNetwork,
	setIbcFilter,
	ibcFilter,
}) => {
	const classes = useStyles()
	return (
		<div className={classes.IBCInfoRoot}>
			<div className={classes.content}>
				<div className={classes.header}>
					<span className={classes.title}>IBC Status</span>
					<div className={classes.bubles}>
						<span
							onClick={() => setIbcFilter("normal")}
							className={
								ibcFilter === "normal"
									? `${classes.buble} ${classes.bubleGreen} ${classes.bubleSelected}`
									: `${classes.buble} ${classes.bubleGreen}`
							}
						>
							<span className={`${classes.dot} ${classes.dotGreen}`} />
							<span>{`${statusNormal} Normal`}</span>
						</span>
						<span
							onClick={() => setIbcFilter("congested")}
							className={
								ibcFilter === "congested"
									? `${classes.buble} ${classes.bubleOrange} ${classes.bubleSelected}`
									: `${classes.buble} ${classes.bubleOrange}`
							}
						>
							<span className={`${classes.dot} ${classes.dotOrange}`} />
							<span>{`${statusCongested} Congested`}</span>
						</span>
						<span
							onClick={() => setIbcFilter("blocked")}
							className={
								ibcFilter === "blocked"
									? `${classes.buble} ${classes.bubleRed} ${classes.bubleSelected}`
									: `${classes.buble} ${classes.bubleRed}`
							}
						>
							<span className={`${classes.dot} ${classes.dotRed}`} />
							<span>{`${statusBlocked} Blocked`}</span>
						</span>
					</div>
				</div>
				<div className={classes.infos}>
					<div className={classes.info}>
						<p className={classes.name}>Last update</p>
						<p className={classes.data}>{`${timeLastUpdate}s ago`}</p>
					</div>
					<div className={classes.info}>
						<p className={classes.name}>Networks</p>
						<p className={classes.data}>{nbNetwork}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(IBCInfo)
