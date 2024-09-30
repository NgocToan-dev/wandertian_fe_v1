import BaseApi from "../baseApi";
import httpConfig from "../httpConfig";

class BusinessApi extends BaseApi{
  constructor(){
    super(httpConfig.businessURL);
  }
}

export default BusinessApi;