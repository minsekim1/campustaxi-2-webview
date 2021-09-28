import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from "recoil";
import { BottomModalState, CreateBottomModalState, SearchPositionState } from "../components/recoil";
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

export const SelectMapModal = () => {
  // const title = useRef("");
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  return (
    <>
      <BottomSheet
        blocking={false}
        open={visibleSearch}
        onDismiss={() => setVisibleSearch(false)}
        snapPoints={({ minHeight, maxHeight }) => [
          maxHeight * 0.1,
          maxHeight * 0.3,
          maxHeight * 0.5,
          maxHeight * 0.7,
          maxHeight * 0.9,
        ]}
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.4]}
      >
        <div style={{ padding: "12px 20px" }}>
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 17, color: GRAY8, float: "left" }}>
              검색 결과
            </div>
            <div
              style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
              onClick={() => setVisibleSearch(false)}
            >
              닫기
            </div>
          </div>
          <div style={{ clear: "both", marginTop: 40 }}></div>
        </div>
      </BottomSheet>
    </>
  );
};
