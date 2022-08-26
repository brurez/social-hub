import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetProfilesSearch({ query }) {
  return useQuery(["getProfilesSearch", query], () => models.getProfilesSearch(query));
}