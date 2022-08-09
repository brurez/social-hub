import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetStatusPost(postId) {
  return useQuery(["getStatusPost", postId], () => models.getStatusPost(postId));
}