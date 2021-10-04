import { RenderAfterNavermapsLoaded, NaverMap, Marker, Circle, GroundOverlay, Ellipse } from "react-naver-maps";
import { HEADER_HEIGHT, SCREEN_HEIGHT } from "./../style";
import { SCREEN_WIDTH } from "./../style/index";
import { useRecoilState } from "recoil";
import {
  ChatRoomListState,
  CreateBottomModalState,
  endPosState,
  MyPosState,
  SearchPositionState,
  SearchPosResultState,
  startPosState,
} from "./recoil";
import { useEffect, useRef, useState } from "react";
import { posInit } from "./common";
import { getfetch } from "./common/index";

export const NMAP = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={"lxll2d6397"} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
};
function NaverMapAPI() {
  //#region 방생성 state
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  const [searchResult, setSearchResult] = useRecoilState(SearchPosResultState);
  const [visibleCreate, setVisibleCreate] = useRecoilState(CreateBottomModalState);
  const [myPos, setMyPos] = useRecoilState(MyPosState);
  const [startPos, setStartPos] = useRecoilState(startPosState);
  const [endPos, setEndPos] = useRecoilState(endPosState);

  //# 기본 데이터
  const [zoomLevel, setZoomLevel] = useState(13);
  const [chatRoomList, setChatRoomList] = useRecoilState(ChatRoomListState);
  const naverMapRef = useRef();

  const navermaps = window.naver.maps;

  //# useEffect
  useEffect(() => {
    getfetch("/chat-rooms").then((d) => setChatRoomList(d));
  }, []);

  //# 함수
  // const onDrag = (d) => {
  //   // setMyPos({ lat: d.latlng._lat, lng: d.latlng._lng });
  // };
  const onClickMarker = (pos) => {
    if (visibleSearch.position == "start") setStartPos(pos);
    else setEndPos(pos);
    setSearchResult({ documents: [posInit], meta: { is_end: true, pageable_count: -1, total_count: -1 } });
    setVisibleCreate(true);
    setVisibleSearch({ visible: false, position: "" });
  };
  //#endregion
  return (
    <NaverMap
      ref={naverMapRef}
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: SCREEN_WIDTH, // 네이버지도 가로 길이
        height: SCREEN_HEIGHT - HEADER_HEIGHT, // 네이버지도 세로 길이
      }}
      defaultCenter={myPos} // 지도 초기 위치
      // onDrag={onDrag} // TEST CODE
      defaultZoom={zoomLevel} // 지도 초기 확대 배율
      onZoomChanged={(z) => setZoomLevel(z)}
    >
      {/* DB 모든 출발지 */}
      {chatRoomList.length > 0 &&
        chatRoomList
          .map((room) => room.start_route[0])
          .map((pos, i) => (
            <Marker
              key={i.toString()}
              position={new navermaps.LatLng(Number(pos.y), Number(pos.x))}
              icon={{
                url: "https://picsum.photos/200",
                size: new navermaps.Size(50, 52),
                origin: new navermaps.Point(0, 0),
                anchor: new navermaps.Point(25, 26),
              }}
            />
          ))}
      {/* DB 모든 도착지 */}
      {chatRoomList.length > 0 &&
        chatRoomList
          .map((room) => room.end_route[0])
          .map((pos, i) => (
            <Marker
              key={i.toString()}
              position={new navermaps.LatLng(Number(pos.y), Number(pos.x))}
              icon={{
                url: "https://picsum.photos/200",
                size: new navermaps.Size(50, 52),
                origin: new navermaps.Point(0, 0),
                anchor: new navermaps.Point(25, 26),
              }}
            />
          ))}

      {/* 검색결과 */}
      {visibleSearch.visible &&
        searchResult.documents.map((pos, i) => (
          <Marker
            key={i.toString()}
            position={new navermaps.LatLng(Number(pos.y), Number(pos.x))}
            animation={1}
            onClick={() => onClickMarker(pos)}
          />
        ))}

      {/* <Marker
        key={1}
        position={new navermaps.LatLng(myPos.lat, myPos.lng)}
        animation={2}
        onClick={() => {
          alert("여기는 N서울타워입니다.");
        }}
      /> */}
    </NaverMap>
  );
}
