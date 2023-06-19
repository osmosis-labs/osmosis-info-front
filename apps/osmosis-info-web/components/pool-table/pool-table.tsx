import { Table } from "@latouche/osmosis-info-ui";
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
import { formatAutoPrice, formateNumberDecimals, formaterNumber } from "../../helpers/format";
import { useTranslation } from "react-multi-lang";
import { useStore } from "../../stores";
import { useRouter } from "next/router";
import { CellChange } from "../token-table/cell-change";
import { CellName } from "./cell-name";
import { Pool } from "../../stores/api/pools/Pools";
import { PoolStore } from "../../stores/api/pools/pool-store";
import { CellTotalReturn } from "./cell-total-return";

const STORAGE_KEY = process.env.NEXT_PUBLIC_APP_STORAGE_KEY ?? "OSMO_KEY_";
const KEY_SETTINGS = `${STORAGE_KEY}POOL_TABLE`;

export const PoolTable = ({ data }: { data: Pool[] }) => {
	const t = useTranslation();
	const router = useRouter();

	const [currentData, setCurrentData] = useState<Pool[]>([]);
	const [loading, setLoading] = useState(true);
	const { settingsStore } = useStore();
	const language = settingsStore.getSettingById("language")?.state.value;
	useEffect(() => {
		setCurrentData([...data]);
		if (data.length > 0) setLoading(false);
	}, [data]);

	const [config, setConfig] = useState<TableConfiguration | null>(null);

	const onClickRow = useCallback(
		(params: Params<Pool>) => {
			router.push(`/pools/${params.currentData.id}`);
		},
		[router]
	);

	useEffect(() => {
		const savedSettings = {} as Partial<TableConfiguration>; //JSON.parse(localStorage.getItem(KEY_SETTINGS) ?? "{}") as Partial<TableConfiguration>;

		const columnsSetting: Record<string, Partial<ColumnConfiguration>> = (savedSettings?.columns ?? []).reduce(
			(acc, column) => {
				if (typeof column.key === "string") {
					acc[column.key] = {
						minWidth: column.minWidth,
						flex: column.flex,
						sortable: column.sortable,
					};
				}
				return acc;
			},
			{} as Record<string, Partial<ColumnConfiguration>>
		);

		const newConfig: TableConfiguration = {
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
					minWidth: columnsSetting.id?.minWidth ?? 60,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Pool",
					key: "name",
					flex: 2,
					minWidth: columnsSetting.name?.minWidth ?? 280,
					accessor: (params: Params<PoolStore>) => <CellName pool={params.currentData} />,
					sortable: true,
					filterable: true,
					filters: filtersString,
				},
				{
					display: "Liquidity",
					key: "liquidity",
					flex: 1,
					accessor: (params: Params<Pool>) => `$${formaterNumber(params.currentData.liquidity)}`,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Liquidity 24h",
					key: "liquidity24hChange",
					flex: 1,
					accessor: (params: Params<Pool>) => <CellChange change={params.currentData.liquidity24hChange} />,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},

				{
					display: "Volume 24h",
					key: "volume24h",
					flex: 1,
					accessor: (params: Params<Pool>) => `$${formaterNumber(params.currentData.volume24h)}`,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Volume 7d",
					key: "volume7d",
					flex: 1,
					accessor: (params: Params<Pool>) => `$${formaterNumber(params.currentData.volume7d)}`,
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
					accessor: (params: Params<Pool>) => <CellChange change={params.currentData.volume24hChange} />,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Total return",
					key: "totalAPR",
					flex: 1,
					minWidth: columnsSetting.totalReturn?.minWidth ?? 110,
					accessor: (params: Params<PoolStore>) => <CellTotalReturn pool={params.currentData} />,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Fees",
					key: "fees",
					flex: 1,
					accessor: (params: Params<Pool>) => `${formateNumberDecimals(params.currentData.fees.feesPercentage, 2, 2)}%`,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Internal return",
					key: "internalReturn",
					flex: 1,
					accessor: (params: Params<PoolStore>) =>
						`${formateNumberDecimals(params.currentData.internalReturn.apr14d, 2, 2)}%`,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "External return",
					key: "externalReturn",
					flex: 1,
					accessor: (params: Params<PoolStore>) =>
						`${formateNumberDecimals(params.currentData.externalReturn.apr14d, 2, 2)}%`,
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
			// localStorage.setItem(KEY_SETTINGS, JSON.stringify(settingsTable));
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
									name: t("poolsTable.name"),
									liquidity: t("poolsTable.liquidity"),
									liquidity24hChange: t("poolsTable.liquidity24hChange"),
									volume24h: t("poolsTable.volume24h"),
									volume7d: t("poolsTable.volume7d"),
									volume24hChange: t("poolsTable.volume24hChange"),
									totalAPR: t("poolsTable.totalAPR"),
									fees: t("poolsTable.fees"),
									internalReturn: t("poolsTable.internalReturn"),
									externalReturn: t("poolsTable.externalReturn"),
								},
							},
						}}
					/>
				)}
			</div>
		</div>
	);
};
