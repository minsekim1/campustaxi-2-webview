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

export const RouteProductModal = () => {
  const [visibleRouteProduct, setVisibleRouteProduct] = useRecoilState(RouteProductModalState);
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [procductList, setProcductList] = useState([]);
  const [procductListFilterd, setProcductListFilterd] = useState([]);
  const filterSearchTxt = useRef("");
  const bottomRef = useRef();

  const onChangeFilterSearchTxt = async (t) => {
    if (t.length == 0) {
      setProcductListFilterd([]);
    } else {
      // https://openapi.naver.com/v1/search/shop.json?query=
      fetch("/openapi/v1/search/shop?query=asd", {
        method: "GET",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json",
          // "X-Naver-Client-Id": "0f8NE4coMei9Rs3yMjzd",//cir
          // "X-Naver-Client-Secret": "jctS7OgJQj",//cir

          "X-Naver-Client-Id": "yeoXdUtxPpcjkxR4G932",
          "X-Naver-Client-Secret": "TChrYL1rxH",
        },
      })
        .then((d) => d.json())
        .then((d) => console.log(d));
      // setprocductList(
      // d.map((room) => {
      //   return { ...room, path: _.chunk(_.split(room.path, ","), 2) };
      // })
      // )
      //       getfetch("/chat-rooms").then((d) =>
      //   setprocductList(
      //     d.map((room) => {
      //       return { ...room, path: _.chunk(_.split(room.path, ","), 2) };
      //     })
      //   )
      // );
      //   const list = await procductList.filter(
      //     (room) =>
      //       // 추후 방장이름도 추가
      //       room.title.includes(t) ||
      //       room.start_route[0].road_address_name.includes(t) ||
      //       room.start_route[0].place_name.includes(t) ||
      //       room.start_route[0].phone.includes(t) ||
      //       room.start_route[0].address_name.includes(t) ||
      //       room.start_route[0].category_name.includes(t) ||
      //       room.end_route[0].road_address_name.includes(t) ||
      //       room.end_route[0].place_name.includes(t) ||
      //       room.end_route[0].phone.includes(t) ||
      //       room.end_route[0].address_name.includes(t) ||
      //       room.end_route[0].category_name.includes(t)
      //   );
      //   setprocductListFilterd(list);
    }
  };
  const LIST = filterSearchTxt.current.length > 0 ? procductListFilterd : procductList;
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
          {procductList.length > 0 &&
            LIST.map((room, i) => {
              const ref = createRef();
              const handleClick = () => {
                ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
              };
              return (
                <div key={i.toString()} ref={ref}>
                  <RoomCard
                    room={room}
                    onClick={() => {
                      // onClickRoom();
                      handleClick();
                    }}
                  />
                </div>
              );
            })}
        </div>
      </BottomSheet>
    </>
  );
};
