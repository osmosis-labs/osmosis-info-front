import { drag, zoomInIndex } from "./bar-time-utils";

describe("zoomInIndex", () => {
	describe("Check type and props returned", () => {
		it("should return an object of type limit", () => {
			const limits = { start: 0, end: 10 };
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const index = 5;
			const zoomIn = true;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(typeof result).toBe("object");
			expect(result).toHaveProperty("start");
			expect(result).toHaveProperty("end");
			expect(typeof result.start).toBe("number");
			expect(typeof result.end).toBe("number");
			expect(isNaN(result.start)).toBe(false);
			expect(isNaN(result.end)).toBe(false);
		});
	});
	describe("Check limit in data borns", () => {
		const tests = [
			{ index: 49, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 32, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 5, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 95, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 100, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 99, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 0, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 1, zoomIn: true, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 49, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 32, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 5, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 95, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 100, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 0, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 99, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 1, zoomIn: false, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ index: 1, zoomIn: true, limits: { start: 5, end: 6 }, data: new Array(100) },
			{ index: 46, zoomIn: true, limits: { start: 45, end: 47 }, data: new Array(100) },
			{ index: 79, zoomIn: false, limits: { start: 79, end: 80 }, data: new Array(100) },
		];

		tests.forEach(({ index, zoomIn, limits, data }) => {
			it(`should return limits in dataBorns (index: ${index}, data size: ${data.length}, limits: ${limits.start}, ${limits.end}, zoomIn: ${zoomIn})`, () => {
				const result = zoomInIndex(limits, data, index, zoomIn);

				// start > 0
				expect(result.start).toBeGreaterThanOrEqual(0);
				// start < data.length
				expect(result.start).toBeLessThanOrEqual(data.length);

				// end < data.length
				expect(result.end).toBeLessThanOrEqual(data.length);
				// end > 0
				expect(result.end).toBeGreaterThanOrEqual(0);
			});
		});
	});
	describe("Check zoom 10% number items", () => {
		it("should zoom in of 10% of item number to index (50%)", () => {
			const data = new Array(1000);
			const limits = { start: 450, end: 550 };
			const index = 499;
			const zoomIn = true;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.end).toEqual(limits.end - 5);
			expect(result.start).toEqual(limits.start + 5);
		});
		it("should zoom out of 10% of item number to index (50%)", () => {
			const data = new Array(1000);
			const limits = { start: 450, end: 550 };
			const index = 499;
			const zoomIn = false;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.end).toEqual(limits.end + 5);
			expect(result.start).toEqual(limits.start - 5);
		});
	});
	describe("Check zoom in index", () => {
		it("should zoom in of 10% of item number to index (33%)", () => {
			const data = new Array(1000);
			const limits = { start: 450, end: 550 };
			const index = 483;
			const zoomIn = true;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(limits.start + 3);
			expect(result.end).toEqual(limits.end - 7);
		});
		it("should zoom out of 10% of item number to index (33%)", () => {
			const data = new Array(1000);
			const limits = { start: 450, end: 550 };
			const index = 483;
			const zoomIn = false;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(limits.start - 3);
			expect(result.end).toEqual(limits.end + 7);
		});
		it("should zoom in of 10% of item number to index (66%)", () => {
			const data = new Array(1000);
			const limits = { start: 450, end: 550 };
			const index = 516;
			const zoomIn = true;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(limits.start + 7);
			expect(result.end).toEqual(limits.end - 3);
		});
		it("should zoom out of 10% of item number to index (66%)", () => {
			const data = new Array(1000);
			const limits = { start: 450, end: 550 };
			const index = 516;
			const zoomIn = false;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(limits.start - 7);
			expect(result.end).toEqual(limits.end + 3);
		});
	});

	describe("Check doesn't block in specific case", () => {
		it("zoom out, start -> 0, index close to end limit", () => {
			const data = new Array(100);
			const limits = { start: 0, end: 31 };
			const index = 28;
			const zoomIn = false;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(limits.start);
			expect(result.end).not.toEqual(limits.end);
		});

		it("zoom in, start -> 0, index close to start limit", () => {
			const data = new Array(100);
			const limits = { start: 0, end: 4 };
			const index = 1;
			const zoomIn = true;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(limits.start);
			expect(result.end).not.toEqual(limits.end);
		});
		it("zoom in, should to zoom in center index and get only one item to displayed", () => {
			const data = new Array(100);
			const limits = { start: 50, end: 52 };
			const index = 51;
			const zoomIn = true;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(51);
			expect(result.end).toEqual(51);
		});
		it("zoom out, should to zoom out if nbitem = 0", () => {
			const data = new Array(100);
			const limits = { start: 59, end: 59 };
			const index = 59;
			const zoomIn = false;

			const result = zoomInIndex(limits, data, index, zoomIn);

			expect(result.start).toEqual(58);
			expect(result.end).toEqual(60);
		});
	});
});

describe("drag", () => {
	describe("Check type and props returned", () => {
		it("should return an object of type limit", () => {
			const limits = { start: 0, end: 10 };
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const deltaX = 1;

			const result = drag(limits, data, deltaX);

			expect(typeof result).toBe("object");
			expect(result).toHaveProperty("start");
			expect(result).toHaveProperty("end");
			expect(typeof result.start).toBe("number");
			expect(typeof result.end).toBe("number");
			expect(isNaN(result.start)).toBe(false);
			expect(isNaN(result.end)).toBe(false);
		});
	});
	describe("Check limit in data borns", () => {
		const tests = [
			{ deltaX: 1, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ deltaX: -1, limits: { start: 0, end: 100 }, data: new Array(100) },
			{ deltaX: 1, limits: { start: 0, end: 10 }, data: new Array(100) },
			{ deltaX: -1, limits: { start: 0, end: 10 }, data: new Array(100) },
			{ deltaX: 1, limits: { start: 90, end: 100 }, data: new Array(100) },
			{ deltaX: -1, limits: { start: 90, end: 100 }, data: new Array(100) },
			{ deltaX: 20, limits: { start: 1, end: 13 }, data: new Array(100) },
			{ deltaX: -20, limits: { start: 87, end: 99 }, data: new Array(100) },
		];

		tests.forEach(({ deltaX, limits, data }) => {
			it(`should return limits in dataBorns (deltaX: ${deltaX}, data size: ${data.length}, limits: ${limits.start}, ${limits.end})`, () => {
				const result = drag(limits, data, deltaX);

				// start > 0
				expect(result.start).toBeGreaterThanOrEqual(0);
				// start < data.length
				expect(result.start).toBeLessThanOrEqual(data.length);

				// end < data.length
				expect(result.end).toBeLessThanOrEqual(data.length);
				// end > 0
				expect(result.end).toBeGreaterThanOrEqual(0);
			});
		});
	});
});
