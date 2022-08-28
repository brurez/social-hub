const serverUrl = "http://" + window.location.hostname + ":8000";

// Http request methods
export default class ApiClient {
  constructor(client, basePath) {
    this.httpClient = client;
    this.basePath = basePath;
  }

  async getRequest(path, { trailSlash = true } = {}) {
    const { data } = await this.httpClient.get(
      `${serverUrl}/${this.basePath}/${path}${trailSlash ? "/" : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-csrftoken": this.#getCookie("csrftoken"),
        },
      }
    );
    return data;
  }

  async postRequest(path, params, options = { headers: {} }) {
    const { data } = await this.httpClient.post(
      `${serverUrl}/${this.basePath}/${path}/`,
      params,
      {
        headers: {
          "Content-Type": "application/json",
          "x-csrftoken": this.#getCookie("csrftoken"),
          ...options.headers,
        },
      }
    );
    return data;
  }

  async putRequest(path, params, options = { headers: {} }) {
    const { data } = await this.httpClient.put(
      `${serverUrl}/${this.basePath}/${path}/`,
      params,
      {
        headers: {
          "Content-Type": "application/json",
          "x-csrftoken": this.#getCookie("csrftoken"),
          ...options.headers,
        },
      }
    );
    return data;
  }

  #getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
}
