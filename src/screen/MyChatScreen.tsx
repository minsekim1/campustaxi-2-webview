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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const MyChatScreen = () => {
  const [loading, setLoading] = useRecoilState(loadingState);

  // #region 스크롤 닫기
  useEffect(() => {
    return () => setLoading(false);
  }, []); //body
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
        failed to load
        <BottomTabBar />
      </div>
    );
  if (!data)
    return (
      <div>
        <div style={{ position: "sticky", top: 0, zIndex: 2, height: 56, backgroundColor: "white" }}>
          <BottomHeader title="내 채팅" />
        </div>
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
    <div style={{ padding: "0 16px 96px 16px", zIndex:-10, position:'relative' }}>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={260}>
        {chatRooms.map((room, i: number) => (
          <SwiperSlide key={room.id}>
            <RoomCard room={room} noClick />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MyChatScreen;
