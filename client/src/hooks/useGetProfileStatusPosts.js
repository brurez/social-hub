import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetProfileStatusPosts(profileId) {
  return useQuery(["getProfileStatusPosts", profileId], () => coreApi.getProfileStatusPosts(profileId));
}