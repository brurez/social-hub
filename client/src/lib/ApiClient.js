
const serverUrl = 'http://localhost:8000';

export default class ApiClient {
  constructor(client) {
    this.httpClient = client;
  }

  async getRequest(path) {
    const { data } = await this.httpClient.get(`${serverUrl}/api/${path}/`);
    return data;
  }

  async postRequest(path, params) {
    const { data } = await this.httpClient.post(`${serverUrl}/api/${path}/`, params);
    return data;
  }

}