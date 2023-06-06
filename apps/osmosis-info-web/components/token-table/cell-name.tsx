import React from "react";
import { Token } from "../../stores/api/tokens/tokens";
import { Image } from "../image/image";

type CellNameProps = {
	token: Token;
};
export const CellName = ({ token }: CellNameProps) => {
	return (
		<div className="flex items-center">
			<Image src={token.image} alt={token.name} className="h-[24px]" srcFallback="/images/default.png" />
			<span className="ml-2 ">{token.symbol}</span>
			<span className="opacity-60 ml-2 text-ellipsis bloc overflow-hidden text-sm">({token.name})</span>
		</div>
	);
};
