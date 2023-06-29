import { Button, Table } from "@latouche/osmosis-info-ui";
import { filtersNumber, filtersString } from "@latouche/osmosis-info-ui/lib/esm/components/table/config";
import {
	ColumnConfiguration,
	ColumnState,
	Params,
	TableConfiguration,
	TableState,
} from "@latouche/osmosis-info-ui/lib/esm/components/table/types";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Token } from "../../stores/api/tokens/tokens";
import { CellName } from "./cell-name";
import { CellChange } from "./cell-change";
import { formatAutoPrice, formaterNumber } from "../../helpers/format";
import { useTranslation } from "react-multi-lang";
import { useStore } from "../../stores";
import { useRouter } from "next/router";

const STORAGE_KEY = process.env.NEXT_PUBLIC_APP_STORAGE_KEY ?? "OSMO_KEY_";
const KEY_SETTINGS = `${STORAGE_KEY}TOKEN_TABLE`;

export const TokenTable = ({ data }: { data: Token[] }) => {
	const t = useTranslation();
	const router = useRouter();

	const [currentData, setCurrentData] = useState<Token[]>([]);
	const [loading, setLoading] = useState(true);
	const { settingsStore } = useStore();
	const language = settingsStore.getSettingById("language")?.state.value;
	useEffect(() => {
		setCurrentData([...data]);
		if (data.length > 0) setLoading(false);
	}, [data]);

	const [config, setConfig] = useState<TableConfiguration | null>(null);

	const onClickRow = useCallback(
		(params: Params<Token>) => {
			router.push(`/tokens/${params.currentData.symbol}`);
		},
		[router]
	);

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
			onClickRow,
			density: savedSettings.density ?? "medium",
			autoHeight: false,
			defaultOrderBy: savedSettings.defaultOrderBy ?? "liquidity",
			defaultOrderDirection: savedSettings.defaultOrderDirection ?? "ASC",
			resizing: savedSettings.resizing ?? false,
			callBackUpdateStates,

			columns: [
				{
					display: "ID",
					key: "id",
					flex: 1,
					maxWidth: 60,
					minWidth: columnsSetting.id?.minWidth ?? 50,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Symbol",
					key: "symbol",
					flex: 2,
					minWidth: columnsSetting.id?.minWidth ?? 200,
					accessor: (params: Params<Token>) => <CellName token={params.currentData} />,
					sortable: true,
					filterable: true,
					filters: filtersString,
				},
				{
					display: "Price",
					key: "price",
					flex: 1,
					accessor: (params: Params<Token>) => formatAutoPrice(params.currentData.price),
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Price 24h",
					key: "price24hChange",
					flex: 1,
					accessor: (params: Params<Token>) => <CellChange change={params.currentData.price24hChange} />,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Market cap",
					key: "marketCap",
					flex: 1,
					accessor: (params: Params<Token>) =>
						params.currentData.marketCap && params.currentData.marketCap > 0
							? `$${formaterNumber(params.currentData.marketCap)}`
							: "-",
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Volumne 24h",
					key: "volume24h",
					flex: 1,
					accessor: (params: Params<Token>) => `$${formaterNumber(params.currentData.volume24h)}`,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Volume 24h change",
					key: "volume24hChange",
					flex: 1,
					accessor: (params: Params<Token>) => <CellChange change={params.currentData.volume24hChange} />,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Liquidity",
					key: "liquidity",
					flex: 1,
					accessor: (params: Params<Token>) => `$${formaterNumber(params.currentData.liquidity)}`,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
			],
		};

		setConfig({ ...newConfig });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	const callBackUpdateStates = useCallback(
		({ tableState, columnsState }: { tableState: TableState; columnsState: ColumnState[] }) => {
			const settingsTable: Partial<TableConfiguration> = {
				onClickRow,
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
			<div className="my-4">
				{config && (
					<Table
						config={config}
						data={currentData}
						isLoading={loading}
						translations={{
							footer: {
								rowsPerPage: t("table.rowsPerPage"),
								rangeItems: (min: number, max: number, length: number) => {
									return (
										t("table.range", {
											min: min.toString(),
											max: max.toString(),
											total: length.toString(),
										}) ?? ""
									);
								},
							},
							header: {
								buttonSettings: t("table.buttonSettings"),
								title: t("table.title"),
								density: t("table.density"),
								densityCompact: t("table.densityCompact"),
								densityMedium: t("table.densityMedium"),
								densityConfortable: t("table.densityConfortable"),
								downloadCSV: t("table.downloadCSV"),
								columns: t("table.columns"),
								filter: t("table.filter"),
								filterLower: t("table.filterLower"),
								filterHigher: t("table.filterHigher"),
								filterEquals: t("table.filterEquals"),
								filterContains: t("table.filterContains"),
								filterStartWith: t("table.filterStartWith"),
								filterEndWith: t("table.filterEndWith"),
								enableColunmResize: t("table.enableColunmResize"),
								validate: t("table.validate"),
								columnsNames: {
									id: t("tokensTable.columnsId"),
									symbol: t("tokensTable.columnsName"),
									price: t("tokensTable.columnsPrice"),
									price24hChange: t("tokensTable.columnsPrice24"),
									marketCap: t("tokensTable.columnsMarketCap"),
									volume24h: t("tokensTable.columnsVolume"),
									volume24hChange: t("tokensTable.columnsVolume24"),
									liquidity: t("tokensTable.columnsLiquidity"),
								},
							},
						}}
					/>
				)}
			</div>
		</div>
	);
};
