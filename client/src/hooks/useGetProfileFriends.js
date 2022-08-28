import CoreApi from "../lib/CoreApi.js";
import {useQuery} from "react-query";

const coreApi = CoreApi.build()

export function useGetProfileFriends(profileId) {
  return useQuery(["getProfileFriends", profileId], () => coreApi.getProfileFriends(profileId));
}