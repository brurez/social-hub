import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetStatusPosts() {
  return useQuery(["getStatusPosts"], coreApi.getStatusPosts.bind(coreApi));
}