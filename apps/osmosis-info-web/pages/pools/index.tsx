import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-multi-lang";
import { useStore } from "../../stores";
import { Paper } from "@latouche/osmosis-info-ui";
import { PoolTable } from "../../components/pool-table/pool-table";
import { Pool } from "../../stores/api/pools/pools";
import { observer } from "mobx-react-lite";
import { defaultGetServerSideProps } from "../../helpers/server-side-props";

const Pools = observer(() => {
	const t = useTranslation();
	const {
		poolsStore: { pools },
		favoriteStore: { pools: favoritesPools },
	} = useStore();
	const [poolsFavorites, setPoolsFavorites] = React.useState<Pool[]>([]);

	const poolsMain = useMemo(() => {
		return [...pools.filter((pool) => pool.main)];
	}, [pools]);

	useEffect(() => {
		setPoolsFavorites([...poolsMain.filter((pool) => favoritesPools.includes(pool.id.toString()))]);
	}, [favoritesPools, poolsMain]);

	return (
		<div className="w-full">
			<h1 className="text-2xl">{t("pools.title")}</h1>
			<p className="mt-8 mx-2">{t("overview.watchlistPools")}</p>
			<Paper className="mt-4 mx-2">
				{poolsFavorites.length === 0 ? (
					<p>{t("overview.watchlistPoolsEmpty")}</p>
				) : (
					<PoolTable data={poolsFavorites} autoHeight={true} />
				)}
			</Paper>
			<p className="mt-8 mx-2">{t("pools.allPools")}</p>
			<Paper className="mt-4 mx-2">
				<PoolTable data={poolsMain} />
			</Paper>
		</div>
	);
});

export async function getServerSideProps() {
	return defaultGetServerSideProps();
}

export default Pools;
