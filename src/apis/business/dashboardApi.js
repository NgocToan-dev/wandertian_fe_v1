import httpClient from "../httpClient";
import BusinessApi from "./_buApi";

class DashboardApi extends BusinessApi {
  controller = "Dashboard";

  async analyzePostByWeekInYear(year) {
    const payload = {
      url:
        [this.getApiUrl(), "analyzePostByWeekInYear"].join("/") +
        `?year=${year}`,
    };
    return await httpClient.getAsync(payload);
  }

  async analyzePostByCategory() {
    const payload = {
      url: [this.getApiUrl(), "analyzePostByCategory"].join("/"),
    };
    return await httpClient.getAsync(payload);
  }
}

export default new DashboardApi();
