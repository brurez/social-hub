import { buildApiClient } from "./buildApiClient.js";

// Endpoints to deal with authentication
export default class AuthApi {
  static build() {
    const apiClient = buildApiClient("api");
    return new AuthApi(apiClient);
  }

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  signUp(data) {
    return this.apiClient.postRequest("users", data);
  }

  signIn(data) {
    return this.apiClient.postRequest("signin", data);
  }

  logOut() {
    return this.apiClient.postRequest("logout");
  }
}
