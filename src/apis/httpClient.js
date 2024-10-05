import commonFn from "@/utilities/commonFn";
import axios from "axios";

class HttpClient {
  async getAsync(request) {
    try {
      const token = commonFn.getCookie("accessToken");
      const response = await axios.get(request.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (ex) {
      // Check if the error is 401
      if (ex.response.status === 401) {
        // Redirect to login page
        window.location.href = "/logout";
      }
    }
  }

  async postAsync(request) {
    try {
      const token = commonFn.getCookie("accessToken");

      const response = await axios.post(request.url, request.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (ex) {
      // Check if the error is 401
      if (ex.response.status === 401) {
        // Redirect to login page
        window.location.href = "/logout";
      }
    }
  }

  async putAsync(request) {
    try {
      const token = commonFn.getCookie("accessToken");

      const response = await axios.put(request.url, request.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (ex) {
      // Check if the error is 401
      if (ex.response.status === 401) {
        // Redirect to login page
        window.location.href = "/logout";
      }
    }
  }

  async deleteAsync(request) {
    try {
      const token = commonFn.getCookie("accessToken");

      const response = await axios.delete(request.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (ex) {
      // Check if the error is 401
      if (ex.response.status === 401) {
        // Redirect to login page
        window.location.href = "/logout";
      }
    }
  }
}

export default new HttpClient();
