import { Density, Alignment } from "./types";

export const DENSITY = "medium" as Density;
export const DENSITY_FACTORS: Record<Density, number> = {
	compact: 0.7,
	medium: 1,
	confortable: 1.3,
};

export const ROW_HEIGHT = 53;
export const HEADER_SETTINGS_HEIGHT = 30;
export const HEADER_HEIGHT = 40;

export const ROW_PER_PAGE = 10;
export const ROWS_PER_PAGE = [5, 10, 25, 50];

export const ALIGMENT = "left" as Alignment;

export const SORTABLE = false;

export const SORT = (a: any, b: any) => {
	if (typeof a === "string" && typeof b === "string") return SORT_STRING(a, b);
	else if (typeof a === "number" && typeof b === "number") return SORT_NUMBER(a, b);
	return 0;
};

export const SORT_NUMBER = (a: number, b: number) => a - b;
export const SORT_STRING = (a: string, b: string) => a.localeCompare(b);

type DefaultColumnConfiguration = {
	hide: boolean;
};

export const DEFAULT_COLUMN_CONFIGURATION: DefaultColumnConfiguration = {
	hide: false,
};

type DefaultTableConfiguration = {
	displaySettings: boolean;
};

export const DEFAULT_TABLE_CONFIGURATION: DefaultTableConfiguration = {
	displaySettings: true,
};
