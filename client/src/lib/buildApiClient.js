import ApiClient from "./ApiClient.js";
import axios from "axios";
import Cookies from "universal-cookie";
import applyCaseMiddleware from 'axios-case-converter';

const cookies = new Cookies();

export function buildApiClient() {
  const client = axios.create({
    headers: {
      "Content-Type": "application/json",
      "x-csrftoken": cookies.get("csrftoken"),
    },
    withCredentials: true,
    credentials: 'include',
  })
  return new ApiClient(applyCaseMiddleware(client));
}