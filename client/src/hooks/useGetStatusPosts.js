import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetStatusPosts() {
  return useQuery(["getStatusPosts"], models.getStatusPosts.bind(models));
}