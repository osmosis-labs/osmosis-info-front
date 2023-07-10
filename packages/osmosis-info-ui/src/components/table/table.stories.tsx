import React, { useCallback, useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Table } from "./table";
import { Button } from "../buttons/button/button";
import { Params, TableConfiguration } from "./types";
import { filtersNumber, filtersString } from "./config";

export default {
	title: "Components/Table",
	component: Table,
	parameters: {},
} as ComponentMeta<typeof Table>;

type Data = {
	id: number;
	name: string;
	image: string;
	price: number;
};

const formatPrice = (price: number, decimals = 2) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: decimals,
	}).format(price);
};

function getRandomValue<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

const getName = () => getRandomValue(["Osmo", "Cosmo", "Juno", "Jupiter", "Saturn", "Uranus", "Neptune"]);
const getPrice = () => Math.floor(Math.random() * 100000);
const getImage = () =>
	getRandomValue([
		"https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
		"https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
		"https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png",
	]);

const onClickCell = (params: Params<Data>) => {
	const { data, currentData } = params;
	console.log(
		"%ctable.tsx -> 114 BLUE: currentData, data",
		"background: #2196f3; color:#FFFFFF",
		":",
		currentData,
		data
	);
};

const imageRender = (params: Params<Data>) => {
	return <img src={params.currentData.image} alt={params.currentData.name} className={"h-[24px]"} />;
};

const dataDefault: Data[] = [];
for (let i = 0; i < 10; i++) {
	dataDefault.push({
		id: i,
		name: "",
		price: 0,
		image: "",
	});
}

const Template: ComponentStory<typeof Table> = (args) => {
	const [nbRow, setNbRow] = useState(10);
	const [data, setData] = useState<Data[]>(dataDefault);
	const [loading, setLoading] = useState(false);

	const [config, setConfig] = useState<TableConfiguration | null>(null);

	useEffect(() => {
		const newConfig: TableConfiguration = {
			onClickRow: onClickCell,
			onClickCell: onClickCell,
			density: "medium",
			callBackEnd,
			autoHeight: false,
			defaultOrderBy: "id",
			defaultOrderDirection: "ASC",
			resizing: false,

			columns: [
				{
					display: "ID",
					key: "id",
					flex: 1,
					minWidth: 300,
					sortable: true,
					onSort: (a: any, b: any) => {
						return b - a;
					},
					filters: filtersNumber,
					filterable: true,
				},
				{
					display: "Name",
					key: "name",
					flex: 1,
					minWidth: 200,
					align: "center",
					sortable: true,
					filterable: true,
					filters: filtersString,
				},
				{
					display: "Image",
					key: "image",
					accessor: imageRender,
					minWidth: 200,
					flex: 1,
				},
				{
					display: "Price",
					key: "price",
					accessor: (params: Params<Data>) => formatPrice(params.currentData.price),
					minWidth: 300,
					flex: 1,
					align: "right",
				},
			],
		};

		setConfig(newConfig);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [args]);

	const callBackEnd = useCallback(
		(next: (currentPage: number) => void, currentPage: number, rowPerPage: number) => {
			if (loading) return;
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				setNbRow((nbRow) => nbRow + 10);
				const max = (currentPage + 1) * rowPerPage;
				if (!(max >= data.length)) next(currentPage + 1);
			}, 1000);
		},
		[data.length, loading]
	);

	useEffect(() => {
		const data: Data[] = [];
		for (let i = 0; i < nbRow; i++) {
			data.push({
				id: i + 1,
				name: getName(),
				price: getPrice(),
				image: getImage(),
			});
		}
		setData(data);
	}, [nbRow]);

	const addRow = () => {
		setNbRow(nbRow + 1);
	};
	const removeRow = () => {
		if (nbRow > 0) setNbRow(nbRow - 1);
	};

	return (
		<div className="">
			<div className="flex">
				<Button onClick={addRow} size="small">
					Add row
				</Button>
				<Button onClick={removeRow} size="small" className="ml-2">
					Remove row
				</Button>
			</div>

			<div className="my-4">{config && <Table config={config} data={data} isLoading={loading} />}</div>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Table";
