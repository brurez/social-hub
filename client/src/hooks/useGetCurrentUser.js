import {useQuery} from "react-query";
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetCurrentUser(options) {
  return useQuery("getUser", coreApi.getCurrentUser.bind(coreApi), options);
}