import React, { createContext, useState, useContext } from 'react';

export const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [productId, setProductId] = useState(40344);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const value = {
    productId,
    setProductId,
    avgRating,
    setAvgRating,
    totalReviews,
    setTotalReviews,
  };
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
