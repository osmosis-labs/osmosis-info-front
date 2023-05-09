import React from "react";
import { TableConfiguration } from "./types";
import { TableRoot } from "./table-root";
import { TableProvider } from "./context/table-context";
import { useStateInitialize } from "./hooks/use-state-initializer";
import { Body } from "./body/body";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

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
				<Header />
				<Body data={data} />
				<Footer data={data} />
			</TableRoot>
		</TableProvider>
	);
});

Table.displayName = "Table";
