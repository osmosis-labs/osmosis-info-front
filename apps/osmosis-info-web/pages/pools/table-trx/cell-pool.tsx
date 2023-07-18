import React, { useState } from "react";
import { Trx } from "../../../stores/api/pools/trx-store";
import { Popover } from "@latouche/osmosis-info-ui";
import { useStore } from "../../../stores";
import { Image } from "../../../components/image/image";
import { useTranslation } from "react-multi-lang";

type CellPoolProps = {
	trx: Trx;
};
export const CellPool = ({ trx }: CellPoolProps) => {
	const t = useTranslation();
	const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);
	const { assetsStore } = useStore();

	const onOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElPopover(event.currentTarget);
	};
	const onClose = () => {
		setAnchorElPopover(null);
	};

	const openPopover = Boolean(anchorElPopover);

	const firstRoute = trx.routes[0];

	return (
		<div onMouseEnter={onOpen} onMouseLeave={onClose} className=" flex items-center cursor-pointer">
			{firstRoute.poolName.split("/").map((tokenSymbol, index) => {
				return (
					<Image
						key={index}
						height={20}
						width={20}
						className={`h-[20px] w-[20px]`}
						assets={true}
						src={assetsStore.getImageFromSymbol(tokenSymbol) ?? "/images/default.png"}
						srcFallback="../assets/default.png"
						pathAssets=""
					/>
				);
			})}
			<span className="ml-1">{firstRoute.poolName}</span>

			{trx.routes.length > 1 ? (
				<span
					className=" pointer-events-none bg-osmosverse-700 
								text-osmosverse-200  rounded-2xl px-2 py-1 ml-2 text-xs"
				>
					+{trx.routes.length}
				</span>
			) : null}

			<Popover
				classNameBackdrop="pointer-events-none"
				classNamePaper="pointer-events-none"
				open={openPopover}
				anchorElement={anchorElPopover}
				onClose={onClose}
				key={trx.hash + "ppover"}
			>
				<div>
					<div className="grid grid-cols-[1fr_3fr] text-osmosverse-400 border-b-[1px] border-b-osmosverse-400">
						<span>#</span>
						<span>{t("pools.trx.pool")}</span>
					</div>
					{trx.routes.map((route, indexRoute) => {
						return (
							<div
								key={indexRoute}
								className="grid grid-cols-[1fr_3fr] mt-1 mb-2 border-b-[1px] border-b-osmosverse-600"
							>
								<span>{route.poolId}</span>
								<div className="flex ">
									<div className="flex items-center">
										{route.poolName.split("/").map((tokenSymbol, index) => {
											return (
												<Image
													key={index}
													height={20}
													width={20}
													className={`h-[20px] w-[20px]`}
													assets={true}
													src={assetsStore.getImageFromSymbol(tokenSymbol) ?? "/images/default.png"}
													srcFallback="../assets/default.png"
													pathAssets=""
												/>
											);
										})}
									</div>
									<span className="ml-1">{route.poolName}</span>
								</div>
							</div>
						);
					})}
				</div>
			</Popover>
		</div>
	);
};
