import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetProfileStatusPosts(profileId) {
  return useQuery(["getProfileStatusPosts", profileId], () => models.getProfileStatusPosts(profileId));
}