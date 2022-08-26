import { buildApiClient } from "./buildApiClient.js";

export default class MessagingApi {
  static build() {
    const apiClient = buildApiClient("messaging");
    return new MessagingApi(apiClient);
  }

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getChat(user1Id, user2Id) {
    const { data } = await this.apiClient.getRequest(
      `users/${user1Id}/chats/?user2_id=${user2Id}`,
      { trailSlash: false }
    );
    return data;
  }
}
