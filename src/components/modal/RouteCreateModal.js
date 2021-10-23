import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GRAY7, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../style";
import { GRAY6 } from "./../../style/index";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { commandWindowState, CreateRouteBottomModalState } from "./../recoil";
import { useRef } from "react";
import { Textarea } from "./../Input/index";
import { InputImage } from "./../Input/InputImage";
import { BookmarkBtn } from "../Btn/BookmarkBtn";
import { ProfileCard } from "../card/ProfileCard";
import { CommandArea } from "./../Input/CommandArea";

export const RouteCreateModal = () => {
  const [visibleRoute, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState);
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const bottomRef = useRef();

  // const onClick = (e) => {
  //   // 명령어창이 아닌 추천코스 생성창 터치 시 명령어창 닫기
  //   console.log("outer", e.nativeEvent.target.outerText, e.nativeEvent.target.outerText[0]);
  //   if (e.nativeEvent.target.outerText[0] != "#") setCommandWindow({ ...commandWindow, visible: false, index: -1 });
  // };
  const onScrollCapture = (e) => {
    // 명령어창이 아닌 추천코스 생성창 스크롤 시 명령어창 닫기
    if (e.nativeEvent.target.outerText[0] != "#") setCommandWindow({ ...commandWindow, visible: false, index: -1 });
  };
  return (
    <>
      <BottomSheet
        ref={bottomRef}
        blocking={false}
        open={visibleRoute}
        onDismiss={() => setVisibleRoute(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.995]}
        defaultSnap={({ lastSnap, snapPoints }) => [snapPoints[1]]}
        onScrollCapture={onScrollCapture}
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
          <InputImage placeholder={"배경 사진을 선택해주세요!"} />
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
              <div style={{ marginTop: 6 }}>
                <CommandArea />
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
