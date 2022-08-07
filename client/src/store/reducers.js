// Callbacks used by Flux architecture to mutate the data based on an Action and a optional Payload
export const reducers = (
  state,
  action
) => {
  console.info("REDUCER CALL", action.type, action.payload);
  switch (action.type) {
    case "SHOW_ERROR_MESSAGE":
      return {
        ...state,
        message: { open: true, text: action.payload, kind: "error" },
      };
    case "SHOW_SUCCESS_MESSAGE":
      return {
        ...state,
        message: { open: true, text: action.payload, kind: "success" },
      };
    case "HIDE_MESSAGE":
      return { ...state, message: { ...state.message, open: false } };

    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "CLEAR_CURRENT_USER":
      return { ...state, currentUser: null };
    default:
      return state;
  }
};