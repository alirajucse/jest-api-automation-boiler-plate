const axios = require("axios");
var FormData = require("form-data");

class HttpClientService {
  async post(endpoint, body, authToken) {
    const headers = this.getHeaders(authToken);
    // Check if the body is a FormData object
    if (body instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }
    return axios.post(endpoint, body, {
      headers: headers,
    });
  }

  async get(endpoint, authToken) {
    return axios.get(endpoint, {
      headers: this.getHeaders(authToken),
    });
  }

  async delete(endpoint, authToken) {
    return axios.delete(endpoint, {
      headers: this.getHeaders(authToken),
      authToken,
    });
  }

  async patch(endpoint, body, authToken) {
    return axios.patch(endpoint, body, {
      headers: this.getHeaders(authToken),
      authToken,
    });
  }

  async put(endpoint, body, authToken) {
    return axios.put(endpoint, body, {
      headers: this.getHeaders(authToken),
      authToken,
    });
  }

  getHeaders(authToken) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    };
    if (authToken) {
      headers = { ...headers, "x-auth-token": authToken };
    }
    return headers;
  }
}

module.exports = HttpClientService;
