import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "../../../stores";
import { Dialog } from "@latouche/osmosis-info-ui";
import { InputSearch } from "./input-search";
import { PoolItem, TokenItem } from "./items-search";
import { normalize } from "../../../helpers/format";
import { TokenStore } from "../../../stores/api/tokens/token-store";
import { PoolStore } from "../../../stores/api/pools/pool-store";
import { useRouter } from "next/router";
import { useTranslation } from "react-multi-lang";

type DialogSearchProps = {
	open: boolean;
	onClose: () => void;
};

const maxItems = 3;

export const DialogSearch = observer(({ open, onClose }: DialogSearchProps) => {
	const {
		tokensStore: { tokens },
		poolsStore: { pools },
	} = useStore();
	const t = useTranslation();

	const router = useRouter();
	const [tokensFiltered, setTokensFiltered] = useState([tokens[0], tokens[1]]);
	const [poolsFiltered, setPoolsFiltered] = useState([pools[0], pools[1]]);
	const refInput = React.useRef<HTMLInputElement>(null);
	const [search, setSearch] = useState("");
	const [currentSelected, setCurrentSelected] = useState(-1);

	const goToToken = useCallback(
		(token: TokenStore) => {
			setSearch("");
			setCurrentSelected(-1);
			onClose();
			router.push(`/tokens/${token.symbol}`);
		},
		[onClose, router]
	);

	const goToPool = useCallback(
		(pool: PoolStore) => {
			setCurrentSelected(-1);
			setSearch("");
			onClose();
			router.push(`/pools/${pool.id}`);
		},
		[onClose, router]
	);

	useEffect(() => {
		if (refInput.current && open) {
			refInput.current.focus();
		}
	}, [refInput, open]);

	const handleItemClick = useCallback(
		(item: TokenStore | PoolStore) => {
			if ("symbol" in item && item.symbol) {
				goToToken(item);
			} else {
				goToPool(item as PoolStore);
			}
		},
		[goToPool, goToToken]
	);

	const onEnter = useCallback(() => {
		if (currentSelected >= 0 && currentSelected < maxItems) {
			const selectedItem = tokensFiltered[currentSelected];
			handleItemClick(selectedItem);
		} else if (currentSelected >= maxItems && currentSelected < maxItems * 2) {
			const selectedItem = poolsFiltered[currentSelected - maxItems];
			handleItemClick(selectedItem);
		}
	}, [currentSelected, tokensFiltered, handleItemClick, poolsFiltered]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowUp") {
				event.preventDefault();
				setCurrentSelected((prevSelected) => (prevSelected > 0 ? prevSelected - 1 : maxItems * 2 - 1));
			} else if (event.key === "ArrowDown") {
				event.preventDefault();
				setCurrentSelected((prevSelected) => (prevSelected < maxItems * 2 - 1 ? prevSelected + 1 : 0));
			} else if (event.key === "Enter") {
				event.preventDefault();
				onEnter();
			}
		};

		if (refInput.current && open) {
			refInput.current.focus();
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [refInput, open, onEnter]);

	useEffect(() => {
		const tokensFiltered = onSearch(tokens, search).slice(0, maxItems);
		const poolsFiltered = onSearch(pools, search).slice(0, maxItems);

		setPoolsFiltered(poolsFiltered);
		setTokensFiltered(tokensFiltered);
	}, [search, pools, tokens]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const onClear = () => {
		if (search === "") onClose();
		setSearch("");
	};

	return (
		<Dialog onClose={onClose} open={open} closeOnClickAway={true} classNamePaper="!p-0">
			<div className="">
				<InputSearch ref={refInput} onClear={onClear} onChange={onChange} value={search} />
				<div className="p-2 max-h-[600px] overflow-auto">
					<p className="text-osmosverse-400 mt-1 mb-1">{t("search.tokens")}</p>
					{tokensFiltered.length === 0 && (
						<p className="text-osmosverse-500 mt-1 mb-1 text-sm italic">{t("search.noResultTokens")}</p>
					)}
					{tokensFiltered.map((token, index) => {
						const isSelected = index === currentSelected;
						return <TokenItem token={token} key={token.denom} selected={isSelected} onClick={handleItemClick} />;
					})}

					<p className="text-osmosverse-400 mt-6 mb-1">{t("search.pools")}</p>
					{poolsFiltered.length === 0 && (
						<p className="text-osmosverse-500 mt-1 mb-1 text-sm italic">{t("search.noResultPools")}</p>
					)}
					{poolsFiltered.map((pool, index) => {
						const isSelected = index + maxItems === currentSelected;
						return <PoolItem pool={pool} key={pool.id} selected={isSelected} onClick={handleItemClick} />;
					})}
				</div>
			</div>
		</Dialog>
	);
});

function onSearch<T extends TokenStore | PoolStore>(data: T[], searchInput: string): T[] {
	const dataSorted = [...data];
	dataSorted.sort((a, b) => {
		if (b.liquidity < a.liquidity) {
			return -1;
		}
		if (b.liquidity > a.liquidity) {
			return 1;
		}
		return 0;
	});

	return dataSorted.filter((value) => {
		if ("symbol" in value && value.symbol) {
			return (
				normalize(value.name).includes(normalize(searchInput)) ||
				normalize(value.symbol).includes(normalize(searchInput))
			);
		} else {
			return normalize(value.name).includes(normalize(searchInput));
		}
	});
}
