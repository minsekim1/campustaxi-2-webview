import { BottomTabBar } from "../components/BottomTabBar";
import { BottomModal } from "../components/BottomModal";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import { loadingState } from "../components/recoil";
import { useEffect } from "react";
import fetcher from "../hook/useSWR/fetcher";
import { ChatRoomType } from "../types/ChatRoom";
import { API_URL } from "../components/common";
import { Swiper, SwiperSlide } from "swiper/react";
import { RoomCard } from "../components/card/RoomCard";
import { TitleHeader } from "../components/TitleHeader";

const MyChatScreen = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  // const { id }: { id: string | undefined } = useParams();
  const { data, error } = useSWR(`${API_URL}/chat-rooms`, fetcher);
  if ((error || !data) && !loading) setLoading(true);
  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div>
        loading...
        <BottomTabBar />
      </div>
    );
  if (loading) setLoading(false);

  const chatRooms: ChatRoomType[] = data;

  return (
    <>
      <TitleHeader title="내 채팅" />
      <ChatRoomArea chatRooms={chatRooms} />
      <div style={{ position: 'absolute', zIndex: 1 }}>
        <BottomTabBar />
      </div>
    </>
  );
};

const ChatRoomArea = ({ chatRooms }: { chatRooms: ChatRoomType[] }) => {
  return (
    <>
      {chatRooms.length > 0 ? (
        <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={253} style={{ padding: "0px 64px" }}>
          {chatRooms.map((room, i: number) => (
            <SwiperSlide key={i.toString()}>
              <RoomCard room={room} noClick />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        false
      )}
    </>
  );
};

export default MyChatScreen;
