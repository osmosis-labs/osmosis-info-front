import { ColumnConfiguration } from "../types";
import { calculeSizes } from "./size";

type testColumn = {
	columns: ColumnConfiguration[];
	results: number[];
	totalWidth: number;
};

describe("Table size", () => {
	it("should have a default value", () => {
		const minWidth = 100;
		const columns: ColumnConfiguration[] = [
			{
				key: "a",
				display: "a",
				accessor: "",
				minWidth,
			},
			{
				key: "b",
				display: "b",
				accessor: "",
				minWidth,
			},
			{
				key: "c",
				display: "c",
				accessor: "",
				minWidth,
			},
		];

		const sizes = calculeSizes(0, columns);
		columns.forEach((c) => {
			expect(sizes[c.key]).toBe(minWidth);
		});
	});
	it("should return size of 150 (minWidth: 150)", () => {
		const minWidth = 150;
		const columns: ColumnConfiguration[] = [
			{
				key: "a",
				display: "a",
				accessor: "",
				minWidth,
			},
			{
				key: "b",
				display: "b",
				accessor: "",
				minWidth,
			},
			{
				key: "c",
				display: "c",
				accessor: "",
				minWidth,
			},
		];

		const sizes = calculeSizes(500, columns);
		columns.forEach((c) => {
			expect(sizes[c.key]).toBe(minWidth);
		});
	});

	it("should return size of 100 (maxWidth: 150)", () => {
		const maxWidth = 150;
		const columns: ColumnConfiguration[] = [
			{
				key: "a",
				display: "a",
				accessor: "",
				maxWidth,
			},
			{
				key: "b",
				display: "b",
				accessor: "",
				maxWidth,
			},
			{
				key: "c",
				display: "c",
				accessor: "",
				maxWidth,
			},
		];

		const sizes = calculeSizes(500, columns);
		columns.forEach((c) => {
			expect(sizes[c.key]).toBe(100);
		});
	});
	describe("Multi tests", () => {
		const tests: testColumn[] = [
			{
				columns: [
					{
						key: "a",
						display: "a",
						accessor: "",
						maxWidth: 50,
						minWidth: 50,
					},
					{
						key: "b",
						display: "b",
						accessor: "",
						maxWidth: 50,
						minWidth: 50,
					},
					{
						key: "c",
						display: "c",
						accessor: "",
						maxWidth: 50,
						minWidth: 50,
					},
				],
				results: [50, 50, 50],
				totalWidth: 500,
			},
			{
				columns: [
					{
						key: "a",
						display: "a",
						accessor: "",
						flex: 1,
					},
					{
						key: "b",
						display: "b",
						accessor: "",
						flex: 1,
					},
					{
						key: "c",
						display: "c",
						accessor: "",
						flex: 1,
					},
				],
				results: [200, 200, 200],
				totalWidth: 600,
			},
			{
				columns: [
					{
						key: "a",
						display: "a",
						accessor: "",
						flex: 2,
					},
					{
						key: "b",
						display: "b",
						accessor: "",
						flex: 1,
					},
					{
						key: "c",
						display: "c",
						accessor: "",
						flex: 1,
					},
				],
				results: [200, 100, 100],
				totalWidth: 400,
			},
			{
				columns: [
					{
						key: "a",
						display: "a",
						accessor: "",
						flex: 2,
						maxWidth: 100,
					},
					{
						key: "b",
						display: "b",
						accessor: "",
						flex: 1,
					},
					{
						key: "c",
						display: "c",
						accessor: "",
						flex: 1,
					},
				],
				results: [100, 150, 150],
				totalWidth: 400,
			},
		];

		const columnsToString = (columns: ColumnConfiguration[]) => {
			return columns
				.map(
					(c) =>
						`columns(${c.flex ? `flex: ${c.flex},` : ""} ${c.minWidth ? `minWidth: ${c.minWidth},` : ""} ${
							c.maxWidth ? `maxWidth: ${c.maxWidth}` : ""
						})`
				)
				.join("; ");
		};

		tests.forEach((test, index) => {
			it(`should return good size, test n°${index + 1} (${columnsToString(test.columns)})`, () => {
				const sizes = calculeSizes(test.totalWidth, test.columns);

				test.columns.forEach((c, i) => {
					expect(sizes[c.key]).toBe(test.results[i]);
				});
			});
		});
	});
});
