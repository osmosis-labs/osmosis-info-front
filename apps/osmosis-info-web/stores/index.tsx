import React, { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";
import { RootStore } from "./root-store";

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const [rootStore] = useState(() => new RootStore());

	return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error("You have forgot to use StoreProvider");
	}
	return store;
};
