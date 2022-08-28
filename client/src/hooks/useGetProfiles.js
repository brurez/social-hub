import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetProfiles() {
  return useQuery(["getProfiles"], coreApi.getProfiles.bind(coreApi));
}