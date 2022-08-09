import {useQuery} from "react-query";
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetCurrentUser(options) {
  return useQuery("getUser", models.getCurrentUser.bind(models), options);
}