import {useMutation} from "react-query";
import Models from "../lib/Models.js";

const models = Models.build()

export function useUpdateUserProfile(options) {
  return useMutation(models.updateUserProfile.bind(models), options);
}