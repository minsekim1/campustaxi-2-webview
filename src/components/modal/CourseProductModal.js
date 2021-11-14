import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GRAY7 } from "../../style";
import { GRAY6 } from "../../style/index";
import { useRecoilState } from "recoil";
import { commandInputListState, commandWindowState, CourseProductModalState } from "../recoil";
import { createRef, useRef, useState } from "react";
import { InputSearch } from "../Input/index";
import { PositionCard } from "../card/PositionCard";
import { getItems } from "../Input/CommandInput/dndFunc";
import { CreateRouteBottomModalState } from '../recoil';

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
export const CourseProductModal = () => {
  const [, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState);
  const [visibleRouteProduct, setVisibleRouteProduct] = useRecoilState(CourseProductModalState);
  const [commandWindow] = useRecoilState(commandWindowState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [procductInfo, setProcductInfo] = useState(procductInfoInit);
  const filterSearchTxt = useRef("");
  const bottomRef = useRef();

  //#region 네이버 상품검색
  const onChangeFilterSearchTxt = async (t) => {
    if (t.length === 0) {
      setProcductInfo(procductInfoInit);
    } else {
      // https://openapi.naver.com/v1/search/shop.json?query=
      fetch(`/v1/search/shop.json?query=${t}&display=${procductInfoInit.display}`, {
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

  //#region 닫기 클릭시
  const onClickClose = () => {
    setVisibleRouteProduct(false);
    setVisibleRoute(true);
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
              onClick={onClickClose}
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
          {LIST[0].brand !== "" &&
            LIST.map((product, i) => {
              const ref = createRef();
              const onClick = () => {
                const index = commandWindow.index + 1;
                setCommandInputList([
                  ...commandInputList.slice(0, index),
                  ...getItems(1, commandInputList.length, "product", product),
                  ...commandInputList.slice(index + 1, 999),
                ]);
                setVisibleRouteProduct(false);
                setVisibleRoute(true);
              };
              return (
                <div key={i.toString()} ref={ref}>
                  <PositionCard
                    address={`${product.category1} > ${product.category2} > ${product.category3} > ${product.category4}`}
                    title={noTags(product.title)}
                    desc={`최저가 ${numberWithCommas(product.lprice)}원`}
                    url={""}
                    img={product.image}
                    onClick={onClick}
                  />
                </div>
              );
            })}
        </div>
      </BottomSheet>
    </>
  );
};
