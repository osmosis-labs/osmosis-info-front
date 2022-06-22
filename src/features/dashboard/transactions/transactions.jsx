import { makeStyles } from "@material-ui/core"
import { memo, useState } from "react"
import useSize from "../../../hooks/sizeHook"
import Details from "./details/details"
import DialogDetails from "./dialog_details"
import ModalJSON from "./details/modal_json"
import Types from "./types"
import ListTrx from "./list_trx/list_trx"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useTrxs, useTypeTrx } from "../../../hooks/data/dashboard.hook"
import { getTypeDashboard } from "../../../helpers/helpers"
import { useKeplr } from "../../../contexts/KeplrProvider"

const useStyles = makeStyles((theme) => {
	return {
		rootTransactions: {
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
		detailsContainer: {
			borderLeft: `1px solid ${theme.palette.primary.light}`,
			overflow: "hidden",
		},
		icon: {
			color: theme.palette.green.text,
		},
		titleContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			margin: "20px 0 12px 0",
		},
		title: {
			fontSize: "1.6rem",
			color: theme.palette.gray.contrastText,
		},
		listContainer: {},
		list: {},
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
const Transactions = () => {
	const classes = useStyles()
	const size = useSize()
	const [open, setOpen] = useState(false)
	const [openModalJSON, setOpenModalJSON] = useState(false)

	const [type, setType] = useState("all")
	const [currentTrx, setCurrentTrx] = useState({})

	const { address, CHAIN_ID: chainId } = useKeplr()

	const { data: types, isLoading: isLoadingType } = useTypeTrx(
		{ address },
		{ exclude: ["osmosis.gamm.v1beta1.MsgSwapExactAmountIn"], chainId, address }
	)
	const {
		data: trx,
		isLoading: isLoadingTrx,
		isFetching,
		fetchNextPage,
	} = useTrxs({ address, type }, { chainId, address })

	const isLoading = isLoadingType || isLoadingTrx || isFetching

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

	const onClickRow = (data) => {
		setCurrentTrx({ ...data })
		if (size === "xs") {
			onOpen()
		}
	}

	const cbEndPage = async () => {
		fetchNextPage()
	}

	const onChangeTypeTrx = async (type) => {
		setType((t) => (type === "all" ? "all" : getTypeDashboard(type, true)))
	}

	if (!address || address.length === 0) {
		return (
			<div className={classes.rootTransactions}>
				<div className={classes.content}>
					<div className={classes.mainContainer}>
						<div className={classes.titleContainer}>
							<p className={classes.title}>Transactions</p>
						</div>
						<div className={classes.containerNotFound}>
							<AccountBalanceWalletIcon className={classes.iconNotFound} />
							<p className={classes.textNotFound}>Connect your wallet.</p>
						</div>
					</div>
				</div>
				{size !== "xs" ? (
					<div className={classes.detailsContainer}>
						<Details data={currentTrx} openJSON={openJSON} />
					</div>
				) : (
					<DialogDetails open={open} onClose={onClose}>
						<Details data={currentTrx} openJSON={openJSON} />
					</DialogDetails>
				)}
			</div>
		)
	}

	return (
		<div className={classes.rootTransactions}>
			<div className={classes.content}>
				<div className={classes.mainContainer}>
					<div className={classes.titleContainer}>
						<p className={classes.title}>Transactions</p>
					</div>
					<Types onChangeType={onChangeTypeTrx} types={types} />
					<div className={classes.listContainer}>
						<ListTrx
							data={trx}
							className={classes.list}
							onClickRow={onClickRow}
							loadMore={cbEndPage}
							isLoading={isLoading}
							type={type}
						/>
					</div>
				</div>
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsContainer}>
					<Details data={currentTrx} openJSON={openJSON} />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose} data={currentTrx} openJSON={openJSON} />
			)}
			<ModalJSON open={openModalJSON} onClose={closeJSON} data={currentTrx} />
		</div>
	)
}

export default memo(Transactions)
