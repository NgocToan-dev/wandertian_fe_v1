import httpClient from "../httpClient";
import BusinessApi from "./_buApi";

class PostApi extends BusinessApi {
  controller = "Post";

  async savePost(payload, mode) {
    const request = {
      url: `${this.getApiUrl()}/savePost`,
      data: payload
    }
    return await httpClient.postAsync(request);
  }
  async getRelatedPost(payload) {
    const request = {
      url: `${this.getApiUrl()}/getRelatedPost`,
      data: payload
    }
    return await httpClient.postAsync(request);
  }

  async getLatestPosts(payload){
    const request = {
      url: `${this.getApiUrl()}/getLatestPosts`,
      data: payload
    }
    return await httpClient.postAsync(request);
  }
}

export default new PostApi();