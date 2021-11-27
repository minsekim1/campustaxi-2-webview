import { BottomTabBar } from "../components/BottomTabBar";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import { loadingState } from "../components/recoil";
import { useEffect } from "react";
import fetcher from "../hook/useSWR/fetcher";
import { ChatRoomType } from "../types/ChatRoom";
import { API_URL } from "../components/common";
import { RoomCard } from "../components/card/RoomCard";
import { BottomHeader } from "../components/BottomHeader";


const MyChatScreen = () => {
  const [loading, setLoading] = useRecoilState(loadingState);

  // #region 스크롤 닫기
  const body = document.getElementsByTagName("body")[0];
  body.setAttribute('style', "overflow-x: hidden;");
  useEffect(() => {
    body.removeAttribute("style");
    return () => setLoading(false);
  }, [body]);
  // #endregion
  //#region 데이터 관리
  const { data, error } = useSWR(`${API_URL}/chat-rooms`, fetcher);
  if ((error || !data) && !loading) setLoading(true);
  if (error)
    return (
      <div>
        <div style={{ position: "sticky", top: 0, zIndex: 2, height: 56, backgroundColor: "white" }}>
          <BottomHeader title="내 채팅" />
        </div>
        failed to load <BottomTabBar />
      </div>
    );
  if (!data)
    return (
      <div>
        <div style={{ position: "sticky", top: 0, zIndex: 2, height: 56, backgroundColor: "white" }}>
          <BottomHeader title="내 채팅" />
        </div>
        {/* loading... */}
        <BottomTabBar />
      </div>
    );
  if (loading) setLoading(false);
  //#endregion

  const chatRooms: ChatRoomType[] = data;

  return (
    <>
      <div style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 3 }}>
        <BottomHeader title="내 채팅" />
      </div>
      <ChatRoomArea chatRooms={chatRooms} />
      <BottomTabBar />
    </>
  );
};

const ChatRoomArea = ({ chatRooms }: { chatRooms: ChatRoomType[] }) => {
  return (
    <div style={{ padding: "0 16px 96px 16px" }}>
      {chatRooms.map((room, i: number) => (
        <RoomCard key={i.toString()} room={room} noClick />
      ))}
    </div>
  );
};

export default MyChatScreen;
