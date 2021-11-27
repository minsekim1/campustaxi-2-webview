import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from "recoil";
import {
  CreateBottomModalState,
  endPosState,
  homeTabIndexState,
  placePosState,
  SearchPositionState,
  SearchPosResultState,
  startPosState,
} from "../components/recoil";
import "react-spring-bottom-sheet/dist/style.css";
import "../style/switch.css";
import { SCREEN_HEIGHT } from "../style";
import { GRAY8, GRAY6 } from "./../style/index";
import { posInit } from "./common";
import { PositionCard } from "./card/PositionCard";
import { useHistory } from "react-router-dom";

export const SelectMapModal = () => {
  // const title = useRef("");
  const [searchResult, setSearchResult] = useRecoilState(SearchPosResultState);
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  const [, setVisibleCreate] = useRecoilState(CreateBottomModalState); //visibleCreate
  const [, setStartPos] = useRecoilState(startPosState); //startPos
  const [, setEndPos] = useRecoilState(endPosState); //endPos
  const [, setPlacePos] = useRecoilState(placePosState); //placePos
  const [, setHomeTabIndex] = useRecoilState(homeTabIndexState); //homeTabIndex
  const history = useHistory();

  const goBackPlace = (pos) => {
    if (visibleSearch.position === "place") {
      if (pos) setPlacePos(pos);
      else setPlacePos(posInit);
      setHomeTabIndex(0);
      history.push("/course");
    }
  };
  const onDismiss = () => {
    setSearchResult({ documents: [posInit], meta: { is_end: true, pageable_count: -1, total_count: -1 } });
    setVisibleSearch({ visible: false, position: "" });
    setVisibleCreate(true);
    goBackPlace();
  };

  const onClick = (pos) => {
    if (visibleSearch.position === "start") setStartPos(pos);
    else if (visibleSearch.position === "end") setEndPos(pos);
    setSearchResult({ documents: [posInit], meta: { is_end: true, pageable_count: -1, total_count: -1 } });
    setVisibleSearch({ visible: false, position: "" });
    setVisibleCreate(true);
    goBackPlace(pos);
  };
  return (
    <>
      <BottomSheet
        blocking={false}
        open={visibleSearch.visible}
        onDismiss={onDismiss}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.2, maxHeight * 0.5, maxHeight * 0.7, maxHeight * 0.9]}
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.2]}
        header={
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 17, color: GRAY8, float: "left" }}>
              검색 결과
            </div>
            <div
              style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
              onClick={onDismiss}
            >
              닫기
            </div>
          </div>
        }
        expandOnContentDrag={true}
      >
        <div style={{ padding: "12px 20px" }}>
          <div>
            {searchResult.documents[0] !== posInit &&
              searchResult.documents.map((pos, i) => (
                <PositionCard
                  key={i.toString()}
                  address={pos.address_name}
                  title={pos.place_name}
                  desc={pos.category_name}
                  url={pos.place_url}
                  img={"https://picsum.photos/200"}
                  onClick={() => onClick(pos)}
                />
              ))}
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
