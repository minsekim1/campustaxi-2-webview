import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GRAY7, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../style";
import { GRAY6 } from "./../../style/index";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { CreateRouteBottomModalState } from "./../recoil";
import { useRef, useState } from "react";
import { Input, Textarea } from "./../Input/index";
import { InputImage } from "./../Input/InputImage";
import { BookmarkBtn } from "../Btn/BookmarkBtn";
import { ProfileCard } from "../card/ProfileCard";
import { CommandTextarea } from './../Input/CommandTextarea';

export const RouteCreateModal = () => {
  const [visibleRoute, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState);
  // const [title, setTitle] = useState("");
  const bottomRef = useRef();
  return (
    <>
      <BottomSheet
        ref={bottomRef}
        blocking={false}
        open={visibleRoute}
        onDismiss={() => setVisibleRoute(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.5, maxHeight * 0.95]}
        defaultSnap={({ lastSnap, snapPoints }) => [snapPoints[1]]}
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
          <div style={{ padding: "0 16px 80px 16px" }}>
            <div style={{ marginTop: -40 }}>
              <Textarea
                placeholder={"코스 제목을 입력해주세요."}
                style={{
                  border: "none",
                  width: "100%",
                  fontSize: 19,
                  paddingRight: 6,
                  padding: 2,
                  fontFamily: "AppleSDGothic",
                  backgroundColor: "transparent",
                  resize: "none",
                  outline: "none",
                }}
                maxrows={2}
              />
              <div style={{ marginTop: 12 }}>
                <Textarea
                  style={{
                    border: "none",
                    width: "100%",
                    fontSize: 15,
                    paddingRight: 6,
                    fontFamily: "AppleSDGothic",
                    backgroundColor: "transparent",
                    resize: "none",
                    overflow: "hidden",
                    outline: "none",
                  }}
                  maxrows={3}
                  placeholder={"간단한 소개 (최대 3줄)"}
                />
              </div>
              <BookmarkBtn disable />
              <ProfileCard address={"캠퍼스택시"} title={"서울시 강남구"} desc={"팔로워 3,456명"} img={"img"} disable />
              <div style={{ marginTop: 6, padding: "0px 16px" }}>
                <CommandTextarea/>
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
