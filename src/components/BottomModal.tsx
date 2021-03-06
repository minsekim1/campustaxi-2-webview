import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  BottomModalState,
  ChatRoomListState,
  CreateBottomModalState,
  EndPosImageState,
  endPosState,
  loadingState,
  pathState,
  posInitType,
  StartPosImageState,
  startPosState,
  userDataState,
} from "./recoil";
import "react-spring-bottom-sheet/dist/style.css";
import "../style/switch.css";
import { AbsoluteCenter, GRAY7, ORANGE, SCREEN_HEIGHT, styleCenter } from "../style";
import { GRAY8, GRAY6 } from "../style/index";
import { createRef, useMemo, useRef, useState } from "react";
import { getfetch, postfetch } from "./common";
import { Input, InputMap, InputSearch } from "./Input/index";
import { Switch } from "./Input/switch";
import { Radio } from "./Input/radio";
import { PositionCard } from "./card/PositionCard";
import { RoomCard } from "./card/RoomCard";
import _ from "lodash";
import { RouteType } from "../types/Route";
import { ChatRoomType, posInit } from "../types/ChatRoom";
import KakaoLogin from "react-kakao-login";
import { KaKaoLoginBtn } from "./Btn/LoginBtn";
import useWindowDimensions from "../hook/useWindowDimensions";
import useSWR from "swr";
import { fetcherBlob } from "../hook/useSWR/fetcher";
import { isIOSPublishing } from "../App";

