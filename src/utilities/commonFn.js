import { useLoading } from "vue-loading-overlay";
import _resources from "./resources/_resources";
import _enum from "./enum";
import moment from "moment";
import FormatDateType from "./enum/FormatDateType";

const toggleDarkMode = (darkMode) => {
  localStorage.setItem("darkMode", darkMode);
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const logout = () => {
  deleteCookie("accessToken");
  deleteCookie("role");
  localStorage.clear();
  sessionStorage.clear();
};

// Set cookie and secure cookie
const setCookie = (name, value, hours) => {
  let expires = "";
  if (hours) {
    let date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Strict; Secure";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
const deleteCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};

const getRoleFromAccessToken = (accessToken) => {
  const base64Url = accessToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const payload = JSON.parse(jsonPayload);
  return payload.Role;
};

const checkCookieExpired = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return true;
    }
  }
  return false;
};

const getRoleInCookie = () => {
  return getCookie("role");
};

const showLoading = () => {
  // check if loading is already shown
  if (window.loader) {
    return;
  }
  const $loading = useLoading({});
  window.loader = $loading.show();
};

const hideLoading = () => {
  if (window.loader) {
    window.loader.hide();
    window.loader = null;
  }
};

const formatDate = (date, type) => {
  switch(type){
    case FormatDateType.TEXT:
      return moment(date).format("ll");
    case FormatDateType.TEXT_TIME:
      return moment(date).format("LLL");
    case FormatDateType.TIME:
      return moment(date).format("HH:mm:ss");
  }
  return moment(date).format("DD/MM/YYYY");
}

const getResourceByEnum = (enumName, value) => {
  const resources = _resources[enumName];
  const enums = _enum[enumName];
  if(!enums){
    console.log(`Enum ${enumName} not found`);
    return;
  }
  const enumKey = Object.keys(enums).find((key) => enums[key] === value);
  return resources[enumKey];
}

const showPostDetail = (proxy, id) => {
  proxy.$router.push({ name: "postDetail", params: { id: id } });
};

export default {
  toggleDarkMode,
  logout,
  setCookie,
  getCookie,
  deleteCookie,
  getRoleFromAccessToken,
  getRoleInCookie,
  showLoading,
  hideLoading,
  checkCookieExpired,
  formatDate,
  getResourceByEnum,
  showPostDetail
};
