import { makeStyles } from "@material-ui/core"
import osmoIMG from "./osmo.svg"

const useStyles = makeStyles((theme) => {
	return {
		rootButtonOsmo: {
			display: "flex",
			alignItems: "center",
			marginRight: "12px",
			[theme.breakpoints.down("xs")]: {},
		},
		img: {
			height:"14px"
		},
		text: {
			color: theme.palette.primary.contrastText,
			fontSize: "12px",
			marginLeft: "2px",
		},
		container: {
			height:"20px",
			display: "flex",
			alignItems: "center",
			padding: "13px 10px 13px 8px",
			backgroundColor: theme.palette.blue.main,
			"&:first-child": {
				marginRight: "2px",
				borderRadius: "50px 0 0 50px"
			},
			"&:last-child": {
				borderRadius: "0 50px 50px 0"

			},
		},
	}
})

const ButtonOsmo = ({ address, osmoStaked }) => {
	const classes = useStyles()

	let addressDisplay = address.substring(0, 7) + "..." + address.substring(address.length - 3)

	return (
		<div className={classes.rootButtonOsmo}>
			<div className={classes.container}>
				<img src={osmoIMG} className={classes.img} />
				<span className={classes.text}>{addressDisplay}</span>
			</div>
			<div className={classes.container}>
				<span className={classes.text}>{osmoStaked}</span>
				<span className={classes.text}>OSMO</span>
			</div>
		</div>
	)
}

export default ButtonOsmo
