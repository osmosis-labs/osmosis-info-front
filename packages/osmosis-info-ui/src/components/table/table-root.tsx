import React from "react";

export type TableRootProps = React.HTMLAttributes<HTMLDivElement>;

export const TableRoot = (props: TableRootProps) => {
	return (
		<div className="w-full border-main-500">
			<div className="overflow-auto max-w-full">{props.children}</div>
		</div>
	);
};

TableRoot.displayName = "TableRoot";
