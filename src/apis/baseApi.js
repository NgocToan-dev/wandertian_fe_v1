import EditMode from "@/utilities/enum/EditMode";
import httpClient from "./httpClient";
import httpConfig from "./httpConfig";
import { useToast } from "vue-toastification";
import { data } from "autoprefixer";

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

  async getOne(payload) {
    const request = {
      url: [this.getApiUrl(), "getOne"].join("/"),
      data: payload,
    };
    return await httpClient.postAsync(request);
  }

  async get(id) {
    const request = {
      url: [this.getApiUrl(), id].join("/"),
    };
    return await httpClient.getAsync(request);
  }

  async getAll(payload) {
    const request = {
      url: [this.getApiUrl(), "getAll"].join("/"),
      data: payload,
    };
    return await httpClient.postAsync(request);
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
