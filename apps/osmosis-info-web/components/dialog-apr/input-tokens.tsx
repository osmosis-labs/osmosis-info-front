import React, { ChangeEvent, useEffect, useState } from "react";
import { PoolStore } from "../../stores/api/pools/pool-store";
import { SwapSVG } from "@latouche/osmosis-info-ui";
import { Image } from "../image/image";
import { TokenStore } from "../../stores/api/tokens/token-store";
import { formateNumberDecimals } from "../../helpers/format";

type InputTokensProps = {
	pool: PoolStore;
	onChange: (value: number) => void;
	valueUSD: number;
};

export const InputTokens = ({ pool, onChange, valueUSD }: InputTokensProps) => {
	const [selected, setSelected] = useState("USD");
	const [tokenSelected, setTokenSelected] = useState(pool.tokens[0]);

	const [value, setValue] = useState(100);
	const [valueConverted, setValueConverted] = useState(100);

	useEffect(() => {
		setSelected("USD");
		// const currentConverted = value / tokenSelected.price;
		// setValue(currentConverted);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value);
		setValue(isNaN(value) ? 0 : value);
		onChange(value ?? 0);
	};

	const onChangeShorcut = (value: number) => {
		setValue(value);
	};

	useEffect(() => {
		if (value > 0) {
			let currentConverted = value;
			let currentUSD = value;
			if (selected === "USD") {
				currentConverted = value / tokenSelected.price;
			} else {
				currentConverted = value * tokenSelected.price;
				currentUSD = value * tokenSelected.price;
			}
			setValueConverted(currentConverted);
			onChange(currentUSD);
		}
	}, [selected, value, tokenSelected, onChange]);

	const classNameToken =
		"pl-1 py-1 pr-2 bg-card rounded-full flex w-fit items-center justify-center text-default-500 cursor-pointer";
	const classNameTokenSelected =
		" pl-1 py-1 pr-2 bg-modal rounded-full flex w-fit items-center justify-center text-default-400 cursor-pointer";

	let classSwitch = "stroke-default-500 cursor-pointer transition-all duration-300";
	if (selected !== "USD") classSwitch += "  rotate-180";
	const onChangeToken = (token: TokenStore) => {
		setTokenSelected(token);
	};

	const onSwitch = () => {
		if (selected === "USD") setSelected(tokenSelected.symbol);
		else setSelected("USD");
	};

	return (
		<div className="flex flex-col p-2">
			<div className="flex flex-col bg-background rounded-3xl p-2">
				<div className="flex  justify-end">
					<div className="flex flex-col  ">
						<div className="flex items-center">
							<input
								type="text"
								value={value}
								onChange={onChangeInput}
								className="bg-background text-right py-2 pr-2 text-default-500 outline-none"
							/>
							<span className="text-default-50 text-right text-default-500">
								{selected === "USD" ? "USD" : tokenSelected.symbol}
							</span>
						</div>
						<span className="text-default-50 text-right text-default-500 text-sm">
							{formateNumberDecimals(valueConverted)} {selected !== "USD" ? "USD" : tokenSelected.symbol}
						</span>
						<div className="flex justify-end mt-1 items-center  select-none">
							{pool.tokens.map((token, i) => {
								return (
									<span
										key={token.symbol + i + pool.id}
										style={i == 0 ? { marginLeft: "0px" } : { marginLeft: "4px" }}
										className={token.symbol === tokenSelected.symbol ? classNameTokenSelected : classNameToken}
										onClick={() => {
											onChangeToken(token);
										}}
									>
										<Image src={token.image} height={18} width={18} />{" "}
										<span className="ml-[2px] text-xs flex flex-col items-center justify-center text-center">
											{token.symbol}
										</span>
									</span>
								);
							})}
						</div>
					</div>
					<span className="flex flex-col  p-2 mt-4">
						<SwapSVG height={24} width={24} className={classSwitch} onClick={onSwitch} />
					</span>
				</div>
			</div>
			<div className="mt-2 grid grid-cols-3 gap-2 select-none">
				<Shorcut onClick={onChangeShorcut} value={100} selected={selected} symbol={tokenSelected.symbol} />
				<Shorcut onClick={onChangeShorcut} value={500} selected={selected} symbol={tokenSelected.symbol} />
				<Shorcut onClick={onChangeShorcut} value={1000} selected={selected} symbol={tokenSelected.symbol} />
			</div>
		</div>
	);
};

const Shorcut = ({
	value,
	onClick,
	selected,
	symbol,
}: {
	value: number;
	onClick: (value: number) => void;
	selected: string;
	symbol: string;
}) => {
	return (
		<span
			className="pl-1 py-1 pr-2 bg-card rounded-full flex  items-center justify-center text-default-500 cursor-pointer w-full"
			onClick={() => {
				onClick(value);
			}}
		>
			<span className=" text-xs flex flex-col items-center justify-center text-center">
				{value} {selected !== "USD" ? symbol : "USD"}
			</span>
		</span>
	);
};
