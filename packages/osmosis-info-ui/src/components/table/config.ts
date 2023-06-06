import { Density, Alignment, ParamsFilter } from "./types";

export const DENSITY_FACTORS: Record<Density, number> = {
	compact: 0.7,
	medium: 1,
	confortable: 1.3,
};

export const ROW_HEIGHT = 53;
export const HEADER_SETTINGS_HEIGHT = 30;
export const HEADER_HEIGHT = 48;

export const SORT = (a: any, b: any) => {
	if (typeof a === "string" && typeof b === "string") return SORT_STRING(a, b);
	else if (typeof a === "number" && typeof b === "number") return SORT_NUMBER(a, b);
	return 0;
};

export const SORT_NUMBER = (a: number, b: number) => a - b;
export const SORT_STRING = (a: string, b: string) => a.localeCompare(b);

export type Filter = { display: string; value: string };

export const filterContains = (params: ParamsFilter<any>) => {
	return params.data[params.key].toLowerCase().includes(params.value.toLowerCase());
};

export const filterStartWith = (params: ParamsFilter<any>) => {
	return params.data[params.key].toLowerCase().startsWith(params.value.toLowerCase());
};

export const filterEndWith = (params: ParamsFilter<any>) => {
	return params.data[params.key].toLowerCase().endsWith(params.value.toLowerCase());
};

export const filterEqualsString = (params: ParamsFilter<any>) => {
	return params.data[params.key].toLowerCase() === params.value.toLowerCase();
};

export const filterLower = (params: ParamsFilter<any>) => {
	return params.data[params.key] < params.value;
};

export const filterHigher = (params: ParamsFilter<any>) => {
	return params.data[params.key] > params.value;
};

export const filterEqualsNumber = (params: ParamsFilter<any>) => {
	return params.data[params.key] == params.value;
};

export const onFilterStringChange = (params: ParamsFilter<any>) => {
	if (params.filter.value === "contains") {
		return filterContains(params);
	} else if (params.filter.value === "startWith") {
		return filterStartWith(params);
	} else if (params.filter.value === "endWith") {
		return filterEndWith(params);
	} else if (params.filter.value === "equals") {
		return filterEqualsString(params);
	}
	return true;
};
export const onFilterNumberChange = (params: ParamsFilter<any>) => {
	if (params.filter.value === "lower") {
		return filterLower(params);
	} else if (params.filter.value === "higher") {
		return filterHigher(params);
	} else if (params.filter.value === "equals") {
		return filterEqualsNumber(params);
	}
	return true;
};
export const onFilter = (params: ParamsFilter<any>) => {
	if (typeof params.data[params.key] === "string") return onFilterStringChange(params);
	else if (typeof params.data[params.key] === "number") return onFilterNumberChange(params);
	return true;
};
export const filtersString: Filter[] = [
	{ display: "Contains", value: "contains" },
	{ display: "Start with", value: "startWith" },
	{ display: "End with", value: "endWith" },
	{ display: "Equals", value: "equals" },
];
export const filtersNumber: Filter[] = [
	{ display: "Lower", value: "lower" },
	{ display: "Higher", value: "higher" },
	{ display: "Equals", value: "equals" },
];

type DefaultColumnConfiguration = {
	hide: boolean;
	filterable: boolean;
	alignment: Alignment;
	sortable: boolean;
	sort: (a: any, b: any) => number;
	minWidth: number;
};

export const DEFAULT_COLUMN_CONFIGURATION: DefaultColumnConfiguration = {
	hide: false,
	filterable: false,
	alignment: "left" as Alignment,
	sortable: true,
	sort: SORT,
	minWidth: 100,
};

type DefaultTableConfiguration = {
	displaySettings: boolean;
	rowPerPage: number;
	rowsPerPage: number[];
	resizing: boolean;
	density: Density;
};

export const DEFAULT_TABLE_CONFIGURATION: DefaultTableConfiguration = {
	displaySettings: true,
	rowPerPage: 10,
	rowsPerPage: [5, 10, 25, 50],
	density: "medium",
	resizing: false,
};
