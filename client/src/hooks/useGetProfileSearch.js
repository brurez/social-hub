import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetProfilesSearch({ query }) {
  return useQuery(["getProfilesSearch", query], () => models.getProfilesSearch(query));
}