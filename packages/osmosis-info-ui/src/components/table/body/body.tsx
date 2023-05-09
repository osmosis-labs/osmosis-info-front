import React, { useRef, useMemo } from "react";
import { Row } from "../row/row";
import { calculeSizes } from "../utils/size";
import useResizeObserver from "../../../hooks/use-windows-resize";
import { useTable } from "../context/table-context";
import { findInArray } from "../utils/utils";
import { ColumnState } from "../types";

export const Body = ({ data }: { data: any[] }) => {
	const refContent = useRef<HTMLDivElement | null>(null);
	const refContainer = useRef<HTMLDivElement | null>(null);
	const {
		rowState: { height: rowHeight },
		tableState: { rowPerPage, currentPage, orderBy, orderDirection },
		columnsState,
		updateColumnsState,
		configuration: { columns, autoHeight },
	} = useTable();

	const handleResize = (): void => {
		if (refContent && refContent.current && refContainer && refContainer.current) {
			const diff = refContent.current.offsetWidth - refContent.current.clientWidth;
			const hasScrollbar = refContent.current.scrollHeight > refContent.current.clientHeight;

			let currentWidth = refContent.current.getClientRects()[0].width;
			if (hasScrollbar) currentWidth -= diff;
			const sizeColumns = calculeSizes(currentWidth || null, columns);

			columnsState.forEach((c, index) => {
				const width = sizeColumns[c.key] || 100;
				columnsState[index].width = width;
			});
			updateColumnsState([...columnsState]);
		}
	};

	useResizeObserver(refContent, handleResize, { delay: 100 });

	const cutRowStart = currentPage * rowPerPage;
	const cutRowEnd = currentPage * rowPerPage + rowPerPage;
	const emptyRows = Math.max(0, (1 + currentPage) * rowPerPage - data.length);

	const displayData = useMemo(() => {
		const res = [...data];

		const currentColumn = findInArray<ColumnState>(columnsState, orderBy || "");

		if (currentColumn) {
			res.sort((a, b) => {
				let res = 0;
				if (currentColumn.onSort && orderBy) {
					if (orderDirection === "ASC") {
						res = currentColumn.onSort(a[orderBy], b[orderBy]);
					} else {
						res = -currentColumn.onSort(a[orderBy], b[orderBy]);
					}
				}
				return res;
			});
		}
		return res;
	}, [columnsState, data, orderBy, orderDirection]);

	return (
		<div className="overflow-hidden border-l-[1px] border-r-[1px] border-main-700" ref={refContainer}>
			<div className="overflow-auto" style={{ maxHeight: `${rowPerPage * rowHeight}px` }} ref={refContent}>
				{displayData.slice(cutRowStart, cutRowEnd).map((currentData, index: number) => {
					return <Row key={index} currentData={currentData} data={data} />;
				})}
				{emptyRows > 0 && !autoHeight && <div style={{ height: `${emptyRows * rowHeight}px` }} />}
			</div>
		</div>
	);
};
