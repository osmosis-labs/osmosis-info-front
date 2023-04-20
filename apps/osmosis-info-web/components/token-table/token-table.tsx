import { Table } from "@latouche/osmosis-info-ui";
import { Params, TableConfiguration } from "@latouche/osmosis-info-ui/lib/esm/components/table/types";
import { table } from "console";
import React from "react";
type Data = {
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

const data: Data[] = [
	{
		name: "Osmos",
		price: 7.201,
		image: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
	},
	{
		name: "Cosmos",
		price: 8,
		image: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
	},
	{
		name: "Juno",
		price: 7.201,
		image: "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png",
	},
	{
		name: "Osmos II",
		price: 7.201,
		image: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
	},
	{
		name: "Cosmos II",
		price: 7.201,
		image: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
	},
];

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
	const className = params.currentData.price % 2 === 0 ? "h-[24px] bg-main-300 p-8" : "h-[24px] ";
	return <img src={params.currentData.image} alt={params.currentData.name} className={className} />;
};

const configs: TableConfiguration[] = [
	{
		onClickRow: onClickCell,
		onClickCell: onClickCell,
		columns: [
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
				key: "NameII",
				accessor: "name",
				minWidth: 100,
				flex: 1,
			},
		],
	},
];
export const TokenTable = () => {
	return (
		<div className="">
			{configs.map((config: TableConfiguration, index: number) => {
				return (
					<div className="my-4" key={index}>
						<Table config={config} data={data} />
					</div>
				);
			})}
		</div>
	);
};
