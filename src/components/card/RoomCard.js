import { GRAY1, GRAY3, GRAY5, GRAY8 } from "../../style";
import { Tag } from "../common/Tag";
import { PositionCard, PositionCardReverse } from "./PositionCard";
import { useRecoilState } from "recoil";
import { ChatRoomSeletedState, userDataState } from "../recoil";
import { prettyDate } from "../common/prettyDate";
import { ChatRoomInit } from "../common";
import { useHistory } from "react-router";
import useWindowDimensions from "../../hook/useWindowDimensions";

export const RoomCard = ({ room, onClick = () => {}, noClick = false }) => {
  const [chatRoomSeleted, setChatRoomSeleted] = useRecoilState(ChatRoomSeletedState);
  const [userData] = useRecoilState(userDataState);

  const enterTag = room ? (room.chat_user ? room.chat_user.length : 0) + "/" + (room.person_limit + 2) : "";
  const genderTag = room ? (room.gender !== "None" ? (room.gender === "M" ? "남자만" : "여자만") : "무관") : "";
  // const dtmTag = new Date(room.start_at).toLocaleString() + "에 출발";
  const dtmTag = room ? prettyDate(room.start_at) + "에 출발" : "";

  const tags = [genderTag, enterTag, dtmTag];
  const history = useHistory();

  let count = 0;
  const isSeleted = room ? chatRoomSeleted.id === room.id : 0;
  const onClickRoom = (isParentBtn) => {
    if (isParentBtn) {
      if (!noClick) {
        onClick();
        if (isSeleted) setChatRoomSeleted(ChatRoomInit);
        else setChatRoomSeleted(room);
      } else {
              if (!userData) {
                alert("로그인 후 입장할 수 있습니다!");
              } else {
                history.push(`chat/${room.id}`);
              }
      }
    } else {
      if (!userData) {
        alert("로그인 후 입장할 수 있습니다!");
      } else {
        history.push(`chat/${room.id}`);
      }
    }
    // if ((noClick && userData) || (userData && !isParentBtn)) {
    //   history.push(`chat/${room.id}`);
    // } else if (!noClick) {
    //   onClick();
    //   if (isSeleted) setChatRoomSeleted(ChatRoomInit);
    //   else setChatRoomSeleted(room);
    // } else {
    //   alert("로그인 후 입장할 수 있습니다!");
    // }
  };
  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: isSeleted && !noClick ? GRAY5 : "#E1E3E5",
        borderStyle: "solid",
        paddingBottom: 16,
        borderRadius: 20,
        marginTop: 16,
        backgroundColor: isSeleted && !noClick ? "white" : GRAY1,
      }}
      onClick={() => onClickRoom(true)}
    >
      <PositionCard
        address={room ? room.end_route.address_name : ""}
        title={room ? room.end_route.place_name : ""}
        desc={room ? room.end_route.category_name : ""}
        url={room ? room.end_route.place_url : ""}
        img={"https://picsum.photos/200"}
      />
      <PositionCardReverse
        address={room ? room.start_route.address_name : ""}
        title={room ? room.start_route.place_name : ""}
        desc={room ? room.start_route.category_name : ""}
        url={room ? room.start_route.place_url : ""}
        img={"https://picsum.photos/200"}
      />
      <div style={{ display: "flex", paddingTop: 6, paddingBottom: 6, marginBottom: -17, marginLeft: 16 }}>
        <div style={{ display: "flex", flex: 7 }}>
          {tags.map((tag, i) => (
            <Tag key={i.toString()} text={tag} index={i} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
            bottom: -6.5,
            right: -0.5,
          }}
          onClick={
            !noClick ? (!userData ? () => alert("로그인 후 입장이 가능합니다!") : () => onClickRoom(false)) : () => {}
          }
        >
          <div
            style={{
              borderRadius: "20px 0px 20px 0px",
              backgroundColor: GRAY3,
              color: GRAY8,
              fontSize: 15,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 90,
            }}
          >
            바로 입장
          </div>
        </div>
      </div>
    </div>
  );
};
