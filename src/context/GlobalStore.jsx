import React, { createContext, useState, useContext } from 'react';

const IdContext = createContext();

export function useId() {
  return useContext(IdContext);
}

export function IdContextProvider({ children }) {
  const idState = useState(40348);

  return (
    <IdContext.Provider value={idState}>
      {children}
    </IdContext.Provider>
  );
}
