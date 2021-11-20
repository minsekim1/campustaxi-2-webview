import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from "recoil";
import {
  BottomModalState,
  ChatRoomListState,
  CreateBottomModalState,
  endPosState,
  loadingState,
  pathState,
  posInitType,
  startPosState,
} from "./recoil";
import "react-spring-bottom-sheet/dist/style.css";
import "../style/switch.css";
import { GRAY7, ORANGE, SCREEN_HEIGHT } from "../style";
import { GRAY8, GRAY6 } from "../style/index";
import { createRef, useMemo, useRef, useState } from "react";
import { getfetch, posInit, postfetch } from "./common";
import { Input, InputMap, InputSearch } from "./Input/index";
import { Switch } from "./Input/switch";
import { Radio } from "./Input/radio";
import { PositionCard } from "./card/PositionCard";
import { RoomCard } from "./card/RoomCard";
import _ from "lodash";
import { RouteType } from "../types/Route";
import { ChatRoomType } from "../types/ChatRoom";

export const BottomModal = () => {
  const [visible, setVisible] = useRecoilState(BottomModalState);

  const [chatRoomList] = useRecoilState(ChatRoomListState); //setChatRoomList
  const [chatRoomListFilterd, setChatRoomListFilterd] = useState([]);
  const filterSearchTxt = useRef("");
  const bottomRef = useRef<any>();

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
          // 추후 방장이름도 추가
          room.title.includes(t) ||
          room.start_route.road_address_name.includes(t) ||
          room.start_route.place_name.includes(t) ||
          room.start_route.phone.includes(t) ||
          room.start_route.address_name.includes(t) ||
          room.start_route.category_name.includes(t) ||
          room.end_route.road_address_name.includes(t) ||
          room.end_route.place_name.includes(t) ||
          room.end_route.phone.includes(t) ||
          room.end_route.address_name.includes(t) ||
          room.end_route.category_name.includes(t)
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
        style={{zIndex:9999999999999}}
        defaultSnap={({ lastSnap, snapPoints }) => SCREEN_HEIGHT * 0.4}
        header={
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY7, float: "left" }}>
              더 많은 채팅방을 검색해보세요!
            </div>
            <div
              style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
              onClick={() => setVisible(false)}
            >
              닫기
            </div>
          </div>
        }
        expandOnContentDrag={false}
      >
        <div style={{ padding: "0 10px 80px 10px",  }}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <InputSearch
              value={filterSearchTxt}
              placeholder={"검색 장소를 입력해주세요."}
              onChange={onChangeFilterSearchTxt}
            />
          </div>
          {chatRoomList.length > 0 &&
            LIST.map((room, i) => {
              const ref = createRef<any>();
              const handleClick = () => {
                ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
              };
              return (
                <div key={i.toString()} ref={ref}>
                  {/* DB 모든 채팅방 */}
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
            })}
        </div>
      </BottomSheet>
    </>
  );
};

//2021-10-05T21:50
const defaultValueDate = new Date().toJSON().split(".")[0];
export const CreateBottomModal = () => {
  const [, setLoading] = useRecoilState(loadingState); //loading
  const [visible, setVisible] = useRecoilState(CreateBottomModalState);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultValueDate);
  const [personLimit, setPersonLimit] = useState(2); //보낼때 +2
  const [genderLimit, setGenderLimit] = useState(false);

  const [startPos, setStartPos] = useRecoilState(startPosState);
  const [endPos, setEndPos] = useRecoilState(endPosState);
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
      alert("출발지/도착지/출발시간을 확인해주세요.");
    } else {
      setLoading(true);
      const responseRoute = await getPostRoute(startPos, endPos);
      const response = await postfetch("/chat-rooms", {
        title: title,
        gender: genderLimit ? "M" : "None",
        creator_id: "0",
        chat_user: ["0"],
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
        // # 새로 방 업데이트
        getfetch("/chat-rooms").then((d) =>
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
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.3, maxHeight * 0.5, maxHeight * 0.7, maxHeight * 0.9]}
        defaultSnap={({ lastSnap, snapPoints }) => SCREEN_HEIGHT * 0.7}
        expandOnContentDrag={true}
      >
        <div style={{ padding: "12px 20px" }}>
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 17, color: GRAY8, float: "left" }}>
              채팅방을 만들어보세요!
            </div>
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
                생성
              </div>
            ) : (
              <div
                style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
                onClick={() => setVisible(false)}
              >
                닫기
              </div>
            )}
          </div>
          <div style={{ marginTop: 40 }}>
            <div style={{ marginTop: 12 }}>
              <Input defaultValue={title} onChange={setTitle} placeholder="채팅방 이름을 입력해주세요. (선택)" />
            </div>
            <div style={{ marginTop: 12 }}>
              <InputMap placeholder="출발지를 선택해주세요." position={"start"} />
              {startPos.place_name ? (
                <PositionCard
                  address={startPos.address_name}
                  title={startPos.place_name}
                  desc={startPos.category_name}
                  url={startPos.place_url}
                  img={"https://picsum.photos/200"}
                  onClickDelete={() => setStartPos(posInit)}
                />
              ) : (
                false
              )}
            </div>
            <div style={{ marginTop: 12 }}>
              <InputMap placeholder="도착지를 선택해주세요." position={"end"} />
              {endPos.place_name ? (
                <PositionCard
                  address={endPos.address_name}
                  title={endPos.place_name}
                  desc={endPos.category_name}
                  url={endPos.place_url}
                  img={"https://picsum.photos/200"}
                  onClickDelete={() => setEndPos(posInit)}
                />
              ) : (
                false
              )}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: "bold", margin: "0 12px 12px", color: GRAY7 }}>출발 시간을 선택해주세요.</div>
              <Input defaultValue={date} onChange={setDate} type="datetime-local" />
              {/* id="appt" name="appt" */}
            </div>
            <div style={{ marginTop: 0, padding: 8 }}>
              <Switch
                defaultValue={genderLimit}
                title={genderLimit ? "성별제한" : "성별무관 탑승"}
                onChange={setGenderLimit}
              />
            </div>
            <div style={{ marginTop: 12, color: GRAY7, padding: "0 8px", fontSize: 15 }}>
              인원 제한을 선택해주세요.
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
