import React, { useCallback } from "react";
import { ColumnState } from "../types";
import { ArrowTopSVG } from "../../svg/arrow-top-svg";
import { useTable } from "../context/table-context";
import { OrderDirection } from "../types";
import { DENSITY_FACTORS, HEADER_HEIGHT } from "../config";

type CellHeaderProps = {
	column: ColumnState;
	index: number;
};

export const CellHeader = ({ column, index }: CellHeaderProps) => {
	const { key, width, align, sortable, sorted, orderDirection, display } = column;

	const { updateColumnsState, columnsState, tableState, updateTableState } = useTable();

	const densityFactor = DENSITY_FACTORS[tableState.density];

	const height = HEADER_HEIGHT * densityFactor;

	const style: React.CSSProperties = {};

	style.maxWidth = `${width}px`;
	style.minWidth = `${width}px`;
	style.height = `${height}px`;

	let className =
		"p-2 flex w-full items-center [&>svg]:hover:opacity-100 [&>svg]:transition-all [&>svg]:duration-default ";

	let classNameIcon = "p-1 fill-default-500";
	if (align === "right") {
		className += " flex-row-reverse";
	} else if (align === "center") {
		className += " justify-center";
	}

	if (!sorted) {
		className += " [&>svg]:opacity-0";
	} else if (orderDirection === "DESC") {
		classNameIcon += " rotate-180";
	}

	if (sorted) {
		className += " opacity-100";
	} else {
		className += " opacity-60 ";
	}

	if (sortable) {
		className += " cursor-pointer hover:opacity-100 transition-opacity transition-colors duration-default";
	}

	const onSortClick = useCallback(() => {
		if (sortable) {
			const columnUpdated = { ...column };
			let columns: ColumnState[] = [];
			let direction: OrderDirection = "ASC";
			if (sorted) {
				direction = orderDirection === "ASC" ? "DESC" : "ASC";
				columnUpdated.orderDirection = direction;
				columns = [...columnsState.slice(0, index), columnUpdated, ...columnsState.slice(index + 1)];
			} else {
				columnUpdated.orderDirection = "ASC";
				columnUpdated.sorted = true;

				columns = [
					...columnsState.slice(0, index).map((col) => ({ ...col, sorted: false })),
					columnUpdated,
					...columnsState.slice(index + 1).map((col) => ({ ...col, sorted: false })),
				];
			}
			updateColumnsState([...columns]);
			updateTableState({ ...tableState, orderBy: key, orderDirection: direction });
		}
	}, [
		sortable,
		column,
		sorted,
		updateColumnsState,
		updateTableState,
		tableState,
		key,
		orderDirection,
		columnsState,
		index,
	]);

	return (
		<div className={className} style={style} onClick={onSortClick}>
			{display}
			{sortable && <ArrowTopSVG className={classNameIcon} />}
		</div>
	);
};
