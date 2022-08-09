import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetUserProfile() {
  return useQuery(["getUserProfile"], models.getUserProfile.bind(models));
}