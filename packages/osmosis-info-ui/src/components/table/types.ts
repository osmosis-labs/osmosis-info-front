export type Density = "compact" | "medium" | "confortable";

export type Alignment = "left" | "center" | "right";

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
	display: string;
	key: string;
	accessor?: Accessor;
	flex?: number;
	maxWidth?: number;
	minWidth?: number;
	align?: Alignment;
	onSort?: (a: any, b: any) => number;
	sortable?: boolean;
};

export type ColumnState = {
	key: string;
	display: string;
	accessor: Accessor;
	width: number;
	orderDirection: OrderDirection;
	sorted: boolean;
	align: Alignment;
	onSort?: (a: any, b: any) => number;
	sortable: boolean;
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
export type OrderDirection = "ASC" | "DESC" | null;

export type TableTranslations = {
	footer?: {
		rowsPerPage?: string;
		rangeItems?: (min: number, max: number, length: number) => string;
	};
};

export type TableConfiguration = {
	columns: ColumnConfiguration[];
	defaultOrderBy?: string;
	defaultOrderDirection?: OrderDirection;
	density?: Density;
	rowPerPage?: number;
	rowsPerPage?: number[];
	rowHeight?: number;
	autoHeight?: boolean;
	getRowHeight?: (params: ParamsRowHeight<any>) => number;
	onClickRow?: (params: Params<any>) => void;
	onClickCell?: (params: Params<any>) => void;
	callBackEnd?: (nextPage: (currentPage: number) => void, currentPage: number) => void;
	translations?: TableTranslations;
};

export type TableState = {
	orderBy?: string;
	orderDirection?: OrderDirection;
	densityFactor: number;
	density: Density;
	rowPerPage: number;
	rowsPerPage: number[];
	currentPage: number;
};
