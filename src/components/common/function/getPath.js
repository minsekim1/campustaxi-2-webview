import { NAVER_API_KEY, NAVER_API_SECRET_KEY } from "..";

export const getPath = (x1, y1, x2, y2) => {
  //&option={탐색옵션}
  return new Promise((resolve, reject) => {
    fetch(`/map-direction/v1/driving?start=${x1},${y1}&goal=${x2},${y2}`, {
      method: "GET",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": NAVER_API_KEY,
        "X-NCP-APIGW-API-KEY": NAVER_API_SECRET_KEY,
      },
    })
      .then((d) => d.json())
      .then((d) =>
        resolve({
          path: d.route.traoptimal[0].path,
          distance: Number(Number(d.route.traoptimal[0].summary.distance / 1000).toFixed(1)),
          duration: Number(Number(d.route.traoptimal[0].summary.duration / 60000).toFixed(0)),
          departureTime: d.route.traoptimal[0].summary.departureTime,
          taxiFare: d.route.traoptimal[0].summary.taxiFare,
        })
      )
      .catch((e) => reject(e));
  });
};
