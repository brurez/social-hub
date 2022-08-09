import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetProfile(profileId) {
  return useQuery(["getProfiles", profileId], () => models.getProfile(profileId));
}