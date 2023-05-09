import { Density, Alignment } from "./types";

export const DENSITY = "medium" as Density;
export const DENSITY_FACTORS: Record<Density, number> = {
	compact: 0.7,
	medium: 1,
	confortable: 1.3,
};

export const ROW_HEIGHT = 53;

export const ROW_PER_PAGE = 10;
export const ROWS_PER_PAGE = [5, 10, 25, 50];

export const ALIGMENT = "left" as Alignment;
