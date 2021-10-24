import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GRAY7 } from "../../style";
import { GRAY6 } from "../../style/index";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { commandWindowState, RouteProductModalState } from "../recoil";
import { createRef, useRef, useState } from "react";
import { InputSearch } from "./../Input/index";
import { RoomCard } from "../card/RoomCard";
import { getfetchCommon } from "../common";
import { NAVER_API_SECRET_KEY, NAVER_API_KEY } from "./../common/index";
import { PositionCard } from "./../card/PositionCard";

//#region 콤마함수 : 숫자 3자리마다 콤마 찍어줌
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const noTags = (x) => {
  return x.toString().replace(/(<([^>]+)>)/gi, "");
};
//#endregion
export const productInit = {
  brand: "",
  category1: "",
  category2: "",
  category3: "",
  category4: "",
  // hprice: "",
  image: "",
  link: "",
  lprice: "",
  maker: "",
  mallName: "",
  productId: "",
  productType: "",
  title: "",
};
const procductInfoInit = {
  items: [productInit],
  display: 80,
  start: 1,
  total: 0,
  lastBuildDate: "",
};
export const RouteProductModal = () => {
  const [visibleRouteProduct, setVisibleRouteProduct] = useRecoilState(RouteProductModalState);
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [procductInfo, setProcductInfo] = useState(procductInfoInit);
  const filterSearchTxt = useRef("");
  const bottomRef = useRef();

  //#region 네이버 상품검색
  const onChangeFilterSearchTxt = async (t) => {
    if (t.length == 0) {
      setProcductInfo(procductInfoInit);
    } else {
      // https://openapi.naver.com/v1/search/shop.json?query=
      fetch(`/v1/search/shop.json?query=${ t }&display=${procductInfoInit.display}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Naver-Client-Id": "yeoXdUtxPpcjkxR4G932",
          "X-Naver-Client-Secret": "TChrYL1rxH",
        },
      })
        .then((d) => d.json())
        .then((d) => setProcductInfo(d));
    }
  };
  //#endregion

  const LIST = procductInfo.items;
  return (
    <>
      <BottomSheet
        ref={bottomRef}
        blocking={false}
        open={visibleRouteProduct}
        onDismiss={() => setVisibleRouteProduct(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.5, maxHeight * 0.99]}
        defaultSnap={({ lastSnap, snapPoints }) => [snapPoints[1]]}
        header={
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY7, float: "left" }}>
              추천 상품을 추가해보세요!
            </div>
            <div
              style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
              onClick={() => setVisibleRouteProduct(false)}
            >
              닫기
            </div>
          </div>
        }
        expandOnContentDrag={true}
      >
        <div style={{ padding: "0 10px 80px 10px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <InputSearch
              value={filterSearchTxt}
              placeholder={"검색어를 입력해주세요."}
              onChange={onChangeFilterSearchTxt}
            />
          </div>
          {LIST[0].brand != "" &&
            LIST.map((product, i) => {
              const ref = createRef();
              const handleClick = () => {
                // ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
              };
              return (
                <div key={i.toString()} ref={ref}>
                  <PositionCard
                    address={`${product.category1} > ${product.category2} > ${product.category3} > ${product.category4}`}
                    title={noTags(product.title)}
                    desc={`최저가 ${numberWithCommas(product.lprice)}원`}
                    url={""}
                    img={product.image}
                    onClick={""}
                    // room={product}
                    // onClick={() => {
                    //   // onClickRoom();
                    //   handleClick();
                  />
                </div>
              );
            })}
        </div>
      </BottomSheet>
    </>
  );
};
