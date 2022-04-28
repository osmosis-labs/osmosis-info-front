import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import List from "../../../../components/list/list"
import { formateNumberDecimalsAuto } from "../../../../helpers/helpers"
import AttributStatus from "../../transactions/list_trx/attribut_status"
import AttributPools from "./attribut_pools"
import AttributSymbol from "./attribut_symbol"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"

const useStyles = makeStyles((theme) => {
	return {
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

const ListTrades = ({ data: currentData, onClickRow, isLoading, loadMore }) => {
	const classes = useStyles()
	const [data, setData] = useState([])

	useEffect(() => {
		const type = "osmosis.gamm.v1beta1.MsgSwapExactAmountIn"
		let data = currentData.filter((item) => item.types[0].value !== type)
		setData(data)
	}, [currentData])

	const onLoadMore = () => {
		loadMore()
	}

	const transformDisplay = (data) => {
		return data.display
	}

	const onSortTime = (a, b, orderBy) => {
		let res = 0
		if (b[orderBy].value < a[orderBy].value) {
			res = 1
		}
		if (b[orderBy].value > a[orderBy].value) {
			res = -1
		}
		return res
	}

	const transformUSD = (data) => {
		if (data) {
			return `$${formateNumberDecimalsAuto({ price: data })}`
		} else return "-"
	}

	const config = {
		defaultSort: "name",
		defaultOrder: "asc",
		scrollOnIt: true,
		onLoadMore: onLoadMore,
		onClickRow: onClickRow,
		selectedItemClass: null,
		selectableRow: true,
		rowId: "hash",
		fixedHeader: true,
		showFooter: true,
		items: [
			{
				label: "Status",
				key: "status",
				sortable: false,
				onSort: null,
				headerClass: null,
				bodyClass: null,
				align: "center",
				onClickAttribut: null,
				transform: null,
				body: AttributStatus,
				space: "75px",
			},
			{
				label: "Time",
				key: "time",
				onSort: onSortTime,
				sortable: true,
				headerClass: null,
				bodyClass: classes.cellTime,
				align: "center",
				onClickAttribut: null,
				transform: transformDisplay,
				body: null,
				space: "minmax(100px, 150px)",
			},
			{
				label: "Pools",
				key: "pools",
				sortable: true,
				onSort: null,
				headerClass: null,
				bodyClass: null,
				align: "left",
				onClickAttribut: null,
				transform: null,
				body: AttributPools,
				space: "minmax(200px, 1fr)",
			},
			{
				label: "Token in",
				key: "tokenIn",
				sortable: false,
				onSort: null,
				headerClass: null,
				bodyClass: null,
				align: "right",
				onClickAttribut: null,
				transform: null,
				body: AttributSymbol,
				space: "minmax(100px, 150px)",
			},
			{
				label: "Token out",
				key: "tokenOut",
				sortable: false,
				onSort: null,
				headerClass: null,
				bodyClass: null,
				align: "right",
				onClickAttribut: null,
				transform: null,
				body: AttributSymbol,
				space: "minmax(100px, 150px)",
			},
			{
				label: "$ Value",
				key: "usd",
				sortable: true,
				onSort: null,
				headerClass: null,
				bodyClass: null,
				align: "right",
				onClickAttribut: null,
				transform: transformUSD,
				body: null,
				space: "minmax(100px, 150px)",
			},
		],
	}
	if (!isLoading && data.length === 0) {
		return (
			<div className={classes.containerNotFound}>
				<AccountBalanceWalletIcon className={classes.iconNotFound} />
				<p className={classes.textNotFound}>Transaction not found.</p>
			</div>
		)
	} else {
		return <List data={data} config={config} isLoading={isLoading} />
	}
}

export default ListTrades
