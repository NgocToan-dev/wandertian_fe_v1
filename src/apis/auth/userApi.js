import httpClient from "../httpClient";
import AuthAPI from "./_authApi";

class UserApi extends AuthAPI {
  controller = "UserAuthentication";

  async login(payload){
    const request = {
      url: `${this.getApiUrl()}/login`,
      data: payload,
    };
    return await httpClient.postAsync(request);
  }
  async registerCode(payload){
    const request = {
      url: `${this.getApiUrl()}/registerCode`,
      data: payload,
    };
    return await httpClient.postAsync(request);
  }

  async registerNewUser(payload){
    const request = {
      url: `${this.getApiUrl()}/registerNewUser`,
      data: payload,
    };
    return await httpClient.postAsync(request);
  }

  async forgetPasswordCode(payload){
    const request = {
      url: `${this.getApiUrl()}/forgetPasswordCode`,
      data: payload,
    };
    return await httpClient.postAsync(request);
  }

  async resetPassword(payload){
    const request = {
      url: `${this.getApiUrl()}/resetPassword`,
      data: payload,
    };
    return await httpClient.postAsync(request);
  }

  async verifyCode(payload){
    const request = {
      url: `${this.getApiUrl()}/verifyCode`,
      data: payload,
    };
    return await httpClient.postAsync(request);
  }
}

export default new UserApi();
