import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetProfileStatusPosts(profileId) {
  return useQuery(["getProfileStatusPosts", profileId], () => models.getProfileStatusPosts(profileId));
}