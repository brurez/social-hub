import Auth from "../lib/Auth.js";
import {useMutation} from "react-query";

const auth = Auth.build()

export function useSignUp(options) {
  return useMutation(auth.signUp.bind(auth), options)
}