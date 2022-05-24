import React from "react"
import { makeStyles } from "@material-ui/core"
import Image from "../../../components/image/Image"
import ContainerLoader from "../../../components/loader/ContainerLoader"
import Paper from "../../../components/paper/Paper"
import PoolPath from "./PoolPath"
import PoolSelect from "./PoolSelect"
import PoolTitle from "./PoolTitle"

const useStyles = makeStyles((theme) => {
	return {
		containerInfo: {
			minHeight: "180px",
			alignItems: "flex-start",
		},
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
		},
		convertContainer: {
			marginTop: theme.spacing(2),
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			width: "fit-content",
			padding: "6px 10px",
		},
	}
})

const PoolHeader = ({ pool, tokens, selectedTokens, onChangeSeletedTokens, loadingPoolDetails, pricesInfo }) => {
	const classes = useStyles()
	return (
		<ContainerLoader className={classes.containerInfo} isLoading={loadingPoolDetails}>
			<PoolPath pool={pool} />
			<PoolTitle pool={pool} tokens={tokens} />

			<Paper className={classes.convertContainer}>
				<Image
					className={`${classes.image}`}
					assets={true}
					alt={`${selectedTokens.two.symbol}`}
					src={`https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/${selectedTokens.two?.symbol?.toLowerCase()}.png`}
					srcFallback="../assets/default.png"
					pathAssets=""
				/>
				<p>
					1 {selectedTokens.two.symbolDisplay} = {pricesInfo} {selectedTokens.one.symbolDisplay}{" "}
				</p>
			</Paper>
			<PoolSelect tokens={tokens} setSelectedTokens={onChangeSeletedTokens} selectedTokens={selectedTokens} />
		</ContainerLoader>
	)
}

export default PoolHeader
