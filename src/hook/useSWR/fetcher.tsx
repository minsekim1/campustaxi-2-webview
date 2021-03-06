import axios, { CancelToken, CancelTokenSource } from "axios";
import fetch from "unfetch";
import { NAVER_API_KEY, NAVER_API_SECRET_KEY, ProxyURL } from "../../components/common";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export const fetcherBlob = (url: string): Promise<string> =>
  axios.get(`${ProxyURL}${url}`, { responseType: "blob" }).then(async (d) => {
    return new Promise((resolve) => {
      const blob = d.data;
      const myFile = new Blob([blob]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewImage = String(e.target?.result);
        resolve(previewImage);
      };
      reader.readAsDataURL(myFile);
    });
  });

export const fetcherGetImageByKeyword = (
  url: string,
  title: string,
  source: CancelTokenSource
): Promise<string | null> => {
  return new Promise((resolve) => {
    axios(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": "yeoXdUtxPpcjkxR4G932",
        "X-Naver-Client-Secret": "TChrYL1rxH",
      },
      cancelToken: source.token,
    }).then((res: any) => {
      if (res.data.display)
        resolve(res.data.items[0].thumbnail);
      else
        resolve(null);
    });
  });
};

export default fetcher;
