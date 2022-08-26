import AuthApi from "../lib/AuthApi.js";
import {useMutation} from "react-query";

const auth = AuthApi.build()

export function useSignIn(options) {
  return useMutation(auth.signIn.bind(auth), options)
}