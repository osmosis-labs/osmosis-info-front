import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import Paper from "../../../../components/paper/Paper"
import { useDashboard } from "../../../../contexts/dashboard.provider"
import WalletHeader from "./wallet_header"
import WalletItem from "./wallet_item"
import TableWallet from "./wallet_item"
const useStyles = makeStyles((theme) => {
	return {
		rootMyWallet: {
			width: "100%",
			margin: "20px 0",

			[theme.breakpoints.down("xs")]: {},
		},
		title: {
			fontSize: "1.4rem",
			color: theme.palette.gray.contrastText,
			marginBottom: "20px",
		},
	}
})
const MyWallet = () => {
	const classes = useStyles()
	const { address, getWalletInfo } = useDashboard()
	const [data, setData] = useState([])
	useEffect(() => {
		const fetch = async () => {
			let { balance } = await getWalletInfo({ address })
			console.log("my_wallet.jsx -> 19: balance", balance)
			setData(balance.wallet ? balance.wallet : [])
		}
		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	return (
		<div className={classes.rootMyWallet}>
			<p className={classes.title}>My Wallet</p>
			<Paper className={classes.paper}>
				<WalletHeader />
				{data.length === 0 ? <p>No item found</p> : null}
				{data.map((item, index) => {
					return <WalletItem key={item.denom} data={item} />
				})}
			</Paper>
		</div>
	)
}

export default MyWallet
