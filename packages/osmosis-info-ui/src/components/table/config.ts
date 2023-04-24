import { Density } from "./types";

export const DENSITY = "medium" as Density;
export const DENSITY_FACTORS: Record<Density, number> = {
	compact: 0.7,
	medium: 1,
	confortable: 1.3,
};

export const ROW_HEIGHT = 53;
