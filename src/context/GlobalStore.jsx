import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [productId, setProductId] = useState(40348);
  const [avgRating, setAvgRating] = useState(0);
  const value = {
    productId, setProductId,
    avgRating, setAvgRating };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
