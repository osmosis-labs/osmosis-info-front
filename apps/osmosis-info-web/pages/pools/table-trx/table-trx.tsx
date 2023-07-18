import { Table } from "@latouche/osmosis-info-ui";
import { filtersNumber } from "@latouche/osmosis-info-ui/lib/esm/components/table/config";
import {
	ColumnConfiguration,
	ColumnState,
	Params,
	TableConfiguration,
	TableState,
} from "@latouche/osmosis-info-ui/lib/esm/components/table/types";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-multi-lang";
import { useStore } from "../../../stores";
import { Trx } from "../../../stores/api/pools/trx-store";
import { CellHash } from "./cell-hash";
import { CellTime } from "./cell-time";
import { CellPool } from "./cell-pool";
import { CellAddress } from "./cell-address";
import { CellValue } from "./cell-value";
import { CellTokenIn, CellTokenOut } from "./cell-token";

const STORAGE_KEY = process.env.NEXT_PUBLIC_APP_STORAGE_KEY ?? "OSMO_KEY_";
const KEY_SETTINGS = `${STORAGE_KEY}POOL_TRX_TABLE`;

export const TableTrx = ({
	data,
	autoHeight,
	onClickMore,
	isLoading,
}: {
	data: Trx[];
	autoHeight?: boolean;
	isLoading?: boolean;
	onClickMore: (nextPage: (currentPage: number) => void, currentPage: number, rowPerPage: number) => void;
}) => {
	const t = useTranslation();
	const [currentData, setCurrentData] = useState<Trx[]>([]);
	const [loading, setLoading] = useState(true);
	const { settingsStore } = useStore();
	const language = settingsStore.getSettingById("language")?.state.value;
	useEffect(() => {
		setCurrentData([...data]);
		if (data.length > 0) setLoading(false);
	}, [data]);

	const [config, setConfig] = useState<TableConfiguration | null>(null);

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
			autoHeight,
			defaultOrderBy: savedSettings.defaultOrderBy ?? "liquidity",
			defaultOrderDirection: savedSettings.defaultOrderDirection ?? "ASC",
			resizing: savedSettings.resizing ?? false,
			callBackUpdateStates,
			callBackEnd: onClickMore,
			columns: [
				{
					display: "hash",
					key: "hash",
					flex: 1,
					minWidth: columnsSetting.hash?.minWidth ?? 130,
					sortable: true,
					accessor: (params: Params<Trx>) => <CellHash trx={params.currentData} />,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "time",
					key: "time",
					flex: 1,
					minWidth: columnsSetting.time?.minWidth ?? 150,
					sortable: true,
					accessor: (params: Params<Trx>) => <CellTime trx={params.currentData} />,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Pools",
					key: "pool",
					flex: 1,
					minWidth: columnsSetting.pools?.minWidth ?? 220,
					sortable: true,
					accessor: (params: Params<Trx>) => <CellPool trx={params.currentData} />,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Token in",
					key: "tokenIn",
					align: "right",
					flex: 1,
					minWidth: columnsSetting.tokenIn?.minWidth ?? 150,
					sortable: true,
					accessor: (params: Params<Trx>) => <CellTokenIn trx={params.currentData} />,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Token out",
					align: "right",
					key: "tokenOut",
					flex: 1,
					minWidth: columnsSetting.tokenOut?.minWidth ?? 150,
					sortable: true,
					accessor: (params: Params<Trx>) => <CellTokenOut trx={params.currentData} />,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "value",
					key: "value",
					flex: 1,
					minWidth: columnsSetting.value?.minWidth ?? 100,
					sortable: true,
					accessor: (params: Params<Trx>) => <CellValue trx={params.currentData} />,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "address",
					key: "address",
					flex: 1,
					minWidth: columnsSetting.address?.minWidth ?? 300,
					sortable: true,
					accessor: (params: Params<Trx>) => <CellAddress trx={params.currentData} />,
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
		<div className="mt-4">
			{config && (
				<Table
					config={config}
					data={currentData}
					isLoading={loading || isLoading}
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
								address: t("pools.trx.address"),
								value: t("pools.trx.value"),
								hash: t("pools.trx.hash"),
								time: t("pools.trx.time"),
								tokenIn: t("pools.trx.tokenIn"),
								tokenOut: t("pools.trx.tokenOut"),
								pools: t("pools.trx.pools"),
							},
						},
					}}
				/>
			)}
		</div>
	);
};
