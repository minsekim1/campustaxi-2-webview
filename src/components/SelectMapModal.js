import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from "recoil";
import {
  BottomModalState,
  CreateBottomModalState,
  endPosState,
  SearchPositionState,
  SearchPosResultState,
  startPosState,
} from "../components/recoil";
import "react-spring-bottom-sheet/dist/style.css";
import "../style/switch.css";
import { GRAY2, GRAY3, GRAY7, ORANGE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../style";
import { GRAY8, GRAY6 } from "./../style/index";
import { useRef, useState } from "react";
import { DateToStr } from "./exchange";
import { getfetch, posInit, postfetch } from "./common";
import { Input, InputMap } from "./Input/index";
import { Switch } from "./Input/switch";
import { Radio } from "./Input/radio";
import { PositionCard } from './card/PositionCard';

export const SelectMapModal = () => {
  // const title = useRef("");
  const [searchResult, setSearchResult] = useRecoilState(SearchPosResultState);
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  const [visibleCreate, setVisibleCreate] = useRecoilState(CreateBottomModalState);
  const [startPos, setStartPos] = useRecoilState(startPosState);
  const [endPos, setEndPos] = useRecoilState(endPosState);

  const onDismiss = () => {
    setSearchResult({ documents: [posInit], meta: { is_end: true, pageable_count: -1, total_count: -1 } });
    setVisibleSearch({ visible: false, position: "" });
    setVisibleCreate(true);
  };

  const onClick = (pos) => {
    if (visibleSearch.position == "start") setStartPos(pos);
    else setEndPos(pos);
    setSearchResult({ documents: [posInit], meta: { is_end: true, pageable_count: -1, total_count: -1 } });
    setVisibleSearch({ visible: false, position: "" });
    setVisibleCreate(true);
  };
  return (
    <>
      <BottomSheet
        blocking={false}
        open={visibleSearch.visible}
        onDismiss={onDismiss}
        snapPoints={({ minHeight, maxHeight }) => [
          maxHeight * 0.1,
          maxHeight * 0.3,
          maxHeight * 0.5,
          maxHeight * 0.7,
          maxHeight * 0.9,
        ]}
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.4]}
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
            {searchResult.documents[0] != posInit &&
              searchResult.documents.map((pos, i) => (
                <PositionCard
                  key={i.toString()}
                  address={pos.address_name}
                  title={pos.place_name}
                  desc={pos.category_name}
                  url={pos.place_url}
                  img={"https://picsum.photos/200"}
                  onClick={()=>onClick(pos)}
                />
              ))}
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
