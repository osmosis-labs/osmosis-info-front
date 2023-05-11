import React, { useRef, UIEvent } from "react";
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
	const refHeader = useRef<HTMLDivElement>(null);

	const onScroll = (event: UIEvent<HTMLDivElement>) => {
		const scrollLeft = event.currentTarget.scrollLeft;

		if (refHeader.current) {
			refHeader.current.style.transform = `translateX(${-scrollLeft}px)`;
		}
	};

	return (
		<TableProvider
			initialTableState={tableState}
			initialColumnsState={columnsState}
			initialRowState={rowState}
			configuration={config}
		>
			<TableRoot>
				<Header ref={refHeader} />
				<Body data={data} onScroll={onScroll} />
				<Footer data={data} />
			</TableRoot>
		</TableProvider>
	);
});

Table.displayName = "Table";
