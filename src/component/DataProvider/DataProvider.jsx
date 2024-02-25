import React, { createContext, useReducer } from "react";

export const Datacontext = createContext();
export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <Datacontext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Datacontext.Provider>
  );
};
