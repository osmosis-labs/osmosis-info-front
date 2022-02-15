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
			display: "grid",
			gridAutoRows: "auto",
			rowGap: theme.spacing(2),
			minHeight: "180px",
		},
		image: {
			width: "30px",
			marginRight: theme.spacing(1),
		},
		convertContainer: {
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
		<div className={classes.poolHeaderHeader}>
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
						1 {selectedTokens.two.symbol} = {pricesInfo} {selectedTokens.one.symbol}{" "}
					</p>
				</Paper>
				<PoolSelect tokens={tokens} setSelectedTokens={onChangeSeletedTokens} selectedTokens={selectedTokens} />
			</ContainerLoader>
		</div>
	)
}

export default React.memo(PoolHeader)
