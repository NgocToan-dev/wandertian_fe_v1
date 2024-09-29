import httpConfig from "./httpConfig";
class BaseApi {
  baseURL = "";
  controller = "";

  constructor(baseURL) {
    this.baseURL = baseURL || httpConfig.baseURL;
  }

  getApiUrl() {
    return `${this.baseURL}/api/${this.controller}`;
  }
}

export default BaseApi;
