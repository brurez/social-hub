import {buildApiClient} from "./buildApiClient.js";

export default class Models {
  static build() {
    const apiClient = buildApiClient()
    return new Models(apiClient);
  }

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getCurrentUser() {
    return this.apiClient.getRequest('current_user');
  }
}