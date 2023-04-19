import React, { useRef } from "react";
import useResizeObserver from "../../hooks/use-windows-resize";
import { useTable } from "./context/table-context";
import { calculeSizes } from "./utils/size";

export type TableRootProps = React.HTMLAttributes<HTMLDivElement>;

export const TableRoot = React.forwardRef<HTMLDivElement, React.PropsWithChildren>(function (props: TableRootProps) {
	const { columnsState, updateColumnsState, configuration } = useTable();
	const refT = useRef<HTMLDivElement | null>(null);

	const handleResize = (): void => {
		if (refT && refT.current) {
			const currentWidth = refT.current.getClientRects()[0].width;
			const sizeColumns = calculeSizes(currentWidth || null, configuration.columns);

			columnsState.forEach((c, index) => {
				const width = sizeColumns[c.key] || 100;
				columnsState[index].width = width;
			});
			updateColumnsState([...columnsState]);
		}
	};

	useResizeObserver(refT, handleResize, { delay: 100 });

	return (
		<div className="w-full border-2 border-main-500">
			<div className="overflow-auto max-w-full" ref={refT}>
				{props.children}
			</div>
		</div>
	);
});

TableRoot.displayName = "TableRoot";
