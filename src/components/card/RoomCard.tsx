import { GRAY1, GRAY3, GRAY5, GRAY8 } from "../../style";
import { Tag } from "../common/Tag";
import { PositionCard, PositionCardReverse } from "./PositionCard";
import { useRecoilState } from "recoil";
import { ChatRoomSeletedState, userDataState } from "../recoil";
import { prettyDate } from "../common/prettyDate";
import { useHistory } from "react-router";
import { ChatRoomInit, ChatRoomType } from "../../types/ChatRoom";
import useWindowDimensions from "../../hook/useWindowDimensions";
import useSWR from "swr";

type Props = {
  room: ChatRoomType;
  onClick?: () => void;
  noClick?: boolean;
};

export const RoomCard = ({ room, onClick = () => {}, noClick = false }: Props) => {
  const [chatRoomSeleted, setChatRoomSeleted] = useRecoilState(ChatRoomSeletedState);
  const [userData] = useRecoilState(userDataState);

  const enterTag = room ? (room.enter_users ? room.enter_users.length : 0) + "/" + (room.person_limit + 2) : "";
  const genderTag = room ? (room.gender !== "None" ? (room.gender === "M" ? "남자만" : "여자만") : "무관") : "";
  // const dtmTag = new Date(room.start_at).toLocaleString() + "에 출발";
  const dtmTag = room ? prettyDate(room.start_at) + "에 출발" : "";

  const tags = [genderTag, enterTag, dtmTag];
  const history = useHistory();

  const isSeleted = room ? chatRoomSeleted.id === room.id : 0;
  const onClickRoom = (isParentBtn: boolean) => {
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

  const { height, width } = useWindowDimensions();
  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: isSeleted && !noClick ? GRAY5 : "#E1E3E5",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        marginTop: 16,
        backgroundColor: isSeleted && !noClick ? "white" : GRAY1,
        height: "88%",
        alignItems: "center",
      }}
      onClick={() => onClickRoom(true)}
    >
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          width: "92%",
        }}
      >
        <PositionCard
          address={room && room.end_route && room.end_route.address_name ? room.end_route.address_name : ""}
          title={room && room.end_route && room.end_route.place_name ? room.end_route.place_name : ""}
          desc={room && room.end_route && room.end_route.category_name ? room.end_route.category_name : ""}
          url={room && room.end_route && room.end_route.place_url ? room.end_route.place_url : ""}
          img={"https://picsum.photos/200"}
          padding={"0"}
        />
      </div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          width: "92%",
        }}
      >
        <PositionCardReverse
          padding={"0"}
          address={room.start_route && room.start_route.address_name ? room.start_route.address_name : ""}
          title={room.start_route && room.start_route.place_name ? room.start_route.place_name : ""}
          desc={room.start_route && room.start_route.category_name ? room.start_route.category_name : ""}
          url={room.start_route && room.start_route.place_url ? room.start_route.place_url : ""}
          img={"https://picsum.photos/200"}
        />
      </div>
      <div
        style={{
          display: "flex",
          height: 32,
          paddingTop: 6,
          paddingBottom: 6,
          marginLeft: 16,
          alignItems: "flex-end",
          width: width - 50,
        }}
      >
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
              height: 22,
            }}
          >
            바로 입장
          </div>
        </div>
      </div>
    </div>
  );
};
