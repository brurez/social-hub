import {useQuery} from 'react-query';
import Models from "../lib/Models.js";

const models = Models.build()

export function useGetUser(userId) {
  return useQuery(["getUser", userId], () => models.getUser(userId));
}