import axios from "axios";
class HttpClient {
  async getAsync(request) {
    const response = await axios.get(request.url);
    return response.data;
  }

  async postAsync(request) {
    const response = await axios.post(request.url, request.data);
    return response.data;
  }

  async putAsync(request) {
    const response = await axios.put(request.url, request.data);
    return response.data;
  }

  async deleteAsync(request) {
    const response = await axios.delete(request.url);
    return response.data;
  }
}
export default new HttpClient();
