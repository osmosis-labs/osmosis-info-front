export type Density = "small" | "medium" | "large";

export type Params<T> = {
	currentData: T;
	data: T[];
};

export type Accessor = string | ((params: Params<any>) => React.ReactNode);

export type ColumnConfiguration = {
	key: string;
	accessor: Accessor;
	flex?: number;
	maxWidth?: number;
	minWidth?: number;
};

export type ColumnConfigurationWidthMinWitdh = ColumnConfiguration & {
	minWidth: number;
};

export type ColumnConfigurationWidthFlex = ColumnConfigurationWidthMinWitdh & {
	flex: number;
};

export type ColumnState = {
	key: string;
	width: number;
	order: "ASC" | "DESC" | null;
	sorted: boolean;
};

export type TableConfiguration = {
	columns: ColumnConfiguration[];
	defaultOrderBy?: string;
	defaultSortDirection?: "ASC" | "DESC" | null;
	density?: Density;
	onClickRow?: (params: Params<any>) => void;
	onClickCell?: (params: Params<any>) => void;
};

export type TableState = {
	orderBy?: string;
	sortDirection?: "ASC" | "DESC" | null;
	density?: Density;
};
