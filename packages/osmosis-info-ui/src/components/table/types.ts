import { Filter } from "./config";

/**
Density options for the table.
	- "compact": higher density, displaying less space between elements.
	- "medium": medium density, providing a balance between space and readability.
	- "comfortable": lower density, offering more space between elements for improved readability.
*/
export type Density = "compact" | "medium" | "confortable";

/**
Alignment options for table columns.
	- "left": aligns the content to the left.
	- "center": centers the content.
	- "right": aligns the content to the right.
*/
export type Alignment = "left" | "center" | "right";

/**
Parameters object for table data and current data used for accessor function.
	- currentData: The current data being displayed in the table.
	- data: The complete data set for the table.
*/
export type Params<T> = {
	currentData: T;
	data: T[];
};

/**
Type for defining the accessor function or property name used to access data in table columns.
	- It can be either a string representing the property name or a function that accepts the parameters object and returns a React node.
*/
export type Accessor = string | ((params: Params<any>) => React.ReactNode);

/**
Parameters object for filtering data in the table.
	- data: The data to be filtered.
	- filter: The filter object or criteria.
	- value: The value to be used for filtering.
	- key: The key or property name on which the filtering is applied.
*/
export type ParamsFilter<T> = {
	data: T;
	filter: Filter;
	value: any;
	key: string;
};

/**
Parameters object for calculating the row height in the table.
	- currentData: The current data being displayed in the table.
	- data: The complete data set for the table.
	- densityFactor: The factor used to adjust the row height based on the table's density.
*/
export type ParamsRowHeight<T> = {
	currentData: T;
	data: T[];
	densityFactor: number;
};

/**
Configuration object for defining a table column.
	- display: The display label or title of the column.
	- key: The unique key or identifier for the column.
	- hide (optional): Specifies whether the column should be hidden.
	- accessor (optional): The accessor function or property name used to access data in the column.
	- flex (optional): The flex value for the column's width.
	- maxWidth (optional): The maximum width of the column.
	- minWidth (optional): The minimum width of the column.
	- align (optional): The alignment of the column content.
	- onSort (optional): The custom sorting function for the column.
	- filterable (optional): Specifies whether the column should be filterable.
	- filters (optional): An array of filter options for the column.
	- onFilter (optional): The custom filtering function for the column.
	- sortable (optional): Specifies whether the column should be sortable.
*/
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

/**
State object for a table column.
	- key: The unique key or identifier for the column.
	- display: The display label or title of the column.
	- hide: Specifies whether the column should be hidden.
	- accessor: The accessor function or property name used to access data in the column.
	- width: The width of the column.
	- flex (optional): The flex value for the column's width.
	- minWidth: The minimum width of the column.
	- maxWidth (optional): The maximum width of the column.
	- orderDirection: The current order direction of the column.
	- sorted: Specifies whether the column is currently sorted.
	- align: The alignment of the column content.
	- onSort (optional): The custom sorting function for the column.
	- sortable: Specifies whether the column is sortable.
	- filterable: Specifies whether the column is filterable.
	- onFilter (optional): The custom filtering function for the column.
	- filters: An array of filter options for the column.
*/
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

/**

Object specifying the disabled settings for the table.
	- density (optional): Specifies whether the density setting is disabled.
	- csv (optional): Specifies whether the CSV export setting is disabled.
	- hide (optional): Specifies whether the column visibility setting is disabled.
	- orderable (optional): Specifies whether the column ordering setting is disabled.
	- filterable (optional): Specifies whether the column filtering setting is disabled.
	- resizable (optional): Specifies whether the column resizing setting is disabled.
*/

export type TableSettingsDisabled = {
	density?: boolean;
	csv?: boolean;
	hide?: boolean;
	orderable?: boolean;
	filterable?: boolean;
	resizable?: boolean;
};

/**
Configuration object for the table.
	- columns: An array of column configurations for the table.
	- disabledSettings (optional): Specifies the disabled settings for the table.
	- displaySettings (optional): Specifies whether the table settings display is enabled.
	- defaultOrderBy (optional): The default column key for initial ordering.
	- defaultOrderDirection (optional): The default order direction for initial ordering.
	- density (optional): The density setting for the table.
	- rowPerPage (optional): The number of rows to display per page.
	- rowsPerPage (optional): An array of available options for the number of rows per page.
	- rowHeight (optional): The height of each table row.
	- autoHeight (optional): Specifies whether the table should adjust its height automatically.
	- getRowHeight (optional): A function to calculate the row height dynamically.
	- onClickRow (optional): A callback function triggered when a row is clicked.
	- onClickCell (optional): A callback function triggered when a cell is clicked.
	- callBackEnd (optional): A callback function for fetching data from the backend.
	- callBackUpdateStates (optional): A callback function for updating table and column states.
	- translations (optional): Translations for table components.
	- resizing (optional): Specifies whether column resizing is enabled.
*/
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
	callBackEnd?: (nextPage: (currentPage: number) => void, currentPage: number, rowPerPage: number) => void;
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

/**

State object for the table.
	- orderBy (optional): The key of the column used for ordering.
	- orderDirection (optional): The direction of the ordering.
	- density: The density setting for the table.
	- rowPerPage: The number of rows to display per page.
	- rowsPerPage: An array of available options for the number of rows per page.
	- currentPage: The current page number.
	- width: The width of the table.
	- displaySettings: Specifies whether the table settings are displayed.
	- filter (optional): The filter object or criteria.
	- filterColumn (optional): The key or property name of the filtered column.
	- filterValue (optional): The value used for filtering.
	- resizing: Specifies whether column resizing is enabled.
	- isLoading: Specifies whether the table is in a loading state.
*/
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
	isLoading: boolean;
};

/**

Configuration object for a table column with a minimum width. Extends the ColumnConfiguration type and adds the minWidth property.
	- minWidth: The minimum width of the column.
*/
export type ColumnConfigurationWidthMinWitdh = ColumnConfiguration & {
	minWidth: number;
};

/**
Configuration object for a table column with a minimum width and flex value. Extends the ColumnConfigurationWidthMinWidth type and adds the flex property.
	- flex: The flex value for the column's width.
*/
export type ColumnConfigurationWidthFlex = ColumnConfigurationWidthMinWitdh & {
	flex: number;
};

/**
State object for a table row.
	- height: The height of the row.
*/
export type RowState = {
	height: number;
};

/**

The order direction for table sorting.
	- "ASC": Ascending order.
	- "DESC": Descending order.
	- null: No specific order direction.
*/
export type OrderDirection = "ASC" | "DESC" | null;

/**

Translations object for table components.
	-  footer (optional): Translations for the table footer.
		-  rowsPerPage (optional): Translation for the "Rows per page" label in the footer.
		-  rangeItems (optional): Function that generates a translation for the range of displayed items in the footer, on the minimum value, maximum value, and total length of the data.
*/
export type TableTranslations = {
	footer?: {
		rowsPerPage?: string;
		rangeItems?: (min: number, max: number, length: number) => string;
	};
	header?: {
		buttonSettings?: string;
		title?: string;
		density?: string;
		densityCompact?: string;
		densityMedium?: string;
		densityConfortable?: string;
		downloadCSV?: string;
		columns?: string;
		filter?: string;
		filterLower?: string;
		filterHigher?: string;
		filterEquals?: string;
		filterContains?: string;
		filterStartWith?: string;
		filterEndWith?: string;
		enableColunmResize?: string;
		validate?: string;
	};
};
