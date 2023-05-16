import React, { useRef, useMemo, UIEvent } from "react";
import { Row } from "../row/row";
import { calculeSizes } from "../utils/size";
import useResizeObserver from "../../../hooks/use-windows-resize";
import { useTable } from "../context/table-context";
import { findInArray } from "../utils/utils";
import { ColumnState } from "../types";

export const Body = ({ data, onScroll }: { data: any[]; onScroll: (e: UIEvent<HTMLDivElement>) => void }) => {
	const refContent = useRef<HTMLDivElement | null>(null);
	const refContainer = useRef<HTMLDivElement | null>(null);
	const {
		rowState: { height: rowHeight },
		tableState,
		columnsState,
		updateColumnsState,
		updateWidth,
		configuration: { columns, autoHeight },
	} = useTable();
	const { rowPerPage, currentPage, orderBy, orderDirection, filter, filterColumn, filterValue } = tableState;

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

	const displayData = useMemo(() => {
		let res = [...data];
		if (filter !== undefined && filterColumn !== undefined && filterValue !== undefined && filterValue.length > 0) {
			const currentColumn = findInArray(columnsState, filterColumn);
			if (currentColumn && currentColumn.filterable && currentColumn.onFilter) {
				if (currentColumn.onFilter) {
					res = res.filter((data: any) => {
						if (currentColumn.onFilter) {
							return currentColumn.onFilter({ data, filter, value: filterValue, key: currentColumn.key });
						}
						return false;
					});
				}
			}
		}
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
	}, [columnsState, data, orderBy, orderDirection, filter, filterColumn, filterValue]);

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
