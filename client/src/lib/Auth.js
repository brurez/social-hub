import {buildApiClient} from "./buildApiClient.js";


export default class Auth {
  static build() {
    const apiClient = buildApiClient("api")
    return new Auth(apiClient);
  }

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  signUp(data) {
    return this.apiClient.postRequest('users', data);
  }

  signIn(data) {
    return this.apiClient.postRequest('signin', data);
  }

  logOut() {
    return this.apiClient.postRequest('logout');
  }
}