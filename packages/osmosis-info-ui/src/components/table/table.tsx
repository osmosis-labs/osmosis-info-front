import React from "react";
import { TableConfiguration } from "./types";
import { Row } from "./row/row";
import { TableRoot } from "./table-root";
import { TableProvider } from "./context/table-context";
import { useStateInitialize } from "./hooks/use-state-initializer";

export type TableProps = {
	config: TableConfiguration;
	data: any[];
};

export const Table = React.memo(function ({ data, config }: TableProps) {
	const { tableState, columnsState } = useStateInitialize(config);

	return (
		<TableProvider initialTableState={tableState} initialColumnsState={columnsState} configuration={config}>
			<TableRoot>
				{data.map((currentData, index: number) => {
					return <Row key={index} currentData={currentData} data={data} />;
				})}
			</TableRoot>
		</TableProvider>
	);
});

Table.displayName = "Table";
