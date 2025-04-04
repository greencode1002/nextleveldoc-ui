import axios from "axios";
import { api } from "../config";
import { toast } from "react-toastify";

// default
axios.defaults.baseURL = api.NEW_API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = JSON.parse(sessionStorage.getItem("authAdmin"))?.token ?
  JSON.parse(sessionStorage.getItem("authAdmin"))?.token :
  JSON.parse(sessionStorage.getItem("authUser"))?.token ?
    JSON.parse(sessionStorage.getItem("authUser"))?.token : null;

if (token)
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(

  function (response) {

    // return response.data ? response.data : response;
    return response;
  },
  function (error) {
    const { response } = error;

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (response?.status) {
      case 500:
        toast.error(response.data.error, { autoClose: 3000 });
        break;
      case 401:
        toast.error(response.data.error, { autoClose: 3000 });
        break;
      case 404:
        toast.error(response.data.error, { autoClose: 3000 });
        break;
      case 400:
        toast.error(response.data.error, { autoClose: 3000 });
        break;
      case 200:
        toast.error(response.data.message, { autoClose: 3000 });
        break;

      default:
        message = error?.message || error;
    }
    return Promise.reject(response);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params) => {
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authAdmin") ? sessionStorage.getItem("authAdmin") : sessionStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};

export { APIClient, setAuthorization, getLoggedinUser };