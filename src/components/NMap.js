import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  Circle,
  GroundOverlay,
  Ellipse,
  Polyline,
} from "react-naver-maps";
import { HEADER_HEIGHT, ORANGE, SCREEN_HEIGHT } from "./../style";
import { SCREEN_WIDTH } from "./../style/index";
import { useRecoilState } from "recoil";
import {
  ChatRoomListState,
  ChatRoomSeletedState,
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

  //# 방검색 데이터
  const [chatRoomSeleted, setChatRoomSeleted] = useRecoilState(ChatRoomSeletedState);

  //# useEffect
  useEffect(() => {
    getfetch("/chat-rooms").then((d) => setChatRoomList(d));
  }, []);

  useEffect(() => {
    if (chatRoomSeleted.id != -1 && naverMapRef.current) {
      // let moveToPos = new navermaps.bo [
      //   new navermaps.LatLng(chatRoomSeleted.start_route[0].x, chatRoomSeleted.start_route[0].y),
      //   new navermaps.LatLng(chatRoomSeleted.end_route[0].x, chatRoomSeleted.end_route[0].y),
      // ];
      // navermaps.current.panTo(new navermaps.LatLng(chatRoomSeleted.start_route[0].x, chatRoomSeleted.start_route[0].y));
    }
  }, [chatRoomSeleted]);
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
        height: SCREEN_HEIGHT - HEADER_HEIGHT + 22, // 네이버지도 세로 길이
      }}
      defaultCenter={myPos} // 지도 초기 위치
      // onDrag={onDrag} // TEST CODE
      defaultZoom={zoomLevel} // 지도 초기 확대 배율
      onZoomChanged={(z) => setZoomLevel(z)}
      // bound={}
    >
      {chatRoomList.length > 0 &&
        chatRoomList.map((room, i) => (
          <div key={i.toString()}>
            {/* DB 모든 출발지 */}
            <ImageMarker
              color={"#FF6F6F"}
              onClick={() => console.log("as")}
              position={new navermaps.LatLng(Number(room.start_route[0].y), Number(room.start_route[0].x))}
              navermaps={navermaps}
            />
            {/* DB 모든 도착지 */}
            <ImageMarker
              onClick={() => console.log("as")}
              position={new navermaps.LatLng(Number(room.end_route[0].y), Number(room.end_route[0].x))}
              navermaps={navermaps}
            />
            {/* 출->도 경로 */}
            {chatRoomList.length > 0 &&
              chatRoomList
                // .map((room) => room.end_route[0])
                .map((room, i) => (
                  <Polyline
                    key={i.toString()}
                    path={[
                      new navermaps.LatLng(Number(room.start_route[0].y), Number(room.start_route[0].x)),
                      new navermaps.LatLng(Number(room.end_route[0].y), Number(room.end_route[0].x)),
                    ]}
                    strokeColor={"#FF6E6E"}
                    strokeOpacity={0.2}
                    strokeWeight={3}
                  />
                ))}
          </div>
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
    </NaverMap>
  );
}

function ImageMarker(props) {
  const navermaps = props.navermaps;
  const icon = {
    content: `<div onClick=\"${props.onClick}\"><img style=\"border-radius:30px;border-style:solid;border-color:${
      props.color ?? "#535353"
    };border-width:3px\" width=37 height=37 src=https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg /></div>`,
    size: new navermaps.Size(20, 20),
    anchor: new navermaps.Point(20, 20),
  };

  return <Marker title="Green" icon={icon} {...props} />;
}
