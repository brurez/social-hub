import { buildApiClient } from "./buildApiClient.js";

// Endpoints to access Messaging app
export default class MessagingApi {
  static build() {
    const apiClient = buildApiClient("messaging");
    return new MessagingApi(apiClient);
  }

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  // get a chat room with the two users
  async getChat(user1Id, user2Id) {
    const { data } = await this.apiClient.getRequest(
      `users/${user1Id}/chats/?user2_id=${user2Id}`,
      { trailSlash: false }
    );
    return data;
  }
}
