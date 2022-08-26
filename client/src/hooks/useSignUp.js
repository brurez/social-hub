import AuthApi from "../lib/AuthApi.js";
import {useMutation} from "react-query";

const auth = AuthApi.build()

export function useSignUp(options) {
  return useMutation(auth.signUp.bind(auth), options)
}