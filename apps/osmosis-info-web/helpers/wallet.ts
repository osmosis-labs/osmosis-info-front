import { Keplr } from "@keplr-wallet/types";

export interface UserWallet {
	name: string;
	address: string;
}

export const CHAIN_ID = "osmosis-1";

export const getKeplr = async (): Promise<Keplr | undefined> => {
	if (window.keplr) {
		return window.keplr;
	}

	if (document.readyState === "complete") {
		return window.keplr;
	}

	return new Promise((resolve) => {
		const documentStateChange = (event: Event) => {
			if (event.target && (event.target as Document).readyState === "complete") {
				resolve(window.keplr);
				document.removeEventListener("readystatechange", documentStateChange);
			}
		};

		document.addEventListener("readystatechange", documentStateChange);
	});
};

export const connectByKepklr = (): Promise<UserWallet> => {
	return new Promise((resolve, reject) => {
		const timeout = setTimeout(() => {
			reject(new Error("Timeout"));
		}, 10000);
		try {
			getKeplr().then((Keplr) => {
				if (Keplr) {
					Keplr.enable(CHAIN_ID)
						.then(() => Keplr.getKey(CHAIN_ID))
						.then((userKeplr) => {
							clearTimeout(timeout);
							resolve({ address: userKeplr.bech32Address, name: userKeplr.name });
						});
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};
