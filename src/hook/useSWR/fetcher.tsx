import axios from "axios";
import fetch from "unfetch";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export const fetcherBlob = (url: string, res: string) =>
  axios.get(url, { responseType: "blob" }).then(async (d) => {
		return new Promise((resolve) => {
			const blob = d.data;
			const myFile = new File([blob], new Date().toISOString());
			const reader = new FileReader();
			reader.onload = (e) => {
				const previewImage = String(e.target?.result);
				resolve(previewImage);
			};
			reader.readAsDataURL(myFile);
		})
  });

export default fetcher;
