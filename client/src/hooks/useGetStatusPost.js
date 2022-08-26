import {useQuery} from 'react-query';
import CoreApi from "../lib/CoreApi.js";

const models = CoreApi.build()

export function useGetStatusPost(postId) {
  return useQuery(["getStatusPost", postId], () => models.getStatusPost(postId));
}