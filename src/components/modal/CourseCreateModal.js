import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { GRAY7, SCREEN_HEIGHT, styleCenter } from "../../style";
import { GRAY6 } from "../../style/index";
import { useRecoilState } from "recoil";
import {
  commandInputListState,
  commandWindowState,
  CreateRouteBottomModalState,
  FilePathInit,
  loadingState,
  userDataState,
} from "../recoil";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "../Input/index";
import { InputImage } from "../Input/InputImage";
import { CourseActionField } from "../Btn/CourseActionField";
import { ProfileCard } from "../card/ProfileCard";
import { CommandArea } from "../Input/CommandArea";
import { FilePathState } from "./../recoil";
import { ORANGE } from "./../../style/index";
import { getItems } from "./../Input/CommandInput/dndFunc";
import { API_URL, postfetch } from "../common";
import axios from "axios";
import { KaKaoLoginBtn } from "../Btn/LoginBtn";

//#region 파일업로드시 Blob to File
const dataURLtoFile = (dataurl, fileName) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};
//#endregion

export const CourseCreateModal = () => {
  const [userData] = useRecoilState(userDataState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [visibleRoute, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState);
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [filepath, setFilepath] = useRecoilState(FilePathState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [CloseData, setCloseData] = useState({ text: "닫기", BtnColor: GRAY6, type: 0 });
  const bottomRef = useRef();
  const titleRef = useRef("");
  const descRef = useRef("");

  //#region 닫기 / 생성 버튼 색이랑 문구 변경
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
  }, [filepath.file, CloseData.type, commandInputList, filepath.type]);
  //#endregion
  //#region 명령어창이 아닌 추천코스 생성창 스크롤 시 명령어창 닫기
  const onScrollCapture = (e) => {
    if (e.nativeEvent.target.outerText[0] === "배") setCommandWindow({ ...commandWindow, visible: false, index: -1 });
  };
  //#endregion
  //#region 코스생성 닫기 or 생성하기 onPress
  const onClickClose = async () => {
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
        } else if (loading) {
          alert("업로드 진행 중입니다. 잠시만 기다려주세요.");
          break;
        } else {
          setLoading(true);
          //#region 태그 생성 및 반환 아이디 가져오기.
          const tagCommand = commandInputList.filter((t) => t.type === "tag");
          const tagList = _.flatten(tagCommand.map((t) => t.content.tagList));
          async function postTagList() {
            if (tagCommand.length > 0) {
              let tagIdList = [];
              return new Promise((resolve) => {
                let count = 0;
                tagList.map((v, i) => {
                  axios.get(`${API_URL}/tags?name=${v.text}`).then((d) => {
                    // 없으면 태그 생성 후 id 가져오기
                    if (d.data.length === 0) {
                      axios.post(`${API_URL}/tags`, { name: v.text }).then((d) => {
                        tagIdList.push(Number(d.data.id));
                        count++;
                        if (count === tagList.length) resolve(tagIdList);
                      });
                      // 있으면 태그 id 가져오기
                    } else {
                      tagIdList.push(Number(d.data[0].id));
                      count++;
                      if (count === tagList.length) resolve(tagIdList);
                    }
                  });
                });
              });
            }
          }
          const tagIdList = await postTagList();
          //#endregion
          //#region 이미지넣기

          const data = new FormData();

          // 메인사진
          const split = filepath && filepath.type ? filepath.type.split("/") : [];
          const filename = new Date().getTime().toString() + "." + split.length > 0 ? split[1] : split[0];
          data.append("files", dataURLtoFile(filepath.file, filename));

          // 코스첨부사진들
          await commandInputList
            .filter((item) => item.type === "image")
            .map((item, i) => {
              data.append("files", dataURLtoFile(item.content.file, filename + i));
            });
          //#endregion
          //#region 업로드=> 1.이미지 업로드
          axios.post(`${API_URL}/upload`, data).then(async (d) => {
            const imgId = d.data[0].id;
            alert(titleRef.current.value)
            const dataCourse = {
              title: titleRef.current.value,
              description: descRef.current.value,
              creator_id: String(userData ? userData.id : 0),
              images: [imgId],
              content: JSON.stringify(commandInputList),
              tags: tagIdList,
            };
            // 2. 코스 업로드
            postfetch("/courses", JSON.stringify(dataCourse), true)
              .then((d) => {
                setLoading(false);
                titleRef.current.value = "";
                descRef.current.value = "";
                setFilepath(FilePathInit);
                setCommandInputList(getItems(1));
              })
              .catch((e) => {
                setLoading(false);
                setVisibleRoute(false);
              });
          });
          //#endregion
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
          <BlockLogin />
          <InputImage placeholder={"배경 사진을 선택해주세요!"} />
          <div style={{ padding: "0 16px 80px 16px" }}>
            <div>
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
              <CourseActionField disable />
              <ProfileCard address={"같이타자"} title={"서울시 강남구"} desc={"팔로워 3,456명"} img={"img"} disable />
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

const BlockLogin = () => {
  const [userData] = useRecoilState(userDataState);

  return (
    <>
      {!userData ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(255,255,255,0.6)",
            ...styleCenter,
            zIndex: 3,
            flexDirection: "column",
          }}
        >
          <KaKaoLoginBtn width={256} />
          <div style={{ marginTop: 8, marginBottom: 60 }}>로그인이 필요한 기능입니다.</div>
        </div>
      ) : (
        false
      )}
    </>
  );
};
