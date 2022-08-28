import {useMutation} from "react-query";
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useUpdateUserProfile(options) {
  return useMutation(coreApi.updateUserProfile.bind(coreApi), options);
}