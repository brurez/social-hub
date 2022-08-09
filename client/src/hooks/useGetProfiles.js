import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetProfiles() {
  return useQuery(["getProfiles"], models.getProfiles.bind(models));
}