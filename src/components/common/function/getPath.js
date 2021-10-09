import { NAVER_API_KEY, NAVER_API_SECRET_KEY } from "..";

export const getPath = (x1, y1, x2, y2) => {
  //&option={탐색옵션}
  return new Promise((resolve, reject) => {
		const URL = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${x1},${y1}&goal=${x2},${y2}`;
    fetch(URL, {
      method: "POST",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": NAVER_API_KEY,
        "X-NCP-APIGW-API-KEY": NAVER_API_SECRET_KEY,
        "Access-Control-Allow-Origin": "*",
        mode: "no-cors",
      },
    })
      .then((d) => d.json())
      .then((d) => resolve(d))
      .catch((e) => reject(e));
  });
};
