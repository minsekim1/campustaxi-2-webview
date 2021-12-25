import { GRAY1, GRAY3, GRAY5, GRAY8 } from "../../style";
import { Tag } from "../common/Tag";
import { PositionCard, PositionCardReverse } from "./PositionCard";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ChatRoomSeletedState, loadingState, userDataState } from "../recoil";
import { prettyDate } from "../common/prettyDate";
import { useHistory } from "react-router";
import { ChatRoomInit, ChatRoomType } from "../../types/ChatRoom";
import useWindowDimensions from "../../hook/useWindowDimensions";
import useSWR from "swr";
import { getfetch, postfetch } from "../common";
import { UserType } from "../../types/User";

type Props = {
  room: ChatRoomType;
  onClick?: () => void;
  noClick?: boolean;
  style?: object;
  showEnterBtn?: boolean;
};

export const RoomCard = ({ room, onClick = () => {}, noClick = false, style, showEnterBtn = true }: Props) => {
  const [chatRoomSeleted, setChatRoomSeleted] = useRecoilState(ChatRoomSeletedState);
  const loading = useRecoilValue(loadingState);
  const setLoading = useSetRecoilState(loadingState);
  const userData = useRecoilValue(userDataState);

  const enterTag = room ? (room.enter_users ? room.enter_users.length : 0) + "/" + (room.person_limit + 2) : "";
  const genderTag = room ? (room.gender !== "None" ? (room.gender === "M" ? "남자만" : "여자만") : "무관") : "";
  // const dtmTag = new Date(room.start_at).toLocaleString() + "에 출발";
  const dtmTag = room ? prettyDate(room.start_at) + "에 출발" : "";

  const tags = [genderTag, enterTag, dtmTag];
  const history = useHistory();

  const isSeleted = room ? chatRoomSeleted.id === room.id : 0;
  const onClickRoom = (isParentBtn: boolean, e: any) => {
    e.stopPropagation();
    if (loading) {
      alert("로딩 중입니다. 잠시만 기다려주세요!");
      return;
    }

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
        setLoading(true);
        getfetch(`/chat-rooms?id=${room.id}`).then(async (d: ChatRoomType[]) => {
          const chatroom = d[0];
          const oldUserList = chatroom.enter_users.map((u: UserType) => u.id);
          if (chatroom.enter_users.length < chatroom.person_limit + 2 || oldUserList.includes(userData.id)) {
            postfetch(
              `/chat-rooms/${chatroom.id}`,
              JSON.stringify({
                enter_users: [...oldUserList, userData.id],
              }),
              true,
              "PUT"
            ).then((d) => {
              history.push(`chat/${room.id}`);
              setLoading(false);
            });
          } else {
            alert("이미 가득찬 방입니다.");
          }
        });
      }
    }
  };
  return (
    <div
      style={
        style
          ? style
          : {
              borderWidth: 1,
              borderColor: isSeleted && !noClick ? GRAY5 : "#E1E3E5",
              borderStyle: "solid",
              display: "flex",
              flexDirection: "column",
              borderRadius: 20,
              marginTop: 8,
              paddingTop: 8,
              backgroundColor: isSeleted && !noClick ? "white" : GRAY1,
              height: "88%",
              alignItems: "center",
            }
      }
      onClick={(e) => onClickRoom(true, e)}
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
          padding={"0"}
          address={room.start_route && room.start_route.address_name ? room.start_route.address_name : ""}
          title={room.start_route && room.start_route.place_name ? room.start_route.place_name : ""}
          desc={room.start_route && room.start_route.category_name ? room.start_route.category_name : ""}
          url={room.start_route && room.start_route.place_url ? room.start_route.place_url : ""}
          img={room && room.start_route && room.start_route.place_image ? room.start_route.place_image : null}
        />
      </div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          width: "92%",
          marginTop: 8,
        }}
      >
        <PositionCardReverse
          address={room && room.end_route && room.end_route.address_name ? room.end_route.address_name : ""}
          title={room && room.end_route && room.end_route.place_name ? room.end_route.place_name : ""}
          desc={room && room.end_route && room.end_route.category_name ? room.end_route.category_name : ""}
          url={room && room.end_route && room.end_route.place_url ? room.end_route.place_url : ""}
          img={room && room.end_route && room.end_route.place_image ? room.end_route.place_image : null}
          padding={"0"}
        />
      </div>
      <div
        style={{
          display: "flex",
          height: 32,
          alignItems: "flex-end",
          margin: "4px 0 6px 0",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flex: 7, paddingLeft: 16 }}>
          {tags.map((tag, i) => (
            <Tag key={i.toString()} text={tag} index={i} />
          ))}
        </div>
        {showEnterBtn && <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
            bottom: -6.5,
            right: -0.5,
          }}
          onClick={
            !noClick
              ? !userData
                ? () => alert("로그인 후 입장이 가능합니다!")
                : (e) => onClickRoom(false, e)
              : () => {}
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
        </div> }
      </div>
    </div>
  );
};
