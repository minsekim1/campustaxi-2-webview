export const API_URL = "https://www.campus-taxi.com";

export const postfetch = (url, params) => {
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

export const posInit = {
  address_name: "",
  category_group_code: "",
  category_group_name: "",
  category_name: "",
  distance: "",
  id: -1,
  phone: "",
  place_name: "",
  place_url: "",
  road_address_name: "",
  x: "", //127.036586636975
  y: "", //37.5090312068588
};

export const ChatRoomInit = {
  ...posInit,
  departureTime: "",
  created_at: "",
  deleted_at: "",
  disable_at: "",
  distance: "",
  end_route: [],
  gender: "",
  path: [],
  person_limit: -1,
  start_at: "",
  start_route: [],
  taxiFare: -1,
  title: "",
};

export const NAVER_API_KEY = "lxll2d6397";
export const NAVER_API_SECRET_KEY = "cqaiGWouBEzt1W2A1re3KJb50znmMmx0qwBx8KpU";