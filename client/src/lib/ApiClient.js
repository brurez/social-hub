const serverUrl = 'http://localhost:8000';

export default class ApiClient {
  constructor(client) {
    this.httpClient = client;
  }

  async getRequest(path, { trailSlash = true } = {}) {
    const {data} = await this.httpClient.get(`${serverUrl}/api/${path}${trailSlash ? '/' : ''}`, {
      headers: {
        "Content-Type": "application/json",
        "x-csrftoken": this.#getCookie("csrftoken"),
      },
    });
    return data;
  }

  async postRequest(path, params, options = {headers: {}}) {
    const {data} = await this.httpClient.post(`${serverUrl}/api/${path}/`, params, {
      headers: {
        "Content-Type": "application/json",
        "x-csrftoken": this.#getCookie("csrftoken"),
        ...options.headers,
      },
    });
    return data;
  }

  #getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
}