import React from "react";
import { Image } from "../image/image";
import { PoolStore } from "../../stores/api/pools/pool-store";

type CellNameProps = {
	pool: PoolStore;
};
export const CellName = ({ pool }: CellNameProps) => {
	return (
		<div className="grid grid-cols-[60px_200px] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer items-center">
			<div className="relative p-2">
				{pool.tokens.map((token, index) => {
					return (
						<Image
							key={token.denom}
							src={token.image}
							style={{ left: index * 18 + "px" }}
							alt={token.name}
							className="h-[21px] w-[21px] mx-2 absolute top-[-2px]"
							srcFallback="/images/default.png"
						/>
					);
				})}
			</div>
			<span className="text-ellipsis overflow-hidden">{pool.name}</span>
		</div>
	);
};
