import Cookies from "universal-cookie";

const cookies = new Cookies();

const serverUrl = 'http://localhost:8000';


export default class ApiClient {
  constructor(client) {
    this.httpClient = client;
  }

  async getRequest(path) {
    const {data} = await this.httpClient.get(`${serverUrl}/api/${path}/`, {
      headers: {
        "Content-Type": "application/json",
        "x-csrftoken": cookies.get("csrftoken"),
      },
    });
    return data;
  }

  async postRequest(path, params, options = { headers: {}}) {
    const {data} = await this.httpClient.post(`${serverUrl}/api/${path}/`, params, {
      headers: {
        "Content-Type": "application/json",
        "x-csrftoken": cookies.get("csrftoken"),
        ...options.headers,
      },
    });
    return data;
  }

}