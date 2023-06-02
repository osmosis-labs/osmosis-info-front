import { Button, Table } from "@latouche/osmosis-info-ui";
import { filtersNumber, filtersString } from "@latouche/osmosis-info-ui/lib/esm/components/table/config";
import {
	ColumnConfiguration,
	ColumnState,
	Params,
	ParamsRowHeight,
	TableConfiguration,
	TableState,
} from "@latouche/osmosis-info-ui/lib/esm/components/table/types";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Token } from "../../stores/api/tokens/tokens";
import { CellName } from "./cell-name";
import { Image } from "../image/image";

const STORAGE_KEY = process.env.NEXT_PUBLIC_APP_STORAGE_KEY ?? "OSMO_KEY_";
const KEY_SETTINGS = `${STORAGE_KEY}TOKEN_TABLE`;

const formatPrice = (price: number, decimals = 2) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: decimals,
	}).format(price);
};

function getRandomValue<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

const getName = () => getRandomValue(["Osmo", "Cosmo", "Juno", "Jupiter", "Saturn", "Uranus", "Neptune"]);
const getPrice = () => Math.floor(Math.random() * 100000);
const getImage = () =>
	getRandomValue([
		"https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
		"https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
		"https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png",
	]);

const onClickCell = (params: Params<Token>) => {
	const { data, currentData } = params;
	console.log(
		"%ctable.tsx -> 114 BLUE: currentData, data",
		"background: #2196f3; color:#FFFFFF",
		":",
		currentData,
		data
	);
};

const onClickRow = (currentData: Token, data: Token[]) => {
	console.log("%ctable.tsx -> 94 PINK: currentData, data", "background: #e91e63; color:#FFFFFF", currentData, data);
};

const imageRender = (params: Params<Token>) => {
	return <img src={params.currentData.image} alt={params.currentData.name} className={"h-[24px]"} />;
};

const dataDefault: Token[] = [];

export const TokenTable = ({ data }: { data: Token[] }) => {
	const [currentData, setCurrentData] = useState<Token[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setCurrentData([...data]);
		if (data.length > 0) setLoading(false);
	}, [data]);

	const [config, setConfig] = useState<TableConfiguration | null>(null);

	useEffect(() => {
		const savedSettings = JSON.parse(localStorage.getItem(KEY_SETTINGS) ?? "{}") as Partial<TableConfiguration>;

		const columnsSetting: Record<string, Partial<ColumnConfiguration>> = (savedSettings?.columns ?? []).reduce(
			(acc, column) => {
				if (typeof column.key === "string") {
					acc[column.key] = {
						minWidth: column.minWidth,
						flex: column.flex,
						sortable: column.sortable,
						// Ajoutez d'autres propriétés de colonne que vous souhaitez inclure dans `columnsSetting`
					};
				}
				return acc;
			},
			{} as Record<string, Partial<ColumnConfiguration>>
		);

		const newConfig: TableConfiguration = {
			onClickRow: onClickCell,
			onClickCell: onClickCell,
			density: savedSettings.density ?? "medium",
			autoHeight: false,
			defaultOrderBy: savedSettings.defaultOrderBy ?? "id",
			defaultOrderDirection: savedSettings.defaultOrderDirection ?? "ASC",
			resizing: savedSettings.resizing ?? false,
			callBackUpdateStates,

			translations: {
				footer: {
					rangeItems: (min, max, length) => `${min} - ${max} sur ${length}`,
					rowsPerPage: "Lignes par page:",
				},
			},

			columns: [
				{
					display: "ID",
					key: "id",
					flex: 1,
					minWidth: columnsSetting.id?.minWidth ?? 300,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Token",
					key: "Token",
					flex: 1,
					minWidth: columnsSetting.id?.minWidth ?? 200,
					accessor: (params: Params<Token>) => <CellName token={params.currentData} />,
					sortable: true,
					filterable: true,
					filters: filtersString,
				},
				// {
				// 	display: "Image",
				// 	key: "image",
				// 	accessor: imageRender,
				// 	minWidth: 200,
				// 	flex: 1,
				// },
				// {
				// 	display: "Price",
				// 	key: "price",
				// 	accessor: (params: Params<Token>) => formatPrice(params.currentData.price),
				// 	minWidth: 300,
				// 	flex: 1,
				// 	align: "right",
				// },
			],
		};

		setConfig(newConfig);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const callBackUpdateStates = useCallback(
		({ tableState, columnsState }: { tableState: TableState; columnsState: ColumnState[] }) => {
			const settingsTable: Partial<TableConfiguration> = {
				displaySettings: tableState.displaySettings,
				defaultOrderBy: tableState.orderBy,
				defaultOrderDirection: tableState.orderDirection,
				density: tableState.density,
				rowPerPage: tableState.rowPerPage,
				rowsPerPage: tableState.rowsPerPage,
				columns: columnsState.map((c: ColumnState) => ({
					display: c.display,
					key: c.key,
					flex: c.flex,
					minWidth: c.minWidth,
					sortable: c?.sortable,
					filters: c.filters,
					filterable: c.filterable,
				})),
			};
			localStorage.setItem(KEY_SETTINGS, JSON.stringify(settingsTable));
		},
		[]
	);

	return (
		<div className="">
			<div className="my-4">{config && <Table config={config} data={currentData} isLoading={loading} />}</div>
		</div>
	);
};
