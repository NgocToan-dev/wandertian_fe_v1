import httpClient from "../httpClient";
import BusinessApi from "./_buApi";

class PostApi extends BusinessApi {
  controller = "Comment";

  async getComments(postID) {
    const request = {
      url: [this.getApiUrl(), "post", postID].join("/"),
    };
    return await httpClient.getAsync(request);
  }
}

export default new PostApi();
