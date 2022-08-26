import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetProfile(profileId) {
  return useQuery(["getProfiles", profileId], () => models.getProfile(profileId));
}