import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GRAY7 } from "../../style";
import { GRAY6 } from "../../style/index";
import { useRecoilState } from "recoil";
import {
  commandInputListState,
  commandWindowState,
  CreateRouteBottomModalState,
  FilePathInit,
  loadingState,
} from "../recoil";
import { useEffect, useMemo, useRef, useState } from "react";
import { Textarea } from "../Input/index";
import { InputImage } from "../Input/InputImage";
import { BookmarkBtn } from "../Btn/BookmarkBtn";
import { ProfileCard } from "../card/ProfileCard";
import { CommandArea } from "../Input/CommandArea";
import { FilePathState } from "./../recoil";
import { ORANGE } from "./../../style/index";
import { postfetch } from "../common";
import { getItems } from "./../Input/CommandInput/dndFunc";

export const CourseCreateModal = () => {
  const [, setLoading] = useRecoilState(loadingState); //loading
  const [visibleRoute, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState);
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [filepath, setFilepath] = useRecoilState(FilePathState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [CloseData, setCloseData] = useState({ text: "닫기", BtnColor: GRAY6, type: 0 });
  const bottomRef = useRef();
  const titleRef = useRef("");
  const descRef = useRef("");

  // const onClick = (e) => {
  //   // 명령어창이 아닌 추천코스 생성창 터치 시 명령어창 닫기
  //   console.debug("outer", e.nativeEvent.target.outerText, e.nativeEvent.target.outerText[0]);
  //   if (e.nativeEvent.target.outerText[0] != "#") setCommandWindow({ ...commandWindow, visible: false, index: -1 });
  // };
  const onScrollCapture = (e) => {
    // 명령어창이 아닌 추천코스 생성창 스크롤 시 명령어창 닫기
    if (e.nativeEvent.target.outerText[0] !== "#") setCommandWindow({ ...commandWindow, visible: false, index: -1 });
  };

  //#region 닫기 or 생성
  useEffect(() => {
    // 배경 사진이 있거나 내용이 있을경우("text" and content) or others 회색 "생성" 버튼으로
    if (
      (filepath.file !== "" && filepath.type === "CourseCreateMainImg") ||
      commandInputList[0].content !== "" ||
      commandInputList[0].type !== "text"
    ) {
      if (filepath.file === "" && filepath.type === "") setCloseData({ text: "생성", BtnColor: GRAY6, type: 1 });
      else if (commandInputList[0].content === "" && commandInputList[0].type === "text")
        setCloseData({ text: "생성", BtnColor: GRAY6, type: 2 });
      else setCloseData({ text: "생성", BtnColor: ORANGE, type: 3 });
    } else if (CloseData.type !== 0) setCloseData({ text: "닫기", BtnColor: GRAY6, type: 0 });
  }, [filepath.file, commandInputList[0].content, commandInputList[0].type]);

  const onClickClose = () => {
    switch (CloseData.type) {
      case 0:
        setVisibleRoute(false);
        break;
      case 1:
        alert("[필수] 배경 사진을 선택해주세요.");
        break;
      case 2:
        alert("[필수] 내용을 입력해주세요.");
        break;
      default:
        if (titleRef.current.value === "") {
          alert("코스 제목을 입력해주세요.");
          break;
        } else if (descRef.current.value === "") {
          alert("간단한 소개를 입력해주세요.");
          break;
        } else {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            titleRef.current.value = "";
            descRef.current.value = "";
            setFilepath(FilePathInit);
            setCommandInputList(getItems(1));
            alert("생성완료~!")
          }, 1000);
          // postfetch("/course", {
          //   title: titleRef.current.value,
          //   description: descRef.current.value,
          //   creator_id: "0",
          //   image: filepath.file,
          //   content: JSON.stringify(commandInputList),
          // })
          //   .then((d) => {
          //     console.log(d);
          //   })
          //   .finally(() => setLoading(false));
        }
        break;
    }
  };
  //#endregion
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
              style={{
                fontFamily: "roboto",
                fontWeight: "bold",
                fontSize: 15,
                color: CloseData.BtnColor,
                float: "right",
              }}
              onClick={onClickClose}
            >
              {CloseData.text}
            </div>
          </div>
        }
        expandOnContentDrag={false}
      >
        <div>
          <InputImage placeholder={"배경 사진을 선택해주세요!"} />
          <div style={{ padding: "0 16px 80px 16px" }}>
            <div style={{ marginTop: -30 }}>
              <Textarea
                ref={titleRef}
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
                  ref={descRef}
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
