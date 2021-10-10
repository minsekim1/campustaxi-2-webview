import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GRAY7, SCREEN_HEIGHT } from "../../style";
import { GRAY6 } from "./../../style/index";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { CreateRouteBottomModalState } from "./../recoil";
import { useRef, useState } from "react";
import { Input, Textarea } from "./../Input/index";
import { InputImage } from "./../Input/InputImage";

export const RouteCreateModal = () => {
  const [visibleRoute, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState);
  const [title, setTitle] = useState("");
  const bottomRef = useRef();
  return (
    <>
      <BottomSheet
        ref={bottomRef}
        blocking={false}
        open={visibleRoute}
        onDismiss={() => setVisibleRoute(false)}
        snapPoints={({ minHeight, maxHeight }) => [
          maxHeight * 0.4 + 30,
          maxHeight * 0.5,
          maxHeight * 0.7,
          maxHeight * 0.9,
        ]}
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.9]}
        header={
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY7, float: "left" }}>
              추천 코스를 만들어보세요!
            </div>
            <div
              style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
              onClick={() => setVisibleRoute(false)}
            >
              닫기
            </div>
          </div>
        }
        expandOnContentDrag={false}
      >
        <div>
          <InputImage />
          <div style={{ padding: "0 10px 80px 10px" }}>
            <div style={{ marginTop: 24 }}>
              <div style={{ marginTop: 12 }}>
                <Input defaultValue={title} onChange={setTitle} placeholder="메인 타이틀을 입력해주세요." />
              </div>
              <div style={{ marginTop: 12 }}>
                <Textarea placeholder={"상세 내용을 입력해주세요."} />
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
