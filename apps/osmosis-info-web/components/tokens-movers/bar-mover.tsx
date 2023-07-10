import { forwardRef } from "react";
import { Top } from "../../stores/api/tops/tops";
import React from "react";
import { ItemMover } from "./item-mover";

type BarMoverProps = {
	items: Top[];
};

export const BarMover = forwardRef<HTMLDivElement, BarMoverProps>(({ items }: BarMoverProps, ref) => {
	return (
		<div className="animate-bar-mover flex items-center" ref={ref}>
			{items.map((item, index) => {
				return <ItemMover key={index} item={item} />;
			})}
		</div>
	);
});

BarMover.displayName = "BarMover";
