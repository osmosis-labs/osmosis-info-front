import React, { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";
import { InitialState, RootStore } from "./root-store";
import { enableStaticRendering } from "mobx-react-lite";
const StoreContext = createContext<RootStore | null>(null);

enableStaticRendering(typeof window === "undefined");

let rootStore: RootStore | undefined;
const initStore = (initialState: InitialState) => {
	// check if we already declare store (client Store), otherwise create one
	const store = rootStore ?? new RootStore();
	// hydrate to store if receive initial data
	if (initialState) store.hydrate(initialState);

	// Create a store on every server request
	if (typeof window === "undefined") return store;
	// Otherwise it's client, remember this store and return
	if (!rootStore) rootStore = store;
	return store;
};

export const StoreProvider: FunctionComponent<PropsWithChildren<{ initialState: any }>> = ({
	children,
	initialState,
}) => {
	const [rootStore] = useState(() => initStore(initialState));

	return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
	const store = useContext(StoreContext);
	if (!store) {
		throw new Error("You have forgot to use StoreProvider");
	}
	return store;
};
