import React, { createContext, useReducer } from "react";
import { reducers } from "./reducers";

// Initial Store state used by the Reducers
const initialState = {
  chat: { open: false, user2Id: null },
  message: { open: false, text: "", kind: "error", messages: [] },
  currentUser: null,
};

// Create Flux Store as a React Context
export const StoreContext = createContext([initialState]);

export const StoreProvider = ({ children }) => {
  // Initialize the Store with the initial state
  const [state, dispatch] = useReducer(reducers, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};