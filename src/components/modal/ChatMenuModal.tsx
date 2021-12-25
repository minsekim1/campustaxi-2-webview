import { Divider, Drawer } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useSWR from "swr";
import fetcher from "../../hook/useSWR/fetcher";
import { ChatRoomType } from "../../types/ChatRoom";
import { RoomCard } from "../card/RoomCard";
import { API_URL, postfetch } from "../common";
import { alertDialogInit, alertDialogState, loadingState, MenuModalState, userDataState } from "../recoil";
import Typography from "@mui/material/Typography";
import { CSSProperties } from "react";
import { GRAY2 } from "../../style/index";
import { ProfileCard } from "../card/ProfileCard";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import useWindowDimensions from "../../hook/useWindowDimensions";

export const ChatMenuModal = () => {
  const [menu, setMenu] = useRecoilState(MenuModalState);
  const { id }: { id: string | undefined } = useParams();
  const { data: dataR, error: errorR, mutate: mutateR } = useSWR(`${API_URL}/chat-rooms?id=${id}`, fetcher);
  const userData = useRecoilValue(userDataState);
  const history = useHistory();
  const setAlertDialogInfo = useSetRecoilState(alertDialogState);
  const setLoading = useSetRecoilState(loadingState); //loading

  const onClose = () => setMenu({ visible: false });
  const onExit = () => {
    setAlertDialogInfo({
      visible: true,
      title: "방 나가기",
      text: "방을 나가면 더 이상\n내 채팅방에서 볼 수 없습니다.\n\n정말 나가시겠습니까?",
      confirmText: "나가기",
      handleConfirm: () => {
        const enter_users_filtered = room.enter_users.map((u) => u.id).filter((id) => id !== userData?.id);
        setLoading(true);
        postfetch(
          `/chat-rooms/${id}`,
          JSON.stringify({
            enter_users: enter_users_filtered,
          }),
          true,
          "PUT"
        ).then((d) => {
          setLoading(false);
          setAlertDialogInfo(alertDialogInit);
          onClose();
          history.push('/mychat');
        });
      },
    });
  };

  const room: ChatRoomType = dataR[0];
  console.log(room.enter_users);
  return (
    <>
      <Drawer anchor={"right"} open={menu.visible} onClose={onClose}>
        <div style={roomStyle.header}>방 정보</div>
        <RoomCard
          room={room}
          noClick={false}
          onClick={() => {
            return;
          }}
          style={{ padding: 16 }}
          showEnterBtn={false}
        />
        <Divider light />
        {room.enter_users.map((u) => (
          <ProfileCard
            address={u.nickname}
            title={u.greeting === "" ? "인삿말이 없습니다." : u.greeting}
            desc={`팔로워 ${u.follower ?? 0}명`}
            img={u.profile_image ?? null}
            icon={"faUser"}
          />
        ))}
        <Divider light sx={{ marginTop: 1 }} />
        <div style={roomStyle.exitBtn} onClick={onExit}>
          <Button fullWidth color="error">
            방나가기
          </Button>
        </div>
      </Drawer>
    </>
  );
};
const roomStyle: { [key: string]: CSSProperties } = {
  header: { backgroundColor: GRAY2, padding: 16, fontWeight: "bold", justifyContent: "center", display: "flex" },
  exitBtn: {
    position: "absolute",
    bottom: 0,
    width: 313 - 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
};
