import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetProfile(profileId) {
  return useQuery(["getProfiles", profileId], () => coreApi.getProfile(profileId));
}