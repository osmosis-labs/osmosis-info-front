import React, { createContext, useContext, useMemo, useState } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [openLoader, setLoaderOpen] = useState(false);

  const hideLoader = () => setLoaderOpen(false);
  const showLoader = () => setLoaderOpen(true);
  const value = useMemo(() => ({ openLoader, hideLoader, showLoader }), [openLoader, hideLoader, showLoader]);

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
};