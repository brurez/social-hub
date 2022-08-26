import { buildApiClient } from "./buildApiClient.js";

// Endpoints to access the API app
export default class CoreApi {
  static build() {
    const apiClient = buildApiClient("api");
    return new CoreApi(apiClient);
  }

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // get current user logged in
  getCurrentUser() {
    return this.apiClient.getRequest("current_user");
  }

  // get an user by id
  async getUser(userId) {
    if (!userId) return {};
    const res = await this.apiClient.getRequest(`users/${userId}`);
    return res.data;
  }

  // updates current user profile
  updateUserProfile(data) {
    return this.apiClient.postRequest("user_profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // get current user profile
  async getUserProfile(data) {
    const res = await this.apiClient.getRequest("user_profile", data);
    return res.data;
  }

  // get all profiles
  async getProfiles() {
    const res = await this.apiClient.getRequest("profiles");
    return res.data;
  }

  // gel all posts
  async getStatusPosts() {
    const res = await this.apiClient.getRequest("status_posts");
    return res.data;
  }

  // get all posts of a profile
  async getProfileStatusPosts(profileId) {
    const res = await this.apiClient.getRequest(`profiles/${profileId}/status_posts`);
    return res.data;
  }

  // get a specific post
  async getStatusPost(id) {
    const res = await this.apiClient.getRequest(`status_posts/${id}`);
    return res.data;
  }

  // create a new status post
  async createStatusPost(data) {
    const res = await this.apiClient.postRequest("status_posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  // updates an existing status post
  async updateStatusPost(postId, data) {
    const res = await this.apiClient.putRequest( `status_posts/${postId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  async getProfile(profileId) {
    const res = await this.apiClient.getRequest(`profiles/${profileId}`);
    return res.data;
  }

  async createFriendship(profileId1, profileId2) {
    const res = await this.apiClient.postRequest(
      `profiles/${profileId1}/friendships`,
      {
        friendProfileId: profileId2,
      }
    );
    return res.data;
  }

  async getProfileFriends(profileId) {
    const res = await this.apiClient.getRequest(
      `profiles/${profileId}/friendships`
    );
    return res.data;
  }

  async getProfilesSearch(q) {
    const res = await this.apiClient.getRequest(`profiles/search/?q=${q}`, {
      trailSlash: false,
    });
    return res.data;
  }
}
