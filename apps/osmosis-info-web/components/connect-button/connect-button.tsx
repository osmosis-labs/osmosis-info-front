import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { KeplrWalletConnectV1 } from "@keplr-wallet/wc-client";
import WalletConnect from "@walletconnect/client";
import QRCode from "qrcode.react";
import { Button, Dialog, HoverButton } from "@latouche/osmosis-info-ui";
import { CHAIN_ID, getKeplr, UserWallet } from "../../helpers/wallet";

import Image from "next/image";
import { useStore } from "../../stores";
import { CloseSvg } from "@latouche/osmosis-info-ui";
import { useTranslation } from "react-multi-lang";

export const ConnectButton = observer(() => {
	const { userStore } = useStore();
	const t = useTranslation();
	const [uri, setUri] = useState<string>("");
	const [openChoice, setOpenChoice] = useState<boolean>(false);

	const setUserInfo = useCallback(
		(userWallet: UserWallet) => {
			userStore.setAddress(userWallet.address);
			userStore.setName(userWallet.name);
		},
		[userStore]
	);

	const keplrConnection = useCallback(async () => {
		try {
			const keplr = await getKeplr();
			if (keplr) {
				await keplr.enable(CHAIN_ID);
				const userKeplr = await keplr.getKey(CHAIN_ID);
				setUserInfo({ address: userKeplr.bech32Address, name: userKeplr.name });
			} else {
				console.log("%cconnect-button.tsx -> 41 ERROR: Keplr not found", "background: #FF0000; color:#FFFFFF");
			}
		} catch (e) {
			console.log("%cconnect-button.tsx -> 40 ERROR: e", "background: #FF0000; color:#FFFFFF", e);
		}
	}, [setUserInfo]);

	useEffect(() => {
		window.addEventListener("keplr_keystorechange", keplrConnection);
		return () => window.removeEventListener("keplr_keystorechange", keplrConnection);
	}, [keplrConnection]);

	const connectWalletConnection = async () => {
		const wc = new WalletConnect({
			bridge: "https://bridge.walletconnect.org", // Required
			qrcodeModal: {
				open: (uri: string) => setUri(uri),
				close: () => setUri(""),
			},
		});
		if (wc.connected) {
			await wc.killSession();
		}
		wc.createSession();
		wc.on("connect", async (error) => {
			if (error) {
				console.log("top-menu.tsx -> 67: error", error);
			} else {
				const keplr = new KeplrWalletConnectV1(wc);
				const userKeplr = await keplr.getKey(CHAIN_ID);
				setUserInfo({ address: userKeplr.bech32Address, name: userKeplr.name });
			}
		});
	};

	const onClickHoveredButton = () => {
		setUserInfo({ address: "", name: "" });
	};

	const onChoiceKeplr = () => {
		setOpenChoice(false);
		keplrConnection();
	};

	const onChoiceConnectWallet = () => {
		setOpenChoice(false);
		connectWalletConnection();
	};
	return (
		<>
			<Dialog
				open={openChoice}
				onClose={() => {
					setOpenChoice(false);
				}}
				closeOnClickAway={true}
			>
				<div className="p-2">
					<div className="flex justify-between my-2">
						{t("connectionButton.title")}{" "}
						<CloseSvg
							onClick={() => setOpenChoice(false)}
							className="hover:stroke-white-full stroke-main-400 cursor-pointer transition-colors duration-default"
						/>
					</div>
					<div
						className="p-3 my-3 bg-main-900 rounded-2xl flex cursor-pointer hover:bg-main-700 transition-colors duration-default"
						onClick={onChoiceKeplr}
					>
						<Image alt="Keplr" src="/images/keplr.svg" width="30" height="30" />
						<div className="mx-3">
							<p className="text-xl">{t("connectionButton.titleKeplr")}</p>
							<p className="text-sm text-white-mid">{t("connectionButton.infoKeplr")}</p>
						</div>
					</div>
					<div
						className="p-3 mt-3 bg-main-900 rounded-2xl flex cursor-pointer hover:bg-main-700 transition-colors duration-default"
						onClick={onChoiceConnectWallet}
					>
						<Image alt="Keplr" src="/images/walletconnect.svg" width="30" height="30" />
						<div className="mx-3">
							<p className="text-xl">{t("connectionButton.titleWalletConnect")}</p>
							<p className="text-sm text-white-mid">{t("connectionButton.infoWalletConnect")}</p>
						</div>
					</div>
				</div>
			</Dialog>
			<Dialog
				open={uri !== ""}
				onClose={() => {
					setUri("");
				}}
				closeOnClickAway={true}
			>
				<div className="p-4">
					<div className="flex justify-between my-2 mb-2 text-xl">
						{t("connectionButton.scan")}{" "}
						<CloseSvg
							onClick={() => setUri("")}
							className="hover:stroke-white-full stroke-main-400 cursor-pointer transition-colors duration-default"
						/>
					</div>
					<div className="mt-4 p-3 bg-white-full rounded-sm" onClick={() => setUri("")}>
						<QRCode size={360} value={uri} />
					</div>
				</div>
			</Dialog>

			{userStore.name === "" ? (
				<Button
					size="small"
					onClick={() => {
						setOpenChoice(true);
					}}
				>
					{t("connectionButton.connection")}
				</Button>
			) : (
				<HoverButton
					variant="secondary"
					hoverContent={
						<div className="flex items-center justify-center h-full w-full">{t("connectionButton.disconnection")}</div>
					}
					size="small"
					className="!py-1 !px-1"
					onClick={onClickHoveredButton}
				>
					<div className="flex">
						<>
							<Image alt="Keplr" src="/images/keplr.svg" width="30" height="30" />

							<div className="flex flex-col text-xs pl-2">
								<span>{userStore.name}</span>
								<span>
									{userStore.address.substring(0, 5) +
										"..." +
										userStore.address.substring(userStore.address.length - 5)}
								</span>
							</div>
						</>
					</div>
				</HoverButton>
			)}
		</>
	);
});
