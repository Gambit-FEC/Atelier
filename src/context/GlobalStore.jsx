import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react/cjs/react.production.min';

const IdContext = createContext();
const fetchByIdContext = createContext();

export default function IdContextProvider({ children }) {
  const [id, setId] = useState(40348);
  const fetchById = useCallback((route, config) => axios.get(route, config));

  return (
    <IdContext.Provider value={id}>
      <fetchByIdContext.Provider value={fetchById}>
        {children}
      </fetchByIdContext.Provider>
    </IdContext.Provider>
  );
}
