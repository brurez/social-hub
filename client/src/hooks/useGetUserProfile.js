import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetUserProfile() {
  return useQuery(["getUserProfile"], models.getUserProfile.bind(models));
}