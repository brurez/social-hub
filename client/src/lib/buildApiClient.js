import ApiClient from "./ApiClient.js";
import axios from "axios";
import applyCaseMiddleware from 'axios-case-converter';

export function buildApiClient(basePath) {
  const client = axios.create({
    withCredentials: true,
    credentials: 'include',
  })
  return new ApiClient(applyCaseMiddleware(client), basePath);
}