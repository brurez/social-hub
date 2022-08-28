import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetUser(userId) {
  return useQuery(["getUser", userId], () => coreApi.getUser(userId));
}