import EditMode from "@/utilities/enum/EditMode";
import httpClient from "./httpClient";
import httpConfig from "./httpConfig";
import { useToast } from "vue-toastification";

const toast = useToast();

class BaseApi {
  baseURL = "";
  controller = "";

  constructor(baseURL) {
    this.baseURL = baseURL || httpConfig.baseURL;
  }

  getApiUrl() {
    return `${this.baseURL}/api/${this.controller}`;
  }

  async get(id) {
    const request = {
      url: `${this.getApiUrl()}/${id}`,
    };
    return await httpClient.getAsync(request);
  }

  async getAll() {
    const request = {
      url: `${this.getApiUrl()}`,
    };
    return await httpClient.getAsync(request);
  }

  async save(payload, mode) {
    var request = {
      url: `${this.getApiUrl()}`,
      data: payload,
    };
    switch (mode) {
      case EditMode.INSERT:
        return await httpClient.postAsync(request);
      case EditMode.UPDATE:
        return await httpClient.putAsync(request);
      default:
        toast.warning("Error when saving data");
        break;
    }
  }

  async delete(id) {
    const request = {
      url: `${this.getApiUrl()}/${id}`,
    };
    return await httpClient.deleteAsync(request);
  }
}

export default BaseApi;
