import { useEffect, useRef } from "react";
import { Input, InputSearch } from "./Input";
import { getfetch } from "./common/index";

export const KakaoNativeKey = "KakaoAK 2ffd2e667110415efb87f207cb33b8be";
export const SearchPosition = () => {
  const title = useRef("");

  const onChange = (t) => {
    fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${t}`, {
      headers: {
        Authorization: KakaoNativeKey,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("asd", json);
        // setAddressSearchList(json.documents);
      });
  };
  return (
    <div style={{ position: "absolute", top: 96 + 24, left: 10, zIndex: 1 }}>
      <InputSearch value={title} placeholder={"검색 장소를 입력해주세요."} onChange={onChange} />
    </div>
  );
};
