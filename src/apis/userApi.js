import BaseApi from "./baseApi";
import httpClient from "./httpClient";

class UserApi extends BaseApi {
  controller = "User";

  async checkLogin(payload) {
    const request = {
      url: `${this.getApiUrl()}/CheckLogin`,
      data: payload,
    };
    return await httpClient.postAsync(request);
  }
}

export default new UserApi();
