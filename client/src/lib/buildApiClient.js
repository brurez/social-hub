import ApiClient from "./ApiClient.js";
import axios from "axios";
import Cookies from "universal-cookie";
import applyCaseMiddleware from 'axios-case-converter';

export function buildApiClient() {
  const client = axios.create({
    withCredentials: true,
    credentials: 'include',
  })
  return new ApiClient(applyCaseMiddleware(client));
}