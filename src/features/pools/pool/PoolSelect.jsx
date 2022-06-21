import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useState } from "react"
import SwapHorizIcon from "@material-ui/icons/SwapHoriz"
import SwapVertIcon from "@material-ui/icons/SwapVert"
import { IconButton, MenuItem, Select } from "@material-ui/core"
import Image from "../../../components/image/Image"
import { getInclude } from "../../../helpers/helpers"
import { useEffect } from "react"
import { useAssets } from "../../../hooks/data/assets.hook"

const useStyles = makeStyles((theme) => {
	return {
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
		},
		selects: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			[theme.breakpoints.down("sm")]: {
				flexDirection: "column",
				alignItems: "flex-start",
			},
		},
		select: {
			margin: theme.spacing(2),
			textOverflow: "ellipsis",
			maxWidth: "300px",
			[theme.breakpoints.down("sm")]: {
				margin: theme.spacing(0.5),
			},
		},
		icon: {
			color: theme.palette.info.dark,
			[theme.breakpoints.down("sm")]: {
				margin: `0 ${theme.spacing(4)}px`,
			},
		},
		selectContainer: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		},
	}
})

const PoolSelect = ({ tokens, setSelectedTokens, selectedTokens }) => {
	const classes = useStyles()
	const { data: assets } = useAssets()

	const matchXS = useMediaQuery((theme) => theme.breakpoints.down("xs"))

	const [selectPairs, setSelectPairs] = useState({ one: "", two: "" }) // values for selects

	const onChangeSelect = (value, isOne) => {
		setSelectPairs((ps) => {
			if (isOne) {
				return { ...ps, one: value }
			} else {
				return { ...ps, two: value }
			}
		})
		let iToken = getInclude(tokens, (tk) => value === tk.denom)
		if (isOne) {
			setSelectedTokens({
				one: tokens[iToken],
				two: selectedTokens.two,
			})
		} else {
			setSelectedTokens({
				one: selectedTokens.one,
				two: tokens[iToken],
			})
		}
	}

	useEffect(() => {
		// set defaults values
		if (tokens.length > 0) {
			setSelectPairs({
				one: tokens[0].denom,
				two: tokens[1].denom,
			})
		}
	}, [tokens])

	const swapToken = () => {
		setSelectPairs((ps) => {
			return { one: ps.two, two: ps.one }
		})
		setSelectedTokens({ one: selectedTokens.two, two: selectedTokens.one })
	}

	return (
		<div className={classes.selects}>
			<div className={classes.selectContainer}>
				<Image
					className={`${classes.image} ${classes.select}`}
					assets={true}
					src={assets[selectedTokens.two?.symbol]?.image}
					srcFallback="../assets/default.png"
					pathAssets=""
					alt={`${selectedTokens.two.symbol}`}
				/>
				<Select
					className={classes.select}
					value={selectPairs.two}
					onChange={(e) => {
						onChangeSelect(e.target.value, false)
					}}
				>
					{tokens.map((token) => {
						return (
							<MenuItem
								className={classes.itemSelect}
								disabled={selectPairs.one === token.denom}
								key={`two-${token.denom}`}
								value={token.denom}
							>
								{token.symbol.length > 0 ? token.symbolDisplay : token.denom}
							</MenuItem>
						)
					})}
				</Select>
			</div>
			<IconButton className={`${classes.icon} ${classes.select}`} onClick={swapToken} component="span">
				{matchXS ? <SwapVertIcon /> : <SwapHorizIcon />}
			</IconButton>
			<div className={classes.selectContainer}>
				<Image
					className={`${classes.image} ${classes.select}`}
					assets={true}
					src={assets[selectedTokens.one?.symbol]?.image}
					srcFallback="../assets/default.png"
					pathAssets=""
					alt={`${selectedTokens.one.symbol}`}
				/>
				<Select
					className={classes.select}
					value={selectPairs.one}
					onChange={(e) => {
						onChangeSelect(e.target.value, true)
					}}
				>
					{tokens.map((token) => {
						return (
							<MenuItem
								className={classes.itemSelect}
								disabled={selectPairs.two === token.denom}
								key={`one-${token.denom}`}
								value={token.denom}
							>
								{token.symbol.length > 0 ? token.symbolDisplay : token.denom}
							</MenuItem>
						)
					})}
				</Select>
			</div>
		</div>
	)
}

export default PoolSelect
