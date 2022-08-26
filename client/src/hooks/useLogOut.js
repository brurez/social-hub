import AuthApi from "../lib/AuthApi.js";
import { useMutation } from "react-query";

const auth = AuthApi.build();

export function useLogOut(options) {
  return useMutation(auth.logOut.bind(auth), options);
}
