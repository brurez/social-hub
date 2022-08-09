import Models from "../lib/Models.js";
import {useQuery} from "react-query";

const models = Models.build()

export function useGetProfileFriends(profileId) {
  return useQuery(["getProfileFriends", profileId], () => models.getProfileFriends(profileId));
}