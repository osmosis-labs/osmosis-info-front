import React from "react";
import { TableConfiguration } from "./types";
import { TableRoot } from "./table-root";
import { TableProvider } from "./context/table-context";
import { useStateInitialize } from "./hooks/use-state-initializer";
import { Body } from "./body/body";

export type TableProps = {
	config: TableConfiguration;
	data: any[];
};

export const Table = React.memo(function ({ data, config }: TableProps) {
	const { tableState, columnsState, rowState } = useStateInitialize(config);

	return (
		<TableProvider
			initialTableState={tableState}
			initialColumnsState={columnsState}
			initialRowState={rowState}
			configuration={config}
		>
			<TableRoot>
				<div className="h-[53px] border-2 border-main-300 flex items-center p-2">Header</div>
				<Body data={data} />
				<div className="h-[53px] border-2 border-main-300 flex items-center p-2">Footer</div>
			</TableRoot>
		</TableProvider>
	);
});

Table.displayName = "Table";
