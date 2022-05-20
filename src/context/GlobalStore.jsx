import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}
<<<<<<< HEAD
export function updateId() {
  return useContext(IdUpdateContext);
}

export function IdContextProvider({ children }) {
  const [productId, updateProductId] = useState(40344);
=======
>>>>>>> master

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
