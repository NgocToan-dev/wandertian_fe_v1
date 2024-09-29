import BaseApi from "../baseApi";
import httpConfig from "../httpConfig";

class AuthAPI extends BaseApi{
  constructor(){
    super(httpConfig.authURL);
  }
}

export default AuthAPI;