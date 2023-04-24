export type Density = "compact" | "medium" | "confortable";

export type Params<T> = {
	currentData: T;
	data: T[];
};

export type ParamsRowHeight<T> = {
	currentData: T;
	data: T[];
	densityFactor: number;
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

export type RowState = {
	height: number;
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
	rowPerPage?: number;
	rowHeight?: number;
	getRowHeight?: (params: ParamsRowHeight<any>) => number;
	onClickRow?: (params: Params<any>) => void;
	onClickCell?: (params: Params<any>) => void;
};

export type TableState = {
	orderBy?: string;
	sortDirection?: "ASC" | "DESC" | null;
	densityFactor: number;
	density: Density;
	rowPerPage: number;
};
