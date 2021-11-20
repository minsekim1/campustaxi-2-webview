import {
  RenderAfterNavermapsLoaded,
  NaverMap,
  Marker,
  // Circle,
  // GroundOverlay,
  // Ellipse,
  Polyline,
} from "react-naver-maps";

import { HEADER_HEIGHT, SCREEN_HEIGHT } from "./../style";
import { useRecoilState } from "recoil";
import {
  BottomModalState,
  ChatRoomListState,
  ChatRoomSeletedState,
  CreateBottomModalState,
  endPosState,
  loadingState,
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
import { PathInfo } from "./PathInfo";
import _ from "lodash";
import useWindowDimensions from "../hook/useWindowDimensions";

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
  const { height, width } = useWindowDimensions();
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  const [searchResult, setSearchResult] = useRecoilState(SearchPosResultState);
  const [visibleCreate, setVisibleCreate] = useRecoilState(CreateBottomModalState);
  const [visible, setVisible] = useRecoilState(BottomModalState);
  const [, setLoading] = useRecoilState(loadingState); //loading

  const [myPos] = useRecoilState(MyPosState); //setMyPos
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
    getfetch("/chat-rooms").then(
      (d) =>
      setChatRoomList(
        d.map((room) => {
          return { ...room, path: _.chunk(_.split(room.path, ","), 2) };
        })
      )
    );
  }, []);

  useEffect(async() => {
    if (endPos.place_name && startPos.place_name) {
      let x1 = Number(startPos.x);
      let y1 = Number(startPos.y);
      let x2 = Number(endPos.x);
      let y2 = Number(endPos.y);
      setBounds(new navermaps.LatLngBounds(new navermaps.LatLng(y1 - 0.04, x1), new navermaps.LatLng(y2 + 0.02, x2)));
      setLoading(true);
      await getPath(x1, y1, x2, y2).then((d) => {
        if (typeof d.distance === "number" && d.distance > 0) setPath(d);
      });
      setLoading(false);
    } else if (startPos.place_name.length > 0 || endPos.place_name.length > 0) {
      const Pos = startPos.place_name.length > 0 ? startPos : endPos;
      setBounds(
        new navermaps.LatLngBounds(
          new navermaps.LatLng(Number(Pos.y) - 0.02, Number(Pos.x)),
          new navermaps.LatLng(Number(Pos.y) + 0.02, Number(Pos.x))
        )
      );
    }
  }, [startPos.place_name, endPos.place_name]);

  useEffect(() => {
    if (chatRoomSeleted.id !== -1 && naverMapRef.current) {
      let x1 = Number(chatRoomSeleted.start_route.x);
      let y1 = Number(chatRoomSeleted.start_route.y);
      let x2 = Number(chatRoomSeleted.end_route.x);
      let y2 = Number(chatRoomSeleted.end_route.y);
      setBounds(new navermaps.LatLngBounds(new navermaps.LatLng(y1 - 0.08, x1), new navermaps.LatLng(y2 + 0.02, x2)));
    }
  }, [chatRoomSeleted]);

  //# 함수
  const onClickMarker = (pos) => {
    if (visibleSearch.position === "start") setStartPos(pos);
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
        width: width, // 네이버지도 가로 길이
        height: SCREEN_HEIGHT - HEADER_HEIGHT - 16, // 네이버지도 세로 길이
        marginTop: 8,
        outline: "none",
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
              position={new navermaps.LatLng(Number(room.start_route.y), Number(room.start_route.x))}
              navermaps={navermaps}
            />
            {/* DB 모든 도착지 */}
            <ImageMarker
              onClick={() => {
                setChatRoomSeleted(room);
                setVisible(true);
              }}
              position={new navermaps.LatLng(Number(room.end_route.y), Number(room.end_route.x))}
              navermaps={navermaps}
            />
          </div>
        ))}
      {/* 출->도 직선경로 */}
      {chatRoomList.length > 0 &&
        chatRoomList
          // .map((room) => room.end_route)
          .map((room, i) => (
            <Polyline
              key={i.toString()}
              path={[
                new navermaps.LatLng(Number(room.start_route.y), Number(room.start_route.x)),
                new navermaps.LatLng(Number(room.end_route.y), Number(room.end_route.x)),
              ]}
              strokeColor={"#FF6E6E"}
              strokeOpacity={0.2}
              strokeWeight={3}
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
      {/* 방 생성 시 출/도 표시 */}
      {(visibleCreate || visibleSearch.position === "end") && startPos.place_name ? (
        <ImageMarker
          url={"/images/startPosIcon.png"}
          position={new navermaps.LatLng(Number(startPos.y), Number(startPos.x))}
          navermaps={navermaps}
        />
      ) : (
        false
      )}
      {(visibleCreate || visibleSearch.position === "start") && endPos.place_name ? (
        <ImageMarker
          url={"/images/endPosIcon.png"}
          position={new navermaps.LatLng(Number(endPos.y), Number(endPos.x))}
          navermaps={navermaps}
        />
      ) : (
        false
      )}
      {/* 출->도 실제 택시경로 */}
      {(startPos.place_name.length > 0 && endPos.place_name.length > 0 && path.distance > 0 && visibleCreate) ||
      (chatRoomSeleted.path.length > 0 && visible) ? (
        <>
          <PathInfo data={path.distance > 0 && visibleCreate ? path : chatRoomSeleted} />
          <Polyline
            path={
              path.distance > 0 && visibleCreate
                ? path.path.map((line) => new navermaps.LatLng(Number(line[1]), Number(line[0])))
                : chatRoomSeleted.path.map((line) => new navermaps.LatLng(Number(line[1]), Number(line[0])))
            }
            strokeColor={"red"}
            strokeOpacity={1}
            strokeWeight={5}
            strokeStyle={"solid"}
            strokeLineCap={"round"}
            strokeLineJoin={"round"}
            startIcon={3}
            startIconSize={20}
            endIcon={1}
            endIconSize={20}
          />
        </>
      ) : (
        false
      )}
    </NaverMap>
  );
}

function ImageMarker(props) {
  const navermaps = props.navermaps;
  const icon = {
    content: `<div onClick=\"${props.onClick}\"><img alt=\" \" style=\"${
      !props.url ? "border-radius:30px;border-style:solid;" : ""
    }border-color:${props.color ?? "#535353"};border-width:3px\" width=37 height=${props.url ? 48 : 37} src=${
      props.url ?? "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
    } /></div>`,
    size: new navermaps.Size(20, 20),
    anchor: new navermaps.Point(20, 20),
  };

  return <Marker title="Green" icon={icon} {...props} />;
}
