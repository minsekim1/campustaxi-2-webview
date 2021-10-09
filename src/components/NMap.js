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
  BottomModalState,
  ChatRoomListState,
  ChatRoomSeletedState,
  CreateBottomModalState,
  endPosState,
  MyPosState,
  pathState,
  SearchPositionState,
  SearchPosResultState,
  startPosState,
} from "./recoil";
import { useEffect, useRef, useState } from "react";
import { NAVER_API_KEY, posInit } from "./common";
import { getfetch } from "./common/index";
import { getPath } from "./common/function/getPath";

export const NMAP = () => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={NAVER_API_KEY} // 자신의 네이버 계정에서 발급받은 Client ID
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
  const [visible, setVisible] = useRecoilState(BottomModalState);

  const [myPos, setMyPos] = useRecoilState(MyPosState);
  const [startPos, setStartPos] = useRecoilState(startPosState);
  const [endPos, setEndPos] = useRecoilState(endPosState);
  const [path, setPath] = useRecoilState(pathState);

  //# 기본 데이터
  const navermaps = window.naver.maps;
  const [bounds, setBounds] = useState(
    new navermaps.LatLngBounds(
      new navermaps.LatLng(37.5391768, 126.9980514),
      new navermaps.LatLng(37.5591768, 126.9780514)
    )
  );
  const [chatRoomList, setChatRoomList] = useRecoilState(ChatRoomListState);
  const naverMapRef = useRef();

  //# 방검색 데이터
  const [chatRoomSeleted, setChatRoomSeleted] = useRecoilState(ChatRoomSeletedState);

  //# useEffect
  useEffect(() => {
    getfetch("/chat-rooms").then((d) => setChatRoomList(d));
  }, []);

  useEffect(() => {
    alert(1);
    if (endPos.place_name && startPos.place_name) {
      let { x: x1, y: y1 } = startPos;
      let { x: x2, y: y2 } = endPos;
      if (y1 > y2) {
        y1 += 0.0001;
        y2 -= 0.0003;
      } else {
        y2 += 0.0001;
        y1 -= 0.0003;
      }
      let bounds = new navermaps.LatLngBounds(new navermaps.LatLng(y1, x1), new navermaps.LatLng(y2, x2)); //.getCenter();
      setBounds(bounds);
      getPath(x1, y1, x2, y2).then((d) => console.log(d));
    }
  }, [startPos.place_name, endPos.place_name]);

  useEffect(() => {
    if (chatRoomSeleted.id != -1 && naverMapRef.current) {
      let { x: x1, y: y1 } = chatRoomSeleted.start_route[0];
      let { x: x2, y: y2 } = chatRoomSeleted.end_route[0];
      if (y1 > y2) {
        y1 += 0.0001;
        y2 -= 0.0003;
      } else {
        y2 += 0.0001;
        y1 -= 0.0003;
      }
      let bounds = new navermaps.LatLngBounds(new navermaps.LatLng(y1, x1), new navermaps.LatLng(y2, x2)); //.getCenter();
      setBounds(bounds);
      // naverMapRef.current.fitBounds(bounds);
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
        height: SCREEN_HEIGHT - HEADER_HEIGHT, // 네이버지도 세로 길이
      }}
      defaultCenter={myPos} // 지도 초기 위치
      // onDrag={onDrag} // TEST CODE
      bounds={bounds}
      onBoundsChanged={setBounds}
    >
      {chatRoomList.length > 0 &&
        chatRoomList.map((room, i) => (
          <div key={i.toString()}>
            {/* DB 모든 출발지 */}
            <ImageMarker
              color={"#FF6F6F"}
              onClick={() => {
                setChatRoomSeleted(room);
                setVisible(true);
              }}
              position={new navermaps.LatLng(Number(room.start_route[0].y), Number(room.start_route[0].x))}
              navermaps={navermaps}
            />
            {/* DB 모든 도착지 */}
            <ImageMarker
              onClick={() => {
                setChatRoomSeleted(room);
                setVisible(true);
              }}
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
      {/* 방 생성 시 출/도 표시 */}
      {(visibleCreate || visibleSearch.position == "end") && startPos.place_name ? (
        <ImageMarker
          url={"/images/startPosIcon.png"}
          position={new navermaps.LatLng(Number(startPos.y), Number(startPos.x))}
          navermaps={navermaps}
        />
      ) : (
        false
      )}
      {(visibleCreate || visibleSearch.position == "start") && endPos.place_name ? (
        <ImageMarker
          url={"/images/endPosIcon.png"}
          position={new navermaps.LatLng(Number(endPos.y), Number(endPos.x))}
          navermaps={navermaps}
        />
      ) : (
        false
      )}
    </NaverMap>
  );
}

function ImageMarker(props) {
  const navermaps = props.navermaps;
  const icon = {
    content: `<div onClick=\"${props.onClick}\"><img style=\"${
      !props.url ? "border-radius:30px;border-style:solid;" : ""
    }border-color:${props.color ?? "#535353"};border-width:3px\" width=37 height=${props.url ? 48 : 37} src=${
      props.url ?? "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
    } /></div>`,
    size: new navermaps.Size(20, 20),
    anchor: new navermaps.Point(20, 20),
  };

  return <Marker title="Green" icon={icon} {...props} />;
}
