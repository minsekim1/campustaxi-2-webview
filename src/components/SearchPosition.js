import { useRef } from "react";
import { InputSearch } from "./Input";
import { useRecoilState } from "recoil";
import { SearchPositionState, SearchPosResultState } from "./recoil";

export const KakaoNativeKey = "KakaoAK 2ffd2e667110415efb87f207cb33b8be";
export const SearchPosition = () => {
  const [, setSearchResult] = useRecoilState(SearchPosResultState); //searchResult
  const [visibleSearch] = useRecoilState(SearchPositionState); //setVisibleSearch
  const title = useRef("");

  const onChange = (t) => {
    if (t !== "")
      fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${t}`, {
        headers: {
          Authorization: KakaoNativeKey,
        },
      })
        .then((d) => d.json())
        .then((d) => setSearchResult(d));
  };
  return (
    <>
      {visibleSearch.visible ? (
        <div style={{ position: "absolute", top: 72 + 12, left: 20, zIndex: 1 }}>
          <InputSearch value={title} placeholder={"검색 장소를 입력해주세요."} autoFocus onChange={onChange} />
        </div>
      ) : (
        false
      )}
    </>
  );
};
