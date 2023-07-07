import React, { useCallback } from "react";
import { Token } from "../../../stores/api/tokens/tokens";
import { Image } from "../../image/image";
import { formatAutoPrice, formateNumberDecimals } from "../../../helpers/format";
import { PoolStore } from "../../../stores/api/pools/pool-store";
import { TokenStore } from "../../../stores/api/tokens/token-store";

type TokenItemProps = {
	token: TokenStore;
	selected: boolean;
	onClick: (token: TokenStore) => void;
};

export const TokenItem = ({ token, selected, onClick }: TokenItemProps) => {
	let classNameContainer = `flex items-center my-2 py-2 justify-between cursor-pointer hover:bg-osmosverse-700 transition-colors px-2 rounded-md`;

	if (selected) classNameContainer += " bg-osmosverse-700";

	let classNamePrice = `text-sm text-right`;

	if (token.price24hChange > 0) {
		classNamePrice += " text-bullish-500";
	} else {
		classNamePrice += " text-rust-500";
	}

	const handleClick = useCallback(() => {
		onClick(token);
	}, [token, onClick]);

	return (
		<div className={classNameContainer} onClick={handleClick}>
			<div className="flex items-center">
				<Image
					src={token.image}
					alt={token.name}
					className="h-[48px] w-[48px]"
					width={48}
					height={48}
					srcFallback="/images/default.png"
				/>
				<div>
					<p className="ml-2">{token.symbol}</p>
					<p className="ml-2 text-ellipsis overflow-hidden text-osmosverse-300">{token.name}</p>
				</div>
			</div>
			<div>
				<p className="ml-2">{formatAutoPrice(token.price)}</p>
				<p className={classNamePrice}>
					{token.price24hChange > 0 ? "↑" : "↓"} {formateNumberDecimals(token.price24hChange, 2, 2)}%
				</p>
			</div>
		</div>
	);
};

type PoolItemProps = {
	pool: PoolStore;
	selected: boolean;
	onClick: (pool: PoolStore) => void;
};

export const PoolItem = ({ pool, selected, onClick }: PoolItemProps) => {
	let classNameContainer = `flex items-center my-2 py-2 justify-between cursor-pointer hover:bg-osmosverse-700 transition-colors px-2 rounded-md`;

	if (selected) classNameContainer += " bg-osmosverse-700";

	let classNameLiquidity = `text-sm text-right`;
	if (pool.liquidity24hChange > 0) {
		classNameLiquidity += " text-bullish-500";
	} else {
		classNameLiquidity += " text-rust-500";
	}

	const handleClick = useCallback(() => {
		onClick(pool);
	}, [pool, onClick]);

	return (
		<div className={classNameContainer} onClick={handleClick}>
			<div className="grid grid-cols-[60px_200px] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer items-center">
				<div className="relative min-h-[48px]">
					{pool.tokens.map((token, index) => {
						return (
							<Image
								key={token.denom}
								src={token.image}
								style={{ left: index * 18 + "px" }}
								alt={token.name}
								className="h-[44px] w-[44px]  absolute top-[1px]"
								srcFallback="/images/default.png"
								width={44}
								height={44}
							/>
						);
					})}
				</div>
				<p className="ml-2">{pool.name}</p>
			</div>
			<div>
				<p className="ml-2">{formatAutoPrice(pool.liquidity)}</p>
				<p className={classNameLiquidity}>
					{pool.liquidity24hChange > 0 ? "↑" : "↓"} {formateNumberDecimals(pool.liquidity24hChange, 2, 2)}%
				</p>
			</div>
		</div>
	);
};
