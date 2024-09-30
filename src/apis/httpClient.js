import commonFn from "@/utilities/commonFn";
import axios from "axios";

class HttpClient {
  async getAsync(request) {
    const token = commonFn.getCookie("accessToken");
    const response = await axios.get(request.url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  async postAsync(request) {
    const token = commonFn.getCookie("accessToken");

    const response = await axios.post(request.url, request.data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  async putAsync(request) {
    const token = commonFn.getCookie("accessToken");

    const response = await axios.put(request.url, request.data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  async deleteAsync(request) {
    const token = commonFn.getCookie("accessToken");

    const response = await axios.delete(request.url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}

export default new HttpClient();