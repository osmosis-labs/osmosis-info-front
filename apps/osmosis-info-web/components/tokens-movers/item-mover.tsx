import React, { useCallback } from "react";
import { Top } from "../../stores/api/tops/tops";
import { useRouter } from "next/router";
import { formatAutoPrice, formateNumberDecimals } from "../../helpers/format";
import { Image } from "../image/image";

type ItemMoverProps = {
	item: Top;
};

export const ItemMover = ({ item }: ItemMoverProps) => {
	const router = useRouter();

	const onClick = useCallback(() => {
		router.push(`/tokens/${item.symbol}`);
	}, [router, item]);

	const classNamePrice = "flex items-center ml-2";
	let percentClass = `${classNamePrice} `;

	if (item.price24hChange > 0) {
		percentClass += " text-bullish-500";
	} else {
		percentClass += " text-rust-500";
	}

	return (
		<div
			className="my-2 mx-2 rounded-lg px-2 py-3 bg-osmosverse-900 flex w-fit items-center justify-between cursor-pointer"
			onClick={onClick}
		>
			<Image
				src={item.token?.image ?? ""}
				alt={item.name}
				className="h-[40px] w-[40px] min-h-[40px] min-w-[40px]"
				height={40}
				width={40}
				srcFallback="/images/default.png"
			/>
			<div className="flex flex-col ml-2">
				<p className="w-fit">{item.name}</p>
				<div className="flex">
					{formatAutoPrice(Math.round(item.price))}
					<span className={percentClass}>
						{item.price24hChange > 0 ? "↑" : "↓"}
						{formateNumberDecimals(item.price24hChange, 2, 0)}%
					</span>
				</div>
			</div>
		</div>
	);
};
