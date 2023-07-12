import React, { useCallback } from "react";
import { Image } from "../image/image";
import { PoolStore } from "../../stores/api/pools/pool-store";
import { useRouter } from "next/router";

type CellNameProps = {
	pool: PoolStore;
};
export const CellName = ({ pool }: CellNameProps) => {
	const router = useRouter();

	const onClick = useCallback(() => {
		router.push(`/pools/${pool.id}`);
	}, [router, pool]);
	return (
		<div
			onClick={onClick}
			className="grid grid-cols-[60px_200px] text-ellipsis overflow-hidden whitespace-nowrap items-center cursor-pointer"
		>
			<div className="relative p-2">
				{pool.tokens.map((token, index) => {
					return (
						<Image
							key={token.denom}
							src={token.tokenStore?.image ?? "/images/default.png"}
							style={{ left: index * 18 + "px" }}
							alt={token.denom}
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
