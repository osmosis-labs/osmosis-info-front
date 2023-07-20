import React, { useEffect, useState } from "react";
import { PoolToken } from "../../stores/api/pools/pools";
import { Paper } from "@latouche/osmosis-info-ui";
import { Image } from "../../components/image/image";
import { formateNumberDecimals } from "../../helpers/format";
import { useStore } from "../../stores";
import { twMerge } from "tailwind-merge";

export type PoolPriceProps = {
	firstSelected: PoolToken | undefined;
	secondSelected: PoolToken | undefined;
	className?: string;
};

export const PoolPrice = ({ firstSelected, secondSelected, className }: PoolPriceProps) => {
	const [price, setPrice] = useState(0);
	const { assetsStore } = useStore();

	useEffect(() => {
		const firstPrice = firstSelected?.tokenStore?.price ?? 0;
		const secondPrice = secondSelected?.tokenStore?.price ?? 0;
		if (firstPrice === 0 || secondPrice === 0) return;
		setPrice(firstPrice / secondPrice);
	}, [firstSelected?.tokenStore?.price, secondSelected?.tokenStore?.price]);

	return (
		<Paper className={twMerge("w-fit flex items-center", className)}>
			<Image
				key={firstSelected?.denom}
				src={assetsStore.getImageFromDenom(firstSelected?.denom ?? "")}
				alt={firstSelected?.denom}
				height={40}
				width={40}
				className="h-[40px] w-[40px] min-w-[40px] min-h-[40px] mr-2"
			/>
			<span>
				1 {firstSelected?.symbol} = {formateNumberDecimals(price)} {secondSelected?.symbol}
			</span>
			<Image
				key={secondSelected?.denom}
				src={assetsStore.getImageFromDenom(secondSelected?.denom ?? "")}
				alt={secondSelected?.denom}
				height={40}
				width={40}
				className="h-[40px] w-[40px] min-w-[40px] min-h-[40px] ml-2"
			/>
		</Paper>
	);
};
