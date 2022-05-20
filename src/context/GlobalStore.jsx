import React, { createContext, useState, useContext } from 'react';

// const IdContext = createContext();

// export function IdContextProvider({ children }) {
//   const idState = useState(40348);
//   return (
//     <IdContext.Provider value={idState}>
//       {children}
//     </IdContext.Provider>
//   );
// }

const IdContext = createContext();
const IdUpdateContext = createContext();

export function useId() {
  return useContext(IdContext);
}
export function updateId() {
  return useContext(IdUpdateContext);
}

export function IdContextProvider({ children }) {
  const [productId, updateProductId] = useState(40344);

  return (
    <IdContext.Provider value={productId}>
      <IdUpdateContext.Provider value={updateProductId}>
        {children}
      </IdUpdateContext.Provider>
    </IdContext.Provider>
  );
}
