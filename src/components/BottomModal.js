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

export const BottomModal = () => {
  const [visible, setVisible] = useRecoilState(BottomModalState);
  const [searchMode, setSearchMode] = useRecoilState(SearchPositionState);
  return (
    <>
      <BottomSheet
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.8, maxHeight]}
        defaultSnap={({ lastSnap, snapPoints }) => [snapPoints]}
      >
        <div>
          <p>검색</p>
          <div>
            <div className="bg-gray-200 block rounded-md h-10 w-full my-10" />
            <p>The height adjustment is done automatically, it just works™!</p>
            <div className="bg-gray-200 block rounded-md h-10 w-full my-10" />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
export const CreateBottomModal = () => {
  const title = useRef("");
  const startPos = useRef(posInit);
  const endPos = useRef(posInit);
  const date = useRef(new Date());
  const genderLimit = useRef(false);
  const personLimit = useRef(4);
  const [visible, setVisible] = useRecoilState(CreateBottomModalState);

  const closeCondition = title !== "" || startPos.title !== "" || endPos.title !== "";
  const postCondition = startPos.title !== "" && endPos.title !== "" && date !== "";

  const postCreateChatRoom = async () => {
    if (!postCondition) {
      alert("출발지/도착지/출발시간을 확인해주세요.");
    } else {
      // getfetch("/users").then((d) => console.log(d));
      // const response = await postfetch("/chat-rooms", {
      //   gender: genderLimit ? "M" : "None",
      //   creator_id: "0",
      //   chat_user: ["0"],
      //   "start_route[]": JSON.stringify({
      //     __component: "route.route",
      //     address: startPos.address,
      //     address_detail: startPos.addressDetail,
      //     lat: startPos.lat,
      //     lon: startPos.lon,
      //     address_code: startPos.addressCode,
      //     title: startPos.title,
      //   }),
      //   "end_route[]": JSON.stringify({
      //     __component: "route.route",
      //     address: endPos.address,
      //     address_detail: endPos.addressDetail,
      //     lat: endPos.lat,
      //     lon: endPos.lon,
      //     address_code: endPos.addressCode,
      //     title: endPos.title,
      //   }),
      //   person_limit: personLimit,
      //   start_at: date,
      //   expect_fee: 0,
      //   course_id: 0,
      //   expect_distance: 0,
      // });
      // if (typeof response.id == "number") {
      //   title.current = "";
      //   startPos.current = posInit;
      //   endPos.current = posInit;
      //   date.current = "";
      //   personLimit.current = 4;
      //   genderLimit.current = false;
      //   setVisible(false);
      // }
    }
  };
  return (
    <>
      <BottomSheet
        blocking={false}
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [
          maxHeight * 0.1,
          maxHeight * 0.3,
          maxHeight * 0.5,
          maxHeight * 0.7,
          maxHeight * 0.9,
        ]}
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.7]}
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
          <div style={{ clear: "both", marginTop: 40 }}>
            <Input value={title} placeholder="채팅방 이름을 입력해주세요. (미입력시 자동생성)" />
            <InputMap value={startPos} placeholder="출발지를 선택해주세요." />
            <InputMap value={endPos} placeholder="도착지를 선택해주세요." />
            출발 시간을 선택해주세요.
            <Input type="datetime-local" id="appt" name="appt" value={date} />
            <Switch value={genderLimit} title={"성별무관 탑승"} />
            인원 제한을 선택해주세요.
            <Radio value={[2, 3, 4, 5, 6, 7, 8]} initIndex={2} />
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
