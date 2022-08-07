import React, { createContext, useReducer } from "react";
import { reducers } from "./reducers";

// Initial Store state used by the Reducers
const initialState = {
  message: { open: false, text: "", kind: "error" },
  currentUser: null,
};

// Create Flux Store as a React Context
export const StoreContext = createContext([initialState]);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    // @ts-ignore
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};