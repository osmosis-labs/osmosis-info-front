import { makeStyles, MenuItem, Select, TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import BlocLoaderOsmosis from "../../../components/loader/BlocLoaderOsmosis"
import { useDashboard } from "../../../contexts/dashboard.provider"
import useSize from "../../../hooks/sizeHook"
import Details from "./details/details"
import DialogDetails from "./dialog_details"
import TableTrx from "./tableTrx/table_trx"
import CheckIcon from "@mui/icons-material/Check"
import { IconButton } from "@mui/material"
import ModalJSON from "./details/modal_json"

const useStyles = makeStyles((theme) => {
	return {
		rootTransactions: {
			width: "100%",
			height: "100%",
			display: "grid",

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
			overflow: "hidden",
			overflowY: "auto",
			backgroundColor: theme.palette.primary.dark2,
		},

		table: {
			margin: "8px",
			padding: "12px 0 24px 0",
		},
		detailsConatainer: {
			borderLeft: `1px solid ${theme.palette.primary.light}`,
			overflow: "hidden",
		},
		select: {
			flexWrap: "wrap",
			overflow: "hidden",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "8px",
			margin: "12px 8px",
		},
		icon: {
			color: theme.palette.green.text,
		},
	}
})
const Transactions = () => {
	const classes = useStyles()
	const size = useSize()
	const [open, setOpen] = useState(false)
	const { getTypeTrx, getTrx, getAdresses, ...other } = useDashboard()
	const [currentTrx, setCurrentTrx] = useState({})
	const [addresses, setAddresses] = useState([])
	const [address, setAddress] = useState("")
	const [addressTxt, setAddressTxt] = useState("")
	const [openModalJSON, setOpenModalJSON] = useState(false)
	/*
	osmo1nzutmw5hqat76csr6qggnplemvqf5hczserhuv
	*/
	const [loadingTrx, setLoadingTrx] = useState(true)

	const [trx, setTrx] = useState([])

	const handleChange = (event) => {
		setAddress(event.target.value)
		setAddressTxt(event.target.value)
	}

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoadingTrx(true)
				let promises = [getTypeTrx({ address }), getTrx({ address })]
				let results = await Promise.all(promises)
				let types = results[0]
				let trx = results[1]
				setCurrentTrx(trx[4])
				setTrx(trx)
				setLoadingTrx(false)
			} catch (e) {
				console.log("%ctransactions.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
				setLoadingTrx(false)
			}
		}

		if (address && address.length > 0) {
			fetch()
		}
	}, [address])

	useEffect(() => {
		const fetch = async () => {
			try {
				let addresses = await getAdresses()
				if (other.address.length > 0) {
					addresses.unshift(other.address)
				}
				setAddresses(addresses)
				setAddressTxt(addresses[0])
				setAddress(addresses[0])
			} catch (e) {
				console.log("%ctransactions.jsx -> 53 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
			}
		}

		fetch()
	}, [other.address])

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

	const validAdd = () => {
		setAddress(addressTxt)
	}

	const onChange = (event) => {
		setAddressTxt(event.target.value)
	}
	return (
		<div className={classes.rootTransactions}>
			<div className={classes.mainContainer}>
				<div className={classes.select}>
					<div className={classes.txt}>
						<TextField id="outlined-basic" label="Address" variant="outlined" value={addressTxt} onChange={onChange} />
						<IconButton aria-label="copy" className={classes.iconContainer} onClick={validAdd}>
							<CheckIcon className={classes.icon} />
						</IconButton>
					</div>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={address}
						label="Address"
						onChange={handleChange}
					>
						{addresses.map((address, index) => {
							return (
								<MenuItem key={address + index} value={address}>
									{index}-{address}
								</MenuItem>
							)
						})}
					</Select>
				</div>
				<BlocLoaderOsmosis open={loadingTrx} classNameLoading={classes.loading} />
				<TableTrx data={trx} className={classes.table} onClickRow={onClickRow} />
			</div>
			{size !== "xs" ? (
				<div className={classes.detailsConatainer}>
					<Details data={currentTrx} openJSON={openJSON} />
				</div>
			) : (
				<DialogDetails open={open} onClose={onClose} data={currentTrx} openJSON={openJSON} />
			)}
			<ModalJSON open={openModalJSON} onClose={closeJSON} data={currentTrx} />
		</div>
	)
}

export default Transactions
