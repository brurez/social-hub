import { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";

// React hook responsible to show messages to the user at the bottom of the screen
export default function useMessage() {
  const [state, dispatch] = useContext(StoreContext);

  // display a red error message
  function showErrorMessage(message) {
    dispatch({ type: "SHOW_ERROR_MESSAGE", payload: message });
    setTimeout(() => dispatch({ type: "HIDE_MESSAGE" }), 6000);
  }

  // display a green success message
  function showSuccessMessage(message) {
    dispatch({ type: "SHOW_SUCCESS_MESSAGE", payload: message });
    setTimeout(() => dispatch({ type: "HIDE_MESSAGE" }), 6000);
  }

  return { message: state.message, showErrorMessage, showSuccessMessage };
}