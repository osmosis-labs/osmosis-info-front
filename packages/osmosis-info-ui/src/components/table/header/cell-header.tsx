import React, { useCallback } from "react";
import { ColumnState, TableTranslations } from "../types";
import { ArrowTopSVG } from "../../svg/arrow-top-svg";
import { useTable } from "../context/table-context";
import { OrderDirection } from "../types";
import { DENSITY_FACTORS, HEADER_HEIGHT } from "../config";
import { useDrag } from "@use-gesture/react";

type CellHeaderProps = {
	column: ColumnState;
	index: number;
	translations?: TableTranslations;
};

export const CellHeader = ({ column, index, translations }: CellHeaderProps) => {
	const { key, width, align, sortable, sorted, orderDirection, display } = column;

	const { updateColumnsState, columnsState, tableState, updateTableState } = useTable();
	const { density, resizing, isLoading } = tableState;

	const densityFactor = DENSITY_FACTORS[density];

	const height = HEADER_HEIGHT * densityFactor;

	const style: React.CSSProperties = {};

	style.maxWidth = `${width}px`;
	style.minWidth = `${width}px`;
	style.height = `${height}px`;

	let className =
		"p-2 flex w-full items-center [&>svg]:hover:opacity-100 [&>svg]:transition-all [&>svg]:duration-default relative ";
	let classNameHover = "text-sm font-medium text-ellipsis overflow-hidden max-w-full max-h-full whitespace-nowrap";

	let classNameIcon = "p-1 fillosmosverse-400";
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
		className += " opacity-100 ";
	} else {
		className += " opacity-60 ";
	}

	if (sortable) {
		className += "hover:opacity-100 transition-opacity transition-colors duration-default";
		classNameHover += " cursor-pointer ";
		classNameIcon += " cursor-pointer ";
	}

	const onSortClick = useCallback(
		(event: React.MouseEvent<HTMLSpanElement | SVGSVGElement>) => {
			if (isLoading) return;
			if (event.target === event.currentTarget) {
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
			}
		},
		[
			sortable,
			column,
			isLoading,
			sorted,
			updateColumnsState,
			updateTableState,
			tableState,
			key,
			orderDirection,
			columnsState,
			index,
		]
	);

	const bind = useDrag(({ delta: [dx] }) => {
		updateColumnsState((prevColumns: ColumnState[]) => {
			const currentColumn = prevColumns[index];
			const newWidth = currentColumn.width + dx;
			return [
				...prevColumns.slice(0, index),
				{ ...column, width: newWidth, flex: undefined, maxWidth: newWidth, minWidth: newWidth },
				...prevColumns.slice(index + 1),
			];
		});
	});

	const onClickResize = (event: React.MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
	};

	return (
		<div className={className} style={style}>
			<span className={classNameHover} onClick={onSortClick}>
				{translations?.header?.columnsNames?.[key] || display}
			</span>
			{sortable && <ArrowTopSVG onClick={onSortClick} className={classNameIcon} />}
			{resizing && (
				<span
					{...bind()}
					onClick={onClickResize}
					style={{ height: `${height}px` }}
					className="cursor-col-resize w-[8px] flex items-center justify-center absolute right-0"
				>
					<span className="w-[2px] bgosmosverse-300 " style={{ height: `${height - 20}px` }} />
				</span>
			)}
		</div>
	);
};
