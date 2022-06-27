import { makeStyles } from "@material-ui/core"
import { useEffect, useRef, useState } from "react"
import ModalJSON from "../transactions/details/modal_json"
import DialogDetails from "../transactions/dialog_details"
import useSize from "../../../hooks/sizeHook"
import ListTrades from "./list_trades/list_trades"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import DetailsTrade from "./details_trade"
import { useInfoTrx, useTrades } from "../../../hooks/data/dashboard.hook"
import { useKeplr } from "../../../contexts/KeplrProvider"

const useStyles = makeStyles((theme) => {
	return {
		rootTrades: {
			width: "100%",
			height: "100%",
			display: "grid",
			backgroundColor: theme.palette.primary.dark2,
			gridTemplateColumns: "2fr 1fr",
			[theme.breakpoints.down("xs")]: {
				gridTemplateColumns: "1fr",
			},
		},
		loading: {
			backgroundColor: theme.palette.primary.dark2,
		},
		mainContainer: {
			position: "relative",
			width: "100%",
			backgroundColor: theme.palette.primary.dark2,
			maxWidth: "1200px",
			padding: "0 20px 20px 20px",
		},
		content: {
			backgroundColor: theme.palette.primary.dark2,
			overflow: "hidden",
			overflowY: "auto",
			display: "flex",
			flexDirection: "column",
			height: "100%",
			alignItems: "center",
		},
		tableContainer: {
			position: "relative",
		},
		table: {
			margin: "8px 0",
			padding: "12px 0 24px 0",
		},

		titleContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			margin: "32px 0 32px 0",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
		},
		detailsContainer: {
			borderLeft: `1px solid ${theme.palette.primary.light}`,
			overflow: "hidden",
		},
		containerNotFound: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		iconNotFound: {
			width: "110px !important",
			height: "110px !important",
			color: theme.palette.primary.light2,
			padding: "24px",
			borderRadius: "50%",
			backgroundColor: theme.palette.primary.main,
		},
		textNotFound: {
			marginTop: "16px",
			color: theme.palette.primary.light2,
			fontSize: "20px",
		},
	}
})
const Trades = () => {
	const classes = useStyles()
	const size = useSize()
	const [end, setEnd] = useState(false)
	const [open, setOpen] = useState(false)
	const [openModalJSON, setOpenModalJSON] = useState(false)
	const [currentTrade, setCurrentTrade] = useState({})
	const { address, CHAIN_ID: chainId } = useKeplr()

	const { data: trades, isLoading: isLoadingTrx, isFetching, fetchNextPage } = useTrades({ address })
	const { data: trade } = useInfoTrx({ hash: currentTrade?.hash?.value }, { currentTrade, address, chainId })

	const isLoading = isLoadingTrx || isFetching

	const onOpen = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}

	const openJSON = () => {
		if (size !== "xs") {
			setOpenModalJSON(true)
		} else {
			onClose()
			setOpenModalJSON(true)
		}
	}

	const closeJSON = () => {
		if (size !== "xs") {
			setOpenModalJSON(false)
		} else {
			onOpen()
			setOpenModalJSON(false)
		}
	}

	const onClickRow = async (data) => {
		setCurrentTrade(data)
		if (size === "xs") {
			onOpen()
		}
	}

	const cbEndPage = async () => {
		fetchNextPage()
		let data = await fetchNextPage()
		setEnd((end) => data.data.pages[data.data.pages.length - 1].length === 0)
	}

	if (!address || address.length === 0) {
		return (
			<div className={classes.rootTrades}>
				<div className={classes.content}>
					<div className={classes.mainContainer}>
						<div className={classes.titleContainer}>
							<p className={classes.title}>Trading History</p>
						</div>
						<div className={classes.containerNotFound}>
							<AccountBalanceWalletIcon className={classes.iconNotFound} />
							<p className={classes.textNotFound}>Connect your wallet.</p>
						</div>
					</div>
				</div>
				{size !== "xs" ? (
					<div className={classes.detailsContainer}>
						<DetailsTrade data={{}} openJSON={openJSON} />
					</div>
				) : (
					<DialogDetails open={open} onClose={onClose}>
						<DetailsTrade data={{}} openJSON={openJSON} />
					</DialogDetails>
				)}
			</div>
		)
	}
	return (
		<div className={classes.rootTrades}>
			<div className={classes.content}>
				<div className={classes.mainContainer}>
					<div className={classes.titleContainer}>
						<p className={classes.title}>Trading History</p>
					</div>
					<div className={classes.listContainer}>
						<ListTrades
							data={trades}
							className={classes.list}
							onClickRow={onClickRow}
							loadMore={!end ? cbEndPage : null}
							isLoading={isLoading}
						/>
					</div>
				</div>
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsContainer}>
					<DetailsTrade data={trade} openJSON={openJSON} />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose}>
					<DetailsTrade data={trade} openJSON={openJSON} />
				</DialogDetails>
			)}
			<ModalJSON open={openModalJSON} onClose={closeJSON} data={trade} />
		</div>
	)
}

export default Trades
