import { GRAY1, GRAY5, GRAY6, GRAY7, GRAY8, textOverflowHidden } from "../../style";
import { Tag } from "../common/Tag";
import { PositionCard, PositionCardReverse } from "./PositionCard";
import { useRecoilState } from 'recoil';
import { ChatRoomSeletedState } from "../recoil";

export const RoomCard = ({ room, onClick }) => {
  const [chatRoomSeleted, setChatRoomSeleted] = useRecoilState(ChatRoomSeletedState);

  const enterTag = (room.chat_user ? room.chat_user.length : 0) + "/" + (room.person_limit + 2);
  const genderTag = room.gender != "None" ? (room.gender == "M" ? "남자만" : "여자만") : "무관";
  const dtmTag = new Date(room.start_at).toLocaleString() + "에 출발";
  const tags = [genderTag, enterTag, dtmTag];

  const isSeleted = chatRoomSeleted.id == room.id;
  const onClickRoom = (room) => {
    onClick();
    setChatRoomSeleted(room);
  };
  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: isSeleted ? GRAY5 : "#E1E3E5",
        borderStyle: "solid",
        paddingBottom: 16,
        borderRadius: 20,
        marginTop: 16,
        backgroundColor: isSeleted ? "white" : GRAY1,
      }}
      onClick={() => onClickRoom(room)}
    >
      <PositionCard
        address={room.end_route[0].address_name}
        title={room.end_route[0].place_name}
        desc={room.end_route[0].category_name}
        url={room.end_route[0].place_url}
        img={"https://picsum.photos/200"}
      />
      <PositionCardReverse
        address={room.start_route[0].address_name}
        title={room.start_route[0].place_name}
        desc={room.start_route[0].category_name}
        url={room.start_route[0].place_url}
        img={"https://picsum.photos/200"}
      />
      <div style={{ display: "flex", paddingTop: 12, marginBottom: -6, marginLeft: 16 }}>
        {tags.map((tag, i) => (
          <Tag key={i.toString()} text={tag} />
        ))}
      </div>
    </div>
  );
};