export const BottomModal = () => {
  const [visible, setVisible] = useRecoilState(BottomModalState);

  const [chatRoomList] = useRecoilState(ChatRoomListState); //setChatRoomList
  const [chatRoomListFilterd, setChatRoomListFilterd] = useState([]);
  const filterSearchTxt = useRef("");
  const bottomRef = useRef<any>();
  //#region image
  const { data: image, error } = useSWR("http://218.153.157.69/ftp/2021_11_27_1_03_40_b85518ade0.png", fetcherBlob);
  //#endregion

  const onClickRoom = () => {
    if (bottomRef && bottomRef.current && bottomRef.current.snapTo)
      bottomRef.current.snapTo(() => SCREEN_HEIGHT * 0.4 + 30, {
        source: "custom",
        velocity: 0,
      });
  };

  const onChangeFilterSearchTxt = async (t: string) => {
    if (t.length === 0) {
      setChatRoomListFilterd([]);
    } else {
      const list = await chatRoomList.filter(
        (room: ChatRoomType) =>
          // ?????? ??????????????? ??????
          room.title.includes(t) ||
          (room.start_route && room.start_route.road_address_name && room.start_route.road_address_name.includes(t)) ||
          (room.start_route && room.start_route.place_name && room.start_route.place_name.includes(t)) ||
          (room.start_route && room.start_route.phone.includes(t)) ||
          (room.start_route && room.start_route.address_name && room.start_route.address_name.includes(t)) ||
          (room.start_route && room.start_route.category_name && room.start_route.category_name.includes(t)) ||
          (room.end_route && room.end_route.road_address_name && room.end_route.road_address_name.includes(t)) ||
          (room.end_route && room.end_route.place_name && room.end_route.place_name.includes(t)) ||
          (room.end_route && room.end_route.phone.includes(t)) ||
          (room.end_route && room.end_route.address_name && room.end_route.address_name.includes(t)) ||
          (room.end_route && room.end_route.category_name && room.end_route.category_name.includes(t))
      );
      setChatRoomListFilterd(list);
    }
  };

  const LIST = filterSearchTxt.current.length > 0 ? chatRoomListFilterd : chatRoomList;
  return (
    <>
      <BottomSheet
        ref={bottomRef}
        blocking={false}
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [
          maxHeight * 0.4 + 30,
          maxHeight * 0.5,
          maxHeight * 0.7,
          maxHeight * 0.9,
        ]}
        style={{ zIndex: 9999999999999 }}
        defaultSnap={({ lastSnap, snapPoints }) => SCREEN_HEIGHT * 0.4}
        header={
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY7, float: "left" }}>
              ??? ?????? ???????????? ??????????????????!
            </div>
            <div
              style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
              onClick={() => setVisible(false)}
            >
              ??????
            </div>
          </div>
        }
        expandOnContentDrag={false}
      >
        <div style={{ padding: "0 10px 80px 10px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <InputSearch
              value={filterSearchTxt}
              placeholder={"?????? ????????? ??????????????????."}
              onChange={onChangeFilterSearchTxt}
            />
          </div>

          {chatRoomList.length > 0 ? (
            LIST.map((room, i) => {
              const ref = createRef<any>();
              const handleClick = () => {
                ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
              };
              return (
                <div key={i.toString()} ref={ref}>
                  {/* DB ?????? ????????? */}
                  <RoomCard
                    room={room}
                    onClick={() => {
                      onClickRoom();
                      handleClick();
                      // let timerId = setInterval(handleClick, 100);
                      // setTimeout(() => clearInterval(timerId), 1000);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div style={{ padding: "8px 32px 0" }}>
              <div
                style={{
                  ...AbsoluteCenter,
                  fontSize: 15,
                  textAlign: "center",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  padding: 16,
                  marginTop: 24,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderStyle: "dashed",
                }}
              >
                <div>?????? ????????? ??? ??????</div>
                <div>?????? ???????????? ????????????.</div>
                <div style={{ fontSize: 13, fontWeight: "normal", marginTop: 8 }}>
                  <div>?????? ????????? ????????? ????????? ??????</div>
                  <div>??? ?????????????????? ??????????????????!</div>
                </div>
              </div>
              <img src={image} width={"100%"} />
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
};

//2021-10-05T21:50
const defaultValueDate = new Date().toJSON().split(".")[0];
export const CreateBottomModal = () => {
  const setLoading = useSetRecoilState(loadingState); //loading

  const [visible, setVisible] = useRecoilState(CreateBottomModalState);
  const userData = useRecoilValue(userDataState);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultValueDate);
  const [personLimit, setPersonLimit] = useState(2); //????????? +2
  const [genderLimit, setGenderLimit] = useState(false);

  const [startPos, setStartPos] = useRecoilState(startPosState);
  const startPosImage = useRecoilValue(StartPosImageState);
  const [endPos, setEndPos] = useRecoilState(endPosState);
  const endPosImage = useRecoilValue(EndPosImageState);
  const [path] = useRecoilState(pathState); //setPath
  const [, setChatRoomList] = useRecoilState(ChatRoomListState); //chatRoomList


  const closeCondition = useMemo(
    () => title !== "" || startPos.place_name !== "" || endPos.place_name !== "",
    [title, startPos.place_name, endPos.place_name]
  );
  const postCondition = useMemo(
    () => startPos.place_name !== "" && endPos.place_name !== "" && path.distance > 0,
    [startPos.place_name, endPos.place_name, path.distance]
  );

  const getPostRoute = async (startPos: posInitType, endPos: posInitType) => {
    return new Promise((resolve: (p: { responseStartRoute: RouteType; responseEndRoute: RouteType }) => void) => {
      let responseStartRoute: RouteType | null = null;
      let responseEndRoute: RouteType | null = null;
      postfetch("/routes", {
        ...startPos,
        naver_id: startPos.id,
        x: Number(startPos.x),
        y: Number(startPos.y),
      }).then((d) => {
        responseStartRoute = d;
        if (responseStartRoute !== null && responseEndRoute !== null)
          resolve({ responseStartRoute: responseStartRoute, responseEndRoute: responseEndRoute });
      });
      postfetch("/routes", {
        ...endPos,
        naver_id: endPos.id,
        x: Number(endPos.x),
        y: Number(endPos.y),
      }).then((d) => {
        responseEndRoute = d;
        if (responseStartRoute !== null && responseEndRoute !== null)
          resolve({ responseStartRoute: responseStartRoute, responseEndRoute: responseEndRoute });
      });
    });
    // { responseStartRoute: responseStartRoute, responseEndRoute: responseEndRoute }
  };
  const postCreateChatRoom = async () => {
    if (!postCondition) {
      alert("?????????/?????????/??????????????? ??????????????????.");
    } else {
      setLoading(true);
      const startParam: posInitType = { ...startPos, place_image: startPosImage }
      const endParam: posInitType = { ...endPos, place_image: endPosImage}
      const responseRoute = await getPostRoute(startParam, endParam);
      const response = await postfetch("/chat-rooms", {
        title: title,
        gender: genderLimit ? "M" : "None",
        creator_id: String(userData ? userData.id : 0),
        chat_user: String(userData ? userData.id : 0),
        start_route: responseRoute.responseStartRoute.id,
        end_route: responseRoute.responseEndRoute.id,
        person_limit: personLimit,
        start_at: date,
        path: path.path,
        taxiFare: path.taxiFare,
        distance: path.distance,
        duration: path.duration,
        departureTime: path.departureTime,
        // course_id: 0,
      });
      if (typeof response.id === "number") {
        setTitle("");
        setDate(defaultValueDate);
        setStartPos(posInit);
        setEndPos(posInit);
        setPersonLimit(2);
        setGenderLimit(false);
        setVisible(false);
        // # ?????? ??? ????????????
        getfetch(`/chat-rooms?start_at_gt=${new Date().toISOString()}`).then((d) =>
          setChatRoomList(
            d.map((room: any) => {
              return { ...room, path: _.chunk(_.split(room.path, ","), 2) };
            })
          )
        );
        setLoading(false);
      } else if (response.statusCode === 200) {
        try {
          setLoading(false);
          alert(JSON.stringify(response.data.errors));
        } catch (e) {
          setLoading(false);
          console.debug(e);
        }
      }
    }
  };
  return (
    <>
      <BottomSheet
        blocking={false}
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.3, maxHeight * 0.4, maxHeight * 0.5, maxHeight * 0.7]}
        defaultSnap={({ lastSnap, snapPoints }) => SCREEN_HEIGHT * 0.4}
        expandOnContentDrag={true}
      >
        <div style={{ padding: "12px 20px" }}>
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 17, color: GRAY8, float: "left" }}>
              ???????????? ??????????????????!
            </div>
            <BlockLogin />
            {closeCondition ? (
              <div
                style={{
                  fontFamily: "roboto",
                  fontWeight: "bold",
                  fontSize: 15,
                  color: postCondition ? ORANGE : GRAY6,
                  float: "right",
                }}
                onClick={postCreateChatRoom}
              >
                ??????
              </div>
            ) : (
              <div
                style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
                onClick={() => setVisible(false)}
              >
                ??????
              </div>
            )}
          </div>
          <div style={{ marginTop: 40 }}>
            <div style={{ marginTop: 12 }}>
              {/* <Input
                defaultValue={title}
                onChange={(e) => setTitle(e)}
                placeholder="????????? ????????? ??????????????????. (??????)"
              /> */}
            </div>
            <div style={{ marginTop: 12 }}>
              <InputMap placeholder="???????????? ??????????????????." position={"start"} />
              {startPos.place_name ? (
                <PositionCard
                  address={startPos.address_name}
                  title={startPos.place_name}
                  desc={startPos.category_name}
                  url={startPos.place_url}
                  img={undefined}
                  isStartPos
                  onClickDelete={() => setStartPos(posInit)}
                />
              ) : (
                false
              )}
            </div>
            <div style={{ marginTop: 12 }}>
              <InputMap placeholder="???????????? ??????????????????." position={"end"} />
              {endPos.place_name ? (
                <PositionCard
                  address={endPos.address_name}
                  title={endPos.place_name}
                  desc={endPos.category_name}
                  url={endPos.place_url}
                  img={undefined}
                  isEndPos
                  onClickDelete={() => setEndPos(posInit)}
                />
              ) : (
                false
              )}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: "bold", margin: "0 12px 12px", color: GRAY7 }}>?????? ????????? ??????????????????.</div>
              <Input defaultValue={date} onChange={setDate} type="datetime-local" />
              {/* id="appt" name="appt" */}
            </div>
            <div style={{ marginTop: 0, padding: 8 }}>
              <Switch
                defaultValue={genderLimit}
                title={genderLimit ? "????????????" : "???????????? ??????"}
                onChange={setGenderLimit}
              />
            </div>
            <div style={{ marginTop: 12, color: GRAY7, padding: "0 8px", fontSize: 15 }}>
              ?????? ????????? ??????????????????.
              <div style={{ marginTop: 8 }}>
                <Radio data={[2, 3, 4, 5, 6, 7]} defaultIndex={personLimit} onClick={setPersonLimit} />
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

const BlockLogin = () => {
  const userData = useRecoilValue(userDataState);

  return (
    <>
      {(!userData && !isIOSPublishing) ? (
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
          <div style={{ marginTop: 8, marginBottom: 60 }}>???????????? ????????? ???????????????.</div>
        </div>
      ) : (
        false
      )}
    </>
  );
};
