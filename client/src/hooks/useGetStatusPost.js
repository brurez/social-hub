import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const coreApi = CoreApi.build()

export function useGetStatusPost(postId) {
  return useQuery(["getStatusPost", postId], () => coreApi.getStatusPost(postId));
}