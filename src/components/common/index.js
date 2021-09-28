export const API_URL = "http://ec2-3-36-124-229.ap-northeast-2.compute.amazonaws.com:1337";

export const postfetch = (url, params) => {
  // let details = {
  //   userName: "test@gmail.com",
  //   password: "Password!",
  //   grant_type: "password",
  // };

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

export const posInit = { title: "", address: "", lat: 0, lon: 0, addressDetail: "", addressCode: "" };
