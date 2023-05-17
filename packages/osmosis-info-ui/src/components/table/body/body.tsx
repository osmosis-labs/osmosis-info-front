import React, { useRef, useMemo, UIEvent } from "react";
import { Row } from "../row/row";
import { calculeSizes } from "../utils/size";
import useResizeObserver from "../../../hooks/use-windows-resize";
import { useTable } from "../context/table-context";
import { findInArray } from "../utils/utils";
import { ColumnState } from "../types";

export const Body = ({ onScroll }: { onScroll: (e: UIEvent<HTMLDivElement>) => void }) => {
	const refContent = useRef<HTMLDivElement | null>(null);
	const refContainer = useRef<HTMLDivElement | null>(null);
	const {
		rowState: { height: rowHeight },
		tableState,
		columnsState,
		updateColumnsState,
		updateWidth,
		configuration: { columns, autoHeight },
		displayData,
		data,
	} = useTable();
	const { rowPerPage, currentPage } = tableState;

	const handleResize = (): void => {
		if (refContent && refContent.current && refContainer && refContainer.current) {
			const diff = refContent.current.offsetWidth - refContent.current.clientWidth;
			const hasScrollbar = refContent.current.scrollHeight > refContent.current.clientHeight;

			let currentWidth = refContent.current.getClientRects()[0].width;
			if (hasScrollbar) currentWidth -= diff;
			const sizeColumns = calculeSizes(
				currentWidth || null,
				columns.filter((column) => {
					const currentState = findInArray(columnsState, column.key);
					return currentState && !currentState.hide;
				})
			);

			columnsState.forEach((c, index) => {
				const width = sizeColumns[c.key] || 100;
				columnsState[index].width = width;
			});
			updateWidth(currentWidth);
			updateColumnsState([...columnsState]);
		}
	};

	useResizeObserver(refContent, handleResize, { delay: 100 });

	const cutRowStart = currentPage * rowPerPage;
	const cutRowEnd = currentPage * rowPerPage + rowPerPage;
	const emptyRows = Math.max(0, (1 + currentPage) * rowPerPage - data.length);

	return (
		<div className="border-l-[1px] border-r-[1px] border-surface" ref={refContainer}>
			<div
				className="overflow-auto"
				style={{ maxHeight: `${rowPerPage * rowHeight}px` }}
				ref={refContent}
				onScroll={onScroll}
			>
				{displayData.slice(cutRowStart, cutRowEnd).map((currentData, index: number) => {
					return <Row key={index} currentData={currentData} data={data} />;
				})}
				{emptyRows > 0 && !autoHeight && <div style={{ height: `${emptyRows * rowHeight}px` }} />}
			</div>
		</div>
	);
};
