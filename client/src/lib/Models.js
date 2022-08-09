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
    return this.apiClient.postRequest('user_profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async getUserProfile(data) {
    const res = await this.apiClient.getRequest('user_profile', data);
    return res.data;
  }

  async getProfiles() {
    const res = await this.apiClient.getRequest('profiles');
    return res.data;
  }

  async getStatusPosts() {
    const res = await this.apiClient.getRequest('status_posts');
    return res.data;
  }

  async getStatusPost(id) {
    const res = await this.apiClient.getRequest(`status_posts/${id}`);
    return res.data
  }

  async createStatusPost(data) {
    const res = await this.apiClient.postRequest('status_posts', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data;
  }
}