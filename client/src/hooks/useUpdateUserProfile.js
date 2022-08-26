import {useMutation} from "react-query";
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useUpdateUserProfile(options) {
  return useMutation(models.updateUserProfile.bind(models), options);
}