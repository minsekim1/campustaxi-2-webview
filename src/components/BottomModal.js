import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from "recoil";
import { BottomModalState, CreateBottomModalState } from "../components/recoil";
import "react-spring-bottom-sheet/dist/style.css";
import "../style/switch.css";
import { GRAY2, GRAY3, GRAY7, SCREEN_HEIGHT, SCREEN_WIDTH } from "../style";
import { GRAY8, GRAY6 } from "./../style/index";

export const BottomModal = () => {
  const [visible, setVisible] = useRecoilState(BottomModalState);
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
  const [visible, setVisible] = useRecoilState(CreateBottomModalState);
  return (
    <>
      <BottomSheet
        blocking={false}
        open={visible}
        onDismiss={() => setVisible(false)}
        snapPoints={({ minHeight, maxHeight }) => [maxHeight * 0.3, maxHeight * 0.5, maxHeight * 0.7, maxHeight * 0.9]}
        defaultSnap={({ lastSnap, snapPoints }) => [SCREEN_HEIGHT * 0.7]}
      >
        <div style={{ padding: "12px 20px" }}>
          <div>
            <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 17, color: GRAY8, float: "left" }}>
              채팅방을 만들어보세요!
            </div>
            <div
              style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
              onClick={() => setVisible(false)}
            >
              닫기
            </div>
          </div>
          <div style={{ clear: "both", marginTop: 40 }}>
            <input
              inputMode={"text"}
              placeholder="채팅방 이름을 입력해주세요. (미입력시 자동생성)"
              style={{
                width: SCREEN_WIDTH - 60,
                backgroundColor: GRAY2,
                border: "none",
                padding: 10,
                borderRadius: 10,
              }}
            />
            <input
              inputMode={"text"}
              placeholder="출발지를 입력해주세요."
              style={{
                width: SCREEN_WIDTH - 60,
                backgroundColor: GRAY2,
                border: "none",
                padding: 10,
                borderRadius: 10,
              }}
            />
            <input
              inputMode={"text"}
              placeholder="도착지를 입력해주세요."
              style={{
                width: SCREEN_WIDTH - 60,
                backgroundColor: GRAY2,
                border: "none",
                padding: 10,
                borderRadius: 10,
              }}
            />
            <input
              inputMode={"text"}
              placeholder="출발 시간을 선택해주세요."
              style={{
                width: SCREEN_WIDTH - 60,
                backgroundColor: GRAY2,
                border: "none",
                padding: 10,
                borderRadius: 10,
              }}
            />
            {/* 2018-06-12T19:30" */}
            <input type="datetime-local" id="appt" name="appt" value={"2018-06-12T19:30"} />
            <div>
              <label class="switch">
                <input type="checkbox" checked />
                <span class="slider round"></span>
              </label>
              성별무관 탑승
            </div>
            <div>
              인원 제한을 선택해주세요.
              <div>
                <input type="radio" id="personLimit" name="contact" value="personLimit2" />
                <label for="personLimit2">2</label>

                <input type="radio" id="contactChoice2" name="contact" value="personLimit3" />
                <label for="personLimit3">3</label>

                <input type="radio" id="contactChoice3" name="contact" value="personLimit4" checked />
                <label for="personLimit4">4</label>
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};
