import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import List from "../../../../components/list/list"
import { getTypeDashboard } from "../../../../helpers/helpers"
import AttributFees from "./attribut_fees"
import AttributStatus from "./attribut_status"
import AttributType from "./attribut_type"
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
		onClickCell: {
			overflow: "hidden",
			cursor: "pointer",
			textOverflow: "ellipsis",
			color: `${theme.palette.table.link} !important`,
		},
	}
})

const ListTrx = ({ data: currentData, onClickRow, isLoading, loadMore }) => {
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

	const onClickHash = (data) => {
		onClickRow(data)
		window.open(`https://www.mintscan.io/osmosis/txs/${data.hash.value}`, "_blank")
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

	const onSortFees = (a, b, orderBy, order) => {
		let res = 0
		if (a.fees && b.fees) {
			if (parseFloat(b.fees) < parseFloat(a.fees)) {
				res = -1
			}
			if (parseFloat(b.fees) > parseFloat(a.fees)) {
				res = 1
			}
		} else if (a.fees && !b.fees) {
			res = -1
		} else if (!a.fees && b.fees) {
			res = 1
		} else {
			res = 0
		}
		return res
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
				label: "Type",
				key: "type",
				sortable: false,
				onSort: null,
				headerClass: null,
				bodyClass: null,
				align: "left",
				onClickAttribut: null,
				transform: null,
				body: AttributType,
				space: "minmax(200px, 1fr)",
			},
			{
				label: "Hash",
				key: "hash",
				onSort: null,
				sortable: false,
				headerClass: null,
				bodyClass: classes.onClickCell,
				align: "left",
				onClickAttribut: onClickHash,
				transform: transformDisplay,
				body: null,
				space: "150px",
			},
			{
				label: "Fees",
				key: "fess",
				sortable: false,
				onSort: null,
				headerClass: null,
				bodyClass: null,
				align: "right",
				onClickAttribut: null,
				transform: null,
				body: AttributFees,
				space: "minmax(100px, 150px)",
			},
			{
				label: "Height",
				key: "height",
				onSort: null,
				sortable: true,
				headerClass: null,
				bodyClass: null,
				align: "right",
				onClickAttribut: null,
				transform: null,
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

export default ListTrx
