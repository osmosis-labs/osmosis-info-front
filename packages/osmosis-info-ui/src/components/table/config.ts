import { Density, Alignment, ParamsFilter } from "./types";

export const DENSITY_FACTORS: Record<Density, number> = {
	compact: 0.7,
	medium: 1,
	confortable: 1.3,
};

export const ROW_HEIGHT = 53;
export const HEADER_SETTINGS_HEIGHT = 30;
export const HEADER_HEIGHT = 40;

export const SORT = (a: any, b: any) => {
	if (typeof a === "string" && typeof b === "string") return SORT_STRING(a, b);
	else if (typeof a === "number" && typeof b === "number") return SORT_NUMBER(a, b);
	return 0;
};

export const SORT_NUMBER = (a: number, b: number) => a - b;
export const SORT_STRING = (a: string, b: string) => a.localeCompare(b);

export type Filter = { display: string; value: string };

export const onFilterStringChange = (params: ParamsFilter<any>) => true;
export const onFilterNumberChange = (params: ParamsFilter<any>) => true;
export const onFilter = (params: ParamsFilter<any>) => true;
export const filtersString: Filter[] = [
	{ display: "Contains", value: "contains" },
	{ display: "Start width", value: "startWidth" },
	{ display: "End width", value: "endWidth" },
	{ display: "Equals", value: "equals" },
];
export const filtersNumber: Filter[] = [
	{ display: "lower", value: "Lower" },
	{ display: "higher", value: "Higher" },
	{ display: "Equals", value: "equals" },
];

type DefaultColumnConfiguration = {
	hide: boolean;
	filterable: boolean;
	alignment: Alignment;
	sortable: boolean;
	sort: (a: any, b: any) => number;
};

export const DEFAULT_COLUMN_CONFIGURATION: DefaultColumnConfiguration = {
	hide: false,
	filterable: false,
	alignment: "left" as Alignment,
	sortable: true,
	sort: SORT,
};

type DefaultTableConfiguration = {
	displaySettings: boolean;
	rowPerPage: number;
	rowsPerPage: number[];
	density: Density;
};

export const DEFAULT_TABLE_CONFIGURATION: DefaultTableConfiguration = {
	displaySettings: true,
	rowPerPage: 10,
	rowsPerPage: [5, 10, 25, 50],
	density: "medium",
};
