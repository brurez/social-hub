import CoreApi from "../lib/CoreApi.js";
import {useQuery} from "react-query";

const models = CoreApi.build()

export function useGetProfileFriends(profileId) {
  return useQuery(["getProfileFriends", profileId], () => models.getProfileFriends(profileId));
}