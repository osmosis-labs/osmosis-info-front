import React from "react"
import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles((theme) => {
	return {
		IBCInfoRoot: {
			backgroundColor: theme.palette.primary.dark2,
			width: "100vw",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",

		},
		content: {
			maxWidth: "1200px",
			width: "90%",
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
            }
		},
		buble: {
			marginRight: "15px",
			borderRadius: "50px",
			padding: "4px 14px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: "0.7rem",
		},
		bubleGreen: {
			backgroundColor: "#52EB7D1F",
			color: "#52EB7D",
		},
		bubleOrange: {
			backgroundColor: "#FF82001F",
			color: "#FF8200",
		},
		bubleRed: {
			backgroundColor: "#EF34561F",
			color: "#EF3456",
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

const IBCInfo = ({ timeLastUpdate, statusNormal, statusCongested, statusBlocked, nbNetwork }) => {
	const classes = useStyles()
	return (
		<div className={classes.IBCInfoRoot}>
			<div className={classes.content}>
				<div className={classes.header}>
					<span className={classes.title}>IBC Status</span>
					<div className={classes.bubles}>
						<span className={`${classes.buble} ${classes.bubleGreen}`}>
							<span className={`${classes.dot} ${classes.dotGreen}`} />
							<span>{`${statusNormal} Normal`}</span>
						</span>
						<span className={`${classes.buble} ${classes.bubleOrange}`}>
							<span className={`${classes.dot} ${classes.dotOrange}`} />
							<span>{`${statusCongested} Congested`}</span>
						</span>
						<span className={`${classes.buble} ${classes.bubleRed}`}>
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
