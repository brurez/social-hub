import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetUser(userId) {
  return useQuery(["getUser", userId], () => models.getUser(userId));
}