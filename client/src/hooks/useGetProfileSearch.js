import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetProfilesSearch({ query }) {
  return useQuery(["getProfilesSearch", query], () => coreApi.getProfilesSearch(query));
}