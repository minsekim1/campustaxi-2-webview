import { ChatRoomType } from "../../types/ChatRoom";

export const isHttp = window.location.protocol !== "https:";
// export const ProxyURL = isHttp
//   ? "http://circlin-web-react-proxy.herokuapp.com/"
//   : "https://circlin-web-react-proxy.herokuapp.com/";
export const ProxyURL = "https://circlin-web-react-proxy.herokuapp.com/";
export const FTP_URL = "http://218.153.157.69/ftp/"; //http://218.153.157.69/ftp/1636779791516_874ca4a993.jpeg
export const API_URL = (isHttp ? ProxyURL : "") + "https://www.campus-taxi.com:444"; //
export const API_URL_NO_Proxy = "https://www.campus-taxi.com:444"; //
//"https://www.campus-taxi.com:444";
/**
 * Example
 * await fetchWithTimeout('/games', {timeout:6000})
 * @param {string} resource
 * @param {object} options
 * @returns
 */
export const fetchWithTimeout = async ({ resource, options = {} }) => {
  const { timeout = 8000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

export const postfetch = (url, params, isCustom = false, method) => {
  if (isCustom) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL_NO_Proxy}${url}`, {
        method: method ? method : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: params,
      })
        .then((d) => d.json())
        .then((d) => resolve(d))
        .catch((e) => reject(e));
    });
  } else {
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return new Promise((resolve, reject) => {
      fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
      })
        .then((d) => d.json())
        .then((d) => resolve(d))
        .catch((e) => reject(e));
    });
  }
};

export const getfetch = (url, params) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${url}${formBody}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((d) => d.json())
      .then((d) => resolve(d))
      .catch((e) => reject(e));
  });
};

export const getfetchCommon = (url, params, headers) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return new Promise((resolve, reject) => {
    fetch(`${url}${formBody}`, {
      method: "GET",
      headers,
    })
      .then((d) => d.json())
      .then((d) => resolve(d))
      .catch((e) => reject(e));
  });
};





export const NAVER_API_KEY = "lxll2d6397";
export const NAVER_API_SECRET_KEY = "cqaiGWouBEzt1W2A1re3KJb50znmMmx0qwBx8KpU";
