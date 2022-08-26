import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetProfiles() {
  return useQuery(["getProfiles"], models.getProfiles.bind(models));
}