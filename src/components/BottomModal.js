import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from "recoil";
import {
  BottomModalState,
  ChatRoomListState,
  ChatRoomSeletedState,
  CreateBottomModalState,
  endPosState,
  SearchPositionState,
  startPosState,
} from "../components/recoil";
import "react-spring-bottom-sheet/dist/style.css";
import "../style/switch.css";
import { GRAY2, GRAY3, GRAY7, ORANGE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../style";
import { GRAY8, GRAY6 } from "./../style/index";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { DateToStr } from "./exchange";
import { getfetch, posInit, postfetch } from "./common";
import { Input, InputMap } from "./Input/index";
import { Switch } from "./Input/switch";
import { Radio } from "./Input/radio";
import { PositionCard } from "./card/PositionCard";
import { RoomCard } from "./card/RoomCard";

export const BottomModal = () => {
  const [visible, setVisible] = useRecoilState(BottomModalState);
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);

  const [chatRoomList, setChatRoomList] = useRecoilState(ChatRoomListState);
  const bottomRef = useRef();

  const onClickRoom = () => {
    bottomRef.current.snapTo(SCREEN_HEIGHT * 0.5);
  };

  return (
    <>
      <BottomSheet
        ref={bottomRef}
        blocking={false}
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.3, maxHeight * 0.5, maxHeight * 0.7, maxHeight * 0.9]}
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.4]}
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
        expandOnContentDrag={true}
      >
        <div style={{ padding: "0 10px 30px 10px" }} >
          {chatRoomList.length > 0 &&
            chatRoomList.map((room, i) => {
              const ref = createRef();
              const handleClick = () =>
                ref.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              return (
                <div key={i.toString()} ref={ref}>
                  {/* DB 모든 채팅방 */}
                  <RoomCard room={room} onClick={() => { onClickRoom(); handleClick();}} />
                </div>
              );
            })}
        </div>
      </BottomSheet>
    </>
  );
};

//2021-10-05T21:50
const defaultValueDate = new Date(new Date().setHours(new Date().getHours() + 9)).toISOString().split(".")[0];

export const CreateBottomModal = () => {
  const [visible, setVisible] = useRecoilState(CreateBottomModalState);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultValueDate);
  const [personLimit, setPersonLimit] = useState(2); //보낼때 +2
  const [genderLimit, setGenderLimit] = useState(false);

  const [startPos, setStartPos] = useRecoilState(startPosState);
  const [endPos, setEndPos] = useRecoilState(endPosState);

  const closeCondition = useMemo(
    () => title !== "" || startPos.place_name !== "" || endPos.place_name !== "",
    [title, startPos.place_name, endPos.place_name]
  );
  const postCondition = useMemo(
    () => startPos.place_name !== "" && endPos.place_name !== "",
    [startPos.place_name, endPos.place_name]
  );

  const postCreateChatRoom = async () => {
    if (!postCondition) {
      alert("출발지/도착지/출발시간을 확인해주세요.");
    } else {
      // getfetch("/users").then((d) => console.log(d));
      const response = await postfetch("/chat-rooms", {
        title: title,
        gender: genderLimit ? "M" : "None",
        creator_id: "0",
        chat_user: ["0"],
        "start_route[]": JSON.stringify({
          __component: "route.route",
          ...startPos,
          naver_id: startPos.id,
          x: Number(startPos.x),
          y: Number(startPos.y),
        }),
        "end_route[]": JSON.stringify({
          __component: "route.route",
          ...endPos,
          naver_id: endPos.id,
          x: Number(endPos.x),
          y: Number(endPos.y),
        }),
        person_limit: personLimit + 2,
        start_at: date,
        expect_fee: 0,
        // course_id: 0,
        expect_distance: 0,
      });
      if (typeof response.id == "number") {
        setTitle("");
        setDate(defaultValueDate);
        setStartPos(posInit);
        setEndPos(posInit);
        setPersonLimit(2);
        setGenderLimit(false);
        setVisible(false);
      } else if (response.statusCode == 200) {
        try {
          alert(JSON.stringify(response.data.errors));
        } catch (e) {
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
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.7]}
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
              <InputMap value={startPos} placeholder="출발지를 선택해주세요." position={"start"} />
              {startPos.place_name ? (
                <PositionCard
                  address={startPos.address_name}
                  title={startPos.place_name}
                  desc={startPos.category_name}
                  url={startPos.place_url}
                  img={"https://picsum.photos/200"}
                />
              ) : (
                false
              )}
            </div>
            <div style={{ marginTop: 12 }}>
              <InputMap value={endPos} placeholder="도착지를 선택해주세요." position={"end"} />
              {endPos.place_name ? (
                <PositionCard
                  address={endPos.address_name}
                  title={endPos.place_name}
                  desc={endPos.category_name}
                  url={endPos.place_url}
                  img={"https://picsum.photos/200"}
                />
              ) : (
                false
              )}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: "bold", margin: "0 12px 12px", color: GRAY7 }}>출발 시간을 선택해주세요.</div>
              <Input defaultValue={date} onChange={setDate} type="datetime-local" id="appt" name="appt" />
            </div>
            <div style={{ marginTop: 0, padding: 8 }}>
              <Switch defaultValue={genderLimit} title={"성별무관 탑승"} onChange={setGenderLimit} />
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
