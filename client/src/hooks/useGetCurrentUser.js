import {useQuery} from "react-query";
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetCurrentUser(options) {
  return useQuery("getUser", models.getCurrentUser.bind(models), options);
}