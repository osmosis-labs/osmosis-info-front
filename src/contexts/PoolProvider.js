import { createContext, useContext, useState } from "react";
const PoolContext = createContext();

export const usePool = () => useContext(PoolContext);

export const PoolProvider = ({ children }) => {
    const [currentPool, setCurrentPool] = useState({});
    return <PoolContext.Provider value={{ currentPool, setCurrentPool }}>{children}</PoolContext.Provider>;
};