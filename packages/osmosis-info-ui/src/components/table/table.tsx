import React, { useRef, UIEvent } from "react";
import { TableConfiguration, TableTranslations } from "./types";
import { TableRoot } from "./table-root";
import { TableProvider } from "./context/table-context";
import { Body } from "./body/body";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { stateInitializer } from "./context/state-initializer";

export type TableProps = {
	config: TableConfiguration;
	data: any[];
	isLoading?: boolean;
	translations?: TableTranslations;
};

export const Table = React.memo(function ({ data, config, isLoading, translations }: TableProps) {
	const { tableState, columnsState, rowState } = stateInitializer(config);
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
			initialColumnsState={[...columnsState]}
			initialRowState={rowState}
			configuration={config}
			data={data}
			isLoading={isLoading}
		>
			<TableRoot>
				<Header ref={refHeader} translations={translations} />
				<Body onScroll={onScroll} />
				<Footer translations={translations} />
			</TableRoot>
		</TableProvider>
	);
});

Table.displayName = "Table";
