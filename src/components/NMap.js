import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps"; // 패키지 불러오기
import { HEADER_HEIGHT, SCREEN_HEIGHT } from "./../style";
import { SCREEN_WIDTH } from "./../style/index";
import { useRecoilState } from "recoil";
import { CreateBottomModalState, endPosState, MyPosState, SearchPositionState, SearchPosResultState, startPosState } from "./recoil";
import { useRef } from "react";
import { posInit } from "./common";

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
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  const [searchResult, setSearchResult] = useRecoilState(SearchPosResultState);
  const [visibleCreate, setVisibleCreate] = useRecoilState(CreateBottomModalState);
  const [myPos, setMyPos] = useRecoilState(MyPosState);
  const [startPos, setStartPos] = useRecoilState(startPosState);
  const [endPos, setEndPos] = useRecoilState(endPosState);

  const naverMapRef = useRef();
  const navermaps = window.naver.maps;
  const onDrag = (d) => {
    // setMyPos({ lat: d.latlng._lat, lng: d.latlng._lng });
  };
  const onClickMarker = (pos) => {
    if (visibleSearch.position == "start") setStartPos(pos);
    else setEndPos(pos);
    setSearchResult({ documents: [posInit], meta: { is_end: true, pageable_count: -1, total_count: -1 } });
    setVisibleCreate(true);
    setVisibleSearch({ visible: false, position: "" });
  };
  return (
    <NaverMap
      ref={naverMapRef}
      mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
      style={{
        width: SCREEN_WIDTH, // 네이버지도 가로 길이
        height: SCREEN_HEIGHT - HEADER_HEIGHT, // 네이버지도 세로 길이
      }}
      defaultCenter={myPos} // 지도 초기 위치
      onDrag={onDrag} // TEST CODE
      defaultZoom={13} // 지도 초기 확대 배율
    >
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
