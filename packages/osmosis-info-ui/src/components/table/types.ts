import { Filter } from "./config";

export type Density = "compact" | "medium" | "confortable";

export type Alignment = "left" | "center" | "right";

export type Params<T> = {
	currentData: T;
	data: T[];
};

export type ParamsFilter<T> = {
	data: T;
	filter: Filter;
	value: any;
	key: string;
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
	hide?: boolean;
	accessor?: Accessor;
	flex?: number;
	maxWidth?: number;
	minWidth?: number;
	align?: Alignment;
	onSort?: (a: any, b: any) => number;
	filterable?: boolean;
	filters?: Filter[];
	onFilter?: (argFilter: ParamsFilter<any>) => boolean;
	sortable?: boolean;
};

export type ColumnState = {
	key: string;
	display: string;
	hide: boolean;
	accessor: Accessor;
	width: number;
	flex?: number;
	minWidth: number;
	maxWidth?: number;
	orderDirection: OrderDirection;
	sorted: boolean;
	align: Alignment;
	onSort?: (a: any, b: any) => number;
	sortable: boolean;
	filterable: boolean;
	onFilter?: (argFilter: ParamsFilter<any>) => boolean;
	filters: Filter[];
};

export type TableSettingsDisabled = {
	density?: boolean;
	csv?: boolean;
	hide?: boolean;
	orderable?: boolean;
	filterable?: boolean;
	resizable?: boolean;
};

export type TableConfiguration = {
	columns: ColumnConfiguration[];
	disabledSettings?: TableSettingsDisabled;
	displaySettings?: boolean;
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
	callBackUpdateStates?: ({
		tableState,
		columnsState,
	}: {
		tableState: TableState;
		columnsState: ColumnState[];
	}) => void;
	translations?: TableTranslations;
	resizing?: boolean;
};

export type TableState = {
	orderBy?: string;
	orderDirection?: OrderDirection;
	density: Density;
	rowPerPage: number;
	rowsPerPage: number[];
	currentPage: number;
	width: number;
	displaySettings: boolean;
	filter?: Filter;
	filterColumn?: string;
	filterValue?: any;
	resizing: boolean;
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
