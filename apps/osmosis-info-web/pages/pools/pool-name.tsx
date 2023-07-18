import { StarSVG, VoteSVG } from "@latouche/osmosis-info-ui";
import React, { useEffect, useState } from "react";
import { Image } from "../../components/image/image";
import { PoolStore, defaultPoolStore } from "../../stores/api/pools/pool-store";
import { DialogReturn } from "../../components/dialog-apr/dialog-return";
import { useStore } from "../../stores";

export type PoolNameProps = {
	pool: PoolStore | undefined;
};

export const PoolName = ({ pool }: PoolNameProps) => {
	const {
		assetsStore,
		favoriteStore: { pools: favoritesPools, removePool, addPool },
	} = useStore();

	const [open, setOpen] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const isFavorite = favoritesPools.find((favoritePool) => favoritePool === pool?.id + "");
		setIsFavorite(isFavorite !== undefined);
	}, [favoritesPools, pool?.id]);

	const onClose = () => {
		setOpen(false);
	};

	const onOpen = () => {
		setOpen(true);
	};

	const onClickFavorite = () => {
		if (isFavorite) {
			setIsFavorite(false);
			removePool(pool?.id + "");
		} else {
			setIsFavorite(true);
			addPool(pool?.id + "");
		}
	};

	return (
		<div className="flex items-center mt-4">
			<DialogReturn open={open} onClose={onClose} pool={pool ?? defaultPoolStore} />

			<div className="relative p-2 min-h-[40px]" style={{ minWidth: `${(pool?.tokens.length ?? 1) * 30}px` }}>
				{pool?.tokens.map((token, index) => {
					return (
						<Image
							key={index}
							src={assetsStore.getImageFromDenom(token.denom) ?? "/images/default.png"}
							style={{ left: index * 30 + "px" }}
							alt={token.denom ?? "token"}
							height={40}
							width={40}
							className="h-[40px] w-[40px] absolute top-[-2px] min-w-[40px] min-h-[40px]"
						/>
					);
				})}
			</div>
			<span className="ml-4">
				# {pool?.id} {pool?.name}
			</span>
			{isFavorite ? (
				<StarSVG
					className="mx-2  fill-osmosverse-400 stroke-osmosverse-400 cursor-pointer"
					onClick={onClickFavorite}
					height={28}
					width={28}
				/>
			) : (
				<StarSVG
					className="mx-2  stroke-osmosverse-400 cursor-pointer"
					onClick={onClickFavorite}
					height={28}
					width={28}
				/>
			)}
			<VoteSVG className="fill-osmosverse-400 cursor-pointer" height={24} onClick={onOpen} />
		</div>
	);
};
