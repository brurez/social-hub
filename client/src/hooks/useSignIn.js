import Auth from "../lib/Auth.js";
import {useMutation} from "@tanstack/react-query";

const auth = Auth.build()

export function useSignIn(options) {
  return useMutation(auth.signIn.bind(auth), options)
}