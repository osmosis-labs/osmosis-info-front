import React from "react";

export type TableRootProps = React.HTMLAttributes<HTMLDivElement>;

export const TableRoot = (props: TableRootProps) => {
	return (
		<div className="w-full">
			<div className="overflow-auto max-w-full">{props.children}</div>
		</div>
	);
};

TableRoot.displayName = "TableRoot";
