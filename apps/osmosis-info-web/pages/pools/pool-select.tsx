import React, { useCallback, useMemo } from "react";
import { PoolToken } from "../../stores/api/pools/pools";
import { Image } from "../../components/image/image";
import { useStore } from "../../stores";
import { Dropdown, IconButton, ItemDropdown, SwapSVG } from "@latouche/osmosis-info-ui";
import { PoolStore } from "../../stores/api/pools/pool-store";

export type PoolSelectProps = {
	firstSelected: PoolToken | undefined;
	secondSelected: PoolToken | undefined;
	pool: PoolStore | undefined;
	onChangeSelect(first: PoolToken, second: PoolToken): void;
};

export const PoolSelect = ({ firstSelected, secondSelected, onChangeSelect, pool }: PoolSelectProps) => {
	const { assetsStore } = useStore();

	const onSwap = useCallback(() => {
		if (!firstSelected || !secondSelected) return;
		onChangeSelect(secondSelected, firstSelected);
	}, [firstSelected, onChangeSelect, secondSelected]);

	const onChangeFirst = useCallback(
		(item: ItemDropdown<string>) => {
			const itemSelected = pool?.tokens.find((token) => token.denom === item.value);
			if (!itemSelected) return;
			if (itemSelected.denom === secondSelected?.denom) {
				onSwap();
				return;
			}
			if (!secondSelected) return;
			onChangeSelect(itemSelected, secondSelected);
		},
		[onChangeSelect, onSwap, pool?.tokens, secondSelected]
	);

	const onChangeSecond = useCallback(
		(item: ItemDropdown<string>) => {
			const itemSelected = pool?.tokens.find((token) => token.denom === item.value);
			if (!itemSelected) return;
			if (itemSelected.denom === firstSelected?.denom) {
				onSwap();
				return;
			}
			if (!firstSelected) return;
			onChangeSelect(firstSelected, itemSelected);
		},
		[onChangeSelect, onSwap, pool?.tokens, firstSelected]
	);

	const items = useMemo<ItemDropdown<string>[]>(() => {
		if (!pool) return [] as ItemDropdown<string>[];
		const res = pool.tokens.map((token) => {
			return {
				value: token.denom,
				display: token.symbol,
				Icon: () => (
					<Image
						key={token.denom}
						src={assetsStore.getImageFromDenom(token.denom ?? "")}
						alt={token.denom}
						height={40}
						width={40}
						className="h-[40px] w-[40px] min-w-[40px] min-h-[40px] mr-2"
					/>
				),
			};
		});
		return res as ItemDropdown<string>[];
	}, [assetsStore, pool]);

	return (
		<div className="flex items-center mt-4">
			<Dropdown<string>
				onChange={onChangeFirst}
				value={firstSelected?.denom ?? ""}
				items={items as ItemDropdown<string>[]}
				size="small"
				variant={"icon"}
			/>
			<IconButton onClick={onSwap} className="mx-2 rotate-90" Icon={SwapSVG} strokeAnimation variant="flat" />
			<Dropdown<string>
				onChange={onChangeSecond}
				value={secondSelected?.denom ?? ""}
				items={items as ItemDropdown<string>[]}
				size="small"
				variant={"icon"}
			/>
		</div>
	);
};
