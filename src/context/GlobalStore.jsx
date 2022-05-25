import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [productId, setProductId] = useState(40344);
  const [avgRating, setAvgRating] = useState(0);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    productId,
    setProductId,
    avgRating,
    setAvgRating,
  };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
