import { Button, Table } from "@latouche/osmosis-info-ui";
import { Params, ParamsRowHeight, TableConfiguration } from "@latouche/osmosis-info-ui/lib/esm/components/table/types";
import { table } from "console";
import React from "react";
import { useState } from "react";
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

const onClickRow = (currentData: Data, data: Data[]) => {
	console.log("%ctable.tsx -> 94 PINK: currentData, data", "background: #e91e63; color:#FFFFFF", currentData, data);
};

const imageRender = (params: Params<Data>) => {
	return <img src={params.currentData.image} alt={params.currentData.name} className={"h-[24px]"} />;
};

const getRowHeight = ({ currentData, densityFactor }: ParamsRowHeight<Data>) => {
	return currentData.price % 2 === 0 ? 50 * densityFactor : 60 * densityFactor;
};

const config: TableConfiguration = {
	onClickRow: onClickCell,
	onClickCell: onClickCell,
	density: "medium",
	columns: [
		{
			key: "ID",
			accessor: "id",
			flex: 1,
			minWidth: 30,
		},
		{
			key: "Name",
			accessor: "name",
			flex: 1,
			minWidth: 200,
		},
		{
			key: "Image",
			accessor: imageRender,
			minWidth: 50,
			flex: 1,
		},
		{
			key: "Price",
			accessor: (params: Params<Data>) => formatPrice(params.currentData.price),
			minWidth: 100,
			flex: 1,
		},
	],
};

export const TokenTable = () => {
	const [nbRow, setNbRow] = useState(10);

	const data: Data[] = [];
	for (let i = 0; i < nbRow; i++) {
		data.push({
			id: i,
			name: getName(),
			price: getPrice(),
			image: getImage(),
		});
	}

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
			<div className="my-4">
				<Table config={config} data={data} />
			</div>
		</div>
	);
};
