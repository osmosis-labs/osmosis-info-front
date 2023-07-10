import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../stores";
import { Paper } from "@latouche/osmosis-info-ui";
import { BarMover } from "./bar-mover";
import { Top } from "../../stores/api/tops/tops";

export const TokensMovers = observer(() => {
	const {
		topsStore: { gainers, losers },
	} = useStore();

	const [stop, setStop] = useState(false);
	const [items, setItems] = useState<Top[]>([]);
	const refBar = useRef<HTMLDivElement>(null);
	const refBar2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setItems([...gainers.slice(0, 5), ...losers.slice(0, 5)]);
	}, [gainers, losers]);

	const onEnter = () => {
		setStop(() => true);
	};

	const onLeave = () => {
		setStop(() => false);
	};

	useEffect(() => {
		if (refBar.current && refBar2.current) {
			window.setTimeout(() => {
				setStop(() => true);
				setStop(() => false);
			}, 333);
		}
	}, [refBar, refBar2]);

	useEffect(() => {
		if (refBar.current && refBar2.current) {
			if (stop) {
				refBar.current.style.animationPlayState = "paused";
				refBar2.current.style.animationPlayState = "paused";
			} else {
				refBar.current.style.animationPlayState = "running";
				refBar2.current.style.animationPlayState = "running";
			}
		}
	}, [stop, refBar, refBar2]);

	return (
		<div onMouseLeave={onLeave} onMouseEnter={onEnter} className="mt-4 mx-2">
			<Paper className="flex items-center overflow-hidden">
				<BarMover ref={refBar} items={items} />
				<BarMover ref={refBar2} items={items} />
			</Paper>
		</div>
	);
});
