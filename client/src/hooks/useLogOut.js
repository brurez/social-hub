import Auth from "../lib/Auth.js";
import {useMutation} from "react-query";

const auth = Auth.build()

export function useLogOut(options) {
  return useMutation(auth.logOut.bind(auth), options)
}