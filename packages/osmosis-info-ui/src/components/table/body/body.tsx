import React, { useRef } from "react";
import { Row } from "../row/row";
import { calculeSizes } from "../utils/size";
import useResizeObserver from "../../../hooks/use-windows-resize";
import { useTable } from "../context/table-context";

export const Body = ({ data }: { data: any[] }) => {
	const { columnsState, updateColumnsState, configuration } = useTable();
	const refContent = useRef<HTMLDivElement | null>(null);
	const refContainer = useRef<HTMLDivElement | null>(null);
	const {
		rowState: { height: rowHeight },
		tableState: { rowPerPage },
	} = useTable();

	const handleResize = (): void => {
		if (refContent && refContent.current && refContainer && refContainer.current) {
			const diff = refContent.current.offsetWidth - refContent.current.clientWidth;
			const hasScrollbar = refContent.current.scrollHeight > refContent.current.clientHeight;

			let currentWidth = refContent.current.getClientRects()[0].width;
			if (hasScrollbar) currentWidth -= diff;
			const sizeColumns = calculeSizes(currentWidth || null, configuration.columns);

			columnsState.forEach((c, index) => {
				const width = sizeColumns[c.key] || 100;
				columnsState[index].width = width;
			});
			updateColumnsState([...columnsState]);
		}
	};

	useResizeObserver(refContent, handleResize, { delay: 100 });

	return (
		<div className="flex-1 overflow-hidden" ref={refContainer}>
			<div className="overflow-auto" style={{ maxHeight: `${rowPerPage * rowHeight}px` }} ref={refContent}>
				{data.map((currentData, index: number) => {
					return <Row key={index} currentData={currentData} data={data} />;
				})}
			</div>
		</div>
	);
};
