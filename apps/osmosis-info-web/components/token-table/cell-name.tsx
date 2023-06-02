import React from "react";
import { Token } from "../../stores/api/tokens/tokens";
import { Image } from "../image/image";

type CellNameProps = {
	token: Token;
};
export const CellName = ({ token }: CellNameProps) => {
	return (
		<div>
			<span>{token.symbol}</span>
			<span>{token.name}</span>
			<Image src={token.image} alt={token.name} className="h-[24px]" srcFallback="/images/default.png" />
		</div>
	);
};
