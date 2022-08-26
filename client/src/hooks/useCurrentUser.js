import {useContext} from "react";
import {StoreContext} from "../store/StoreProvider.jsx";

// React hook to handle the current user information
export function useCurrentUser() {
  const [state, dispatch] = useContext(StoreContext)

  // saves on store state the information about the user
  function setCurrentUser(user) {
    dispatch({type: "SET_CURRENT_USER", payload: user});
  }

  // logs out the current user removing the token from local storage
  function clearCurrentUser() {
    dispatch({type: "CLEAR_CURRENT_USER"});
    dispatch({
      type: "SHOW_SUCCESS_MESSAGE",
      payload: "You are now logged out",
    });
  }

  const currentUser = state.currentUser ? state.currentUser : undefined

  function isCurrentUser(userId) {
    return currentUser && currentUser.id === userId;
  }

  return {
    currentUser,
    isLoggedIn: !!currentUser,
    setCurrentUser,
    clearCurrentUser,
    isCurrentUser,
  }
}