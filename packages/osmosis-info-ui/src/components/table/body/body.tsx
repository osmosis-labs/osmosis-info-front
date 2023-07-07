import React, { useRef, useMemo, UIEvent } from "react";
import { Row } from "../row/row";
import { ColumnSize, calculeSizes } from "../utils/size";
import useResizeObserver from "../../../hooks/use-windows-resize";
import { useTable } from "../context/table-context";
import { findInArray } from "../utils/utils";
import { ColumnState } from "../types";
import { SkeletonRow } from "../row/row-skeleton";

export const Body = ({ onScroll }: { onScroll: (e: UIEvent<HTMLDivElement>) => void }) => {
	const refContent = useRef<HTMLDivElement | null>(null);
	const refContainer = useRef<HTMLDivElement | null>(null);
	const {
		rowState: { height: rowHeight },
		tableState,
		columnsState,
		updateColumnsState,
		updateWidth,
		configuration: { autoHeight },
		displayData,
		data,
	} = useTable();
	const { rowPerPage, currentPage, isLoading } = tableState;

	const handleResize = (): void => {
		if (refContent && refContent.current) {
			const diff = refContent.current.offsetWidth - refContent.current.clientWidth;
			const hasScrollbar = refContent.current.scrollHeight > refContent.current.clientHeight;

			let currentWidth = refContent.current.getClientRects()[0].width;
			if (hasScrollbar) currentWidth -= diff;
			updateWidth(currentWidth);
		}
	};

	useResizeObserver(refContent, handleResize, { delay: 100 });

	const cutRowStart = currentPage * rowPerPage;
	const cutRowEnd = currentPage * rowPerPage + rowPerPage;
	const emptyRows = Math.max(0, (1 + currentPage) * rowPerPage - data.length);

	return (
		<div className="border-l-[1px] border-r-[1px]  border-osmosverse-700" ref={refContainer}>
			<div
				className="overflow-auto"
				style={{ maxHeight: `${rowPerPage * rowHeight}px` }}
				ref={refContent}
				onScroll={onScroll}
			>
				{displayData.slice(cutRowStart, cutRowEnd).map((currentData, index: number) => {
					return isLoading ? <SkeletonRow key={index} /> : <Row key={index} currentData={currentData} data={data} />;
				})}
				{emptyRows > 0 && !autoHeight && <div style={{ height: `${emptyRows * rowHeight}px` }} />}
			</div>
		</div>
	);
};
