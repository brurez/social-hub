import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetUserProfile() {
  return useQuery(["getUserProfile"], coreApi.getUserProfile.bind(coreApi));
}