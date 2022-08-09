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

  updateUserProfile(data) {
    return this.apiClient.postRequest('user_profile', data);
  }

  async getUserProfile(data) {
    const res = await this.apiClient.getRequest('user_profile', data);
    return res.data;
  }
}