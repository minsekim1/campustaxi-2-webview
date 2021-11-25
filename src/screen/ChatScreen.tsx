import { forwardRef, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { lastMessageMarginBottomState, loadingState, userDataState } from "../components/recoil";
import useSWR from "swr";
import { API_URL, postfetch } from "../components/common";
import fetcher from "../hook/useSWR/fetcher";
import { BackHeaderRight } from "../components/BackHeaderRight";
import { MessageChatCard } from "../components/card/MessageChatCard";
import { GRAY1, GRAY6, ORANGE } from "../style";
import { TextareaAutosize } from "@mui/base";
import { UserType } from "../types/User";
import useWindowDimensions from "../hook/useWindowDimensions";
import { CreatorType } from "../types/Course";
import { ChatRoomType } from "../types/ChatRoom";

// 처음에만 가장 아래로 이동

let msgloading = false;

export const ChatScreen = ({ }) => {
  const history = useHistory();
  const textareaRef = useRef("");
  const isInit = useRef(true);
  const messageareaRef = useRef<HTMLDivElement>(null);

  //#region 스크롤 열기
  const body = document.getElementsByTagName('body')[0];
  useEffect(() => {
    body.setAttribute("style", "overflow: scroll;");
    return () => {
      body.setAttribute("style", "overflow: hidden;");
      setLoading(false);
    }
  }, [])
  //#endregion
  //#region 데이터관리
  const { id }: { id: string | undefined } = useParams();
  const [loading, setLoading] = useRecoilState(loadingState);
  const { data, error, mutate } = useSWR(`${API_URL}/chats?chat_room_id=${id}`, fetcher, { refreshInterval: 1000 });
  const { data: dataU, error: errorU } = useSWR(`${API_URL}/users?id=${1}`, fetcher);
  if ((error || !data || errorU || !dataU) && !loading) setLoading(true);
  useEffect(() => {
    return () => setLoading(false);
  }, []);
  if (error || errorU)
    return (
      <div>
        <BackHeaderRight title={""} userImg={""} roomId={id} />
        failed to load
      </div>
    );
  if (!data || !dataU)
    return (
      <div>
        <BackHeaderRight title={""} userImg={""} roomId={id} />
        {/* loading... */}
      </div>
    );
  if (loading) setLoading(false);
  //#endregion


  const userData: UserType = dataU[0];

  return (
    <>
      <BackHeaderRight title={userData.nickname} userImg={userData.profile_image} roomId={id} />
      <MessageArea list={data} isInit={isInit} messageareaRef={messageareaRef} />
      <Input ref={textareaRef} list={data} mutate={mutate} />
    </>
  );
};

const MessageArea = ({
  list,
  isInit,
  messageareaRef,
}: {
  list: MessageChatType[];
  isInit: any;
  messageareaRef?: any;
}) => {
  return (
    <div ref={messageareaRef} className={"MessageArea"} style={{ display: "flex", flexDirection: "column-reverse" }}>
      <MessageList list={list} isInit={isInit} />
    </div>
  );
};
const MessageList = ({ list, isInit }: { list: MessageChatType[]; isInit: any }) => {
  const isLast = true;
  const [lastMessageMarginBottom] = useRecoilState(lastMessageMarginBottomState); //setLastMessageMarginBottom
  const parentRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  //#region 아래 여백이 변할때마다 마지막 스크롤일 경우 가장 아래로 이동하기
  useEffect(() => {
    if (parentRef && parentRef.current && ref && ref.current) {
      if (window.pageYOffset > parentRef.current?.scrollHeight - window.innerHeight) {
        // 메세지 가장 아래로 이동하기
        ref.current.scrollIntoView();
      }
    }
  }, [lastMessageMarginBottom]);
  //#endregion
  //#region 처음 채팅방 들어오고 데이터 받아오면 최하단으로 이동 / 맨 아래보고 있을 때 채팅 들어오면 최하단으로 이동.
  useEffect(() => {
    const MessageArea = document.getElementsByClassName('MessageArea')[0];
    if (ref && ref.current && isInit.current && isLast && list.length > 0) {
      setTimeout(() => {
        window.scroll(0, 9999999);
      }, 100);
      isInit.current = false;
    } else if (Math.abs(window.scrollY + 375 + 375 - MessageArea.scrollHeight) < 100) {
      setTimeout(() => {
        window.scroll(0, 9999999);
      }, 100);
    } 
  }, [list.length]);


  //#endregion

  return (
    <div ref={parentRef} style={{ display: "flex", flexDirection: "column" }}>
      {list && list.length > 0
        ? list.map((m, i) =>
          isLast && i === list.length - 1 ? (
            <MessageChatCard mref={ref} isLast data={m} key={i.toString()} />
          ) : (
            <MessageChatCard data={m} key={i.toString()} />
          )
        )
        : false}
    </div>
  );
};

const Input = forwardRef(({ mutate, list }: { mutate: any; list: MessageChatType[] }, ref?: any) => {
  const { id: roomId }: any = useParams();
  const [userData] = useRecoilState(userDataState);
  const [lastMessageMarginBottom, setLastMessageMarginBottom] = useRecoilState(lastMessageMarginBottomState);
  const { height, width } = useWindowDimensions();
  const [text, setText] = useState("");
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [isConfirm, setIsConfirm] = useState(false);
  //#region 토큰 가져오기
  const history = useHistory();
  //#endregion

  //#region 텍스트 바뀔때마다 높이 비교해서 메세지 목록 맨 아래 여백조절
  // -> 전체 선택후 한번에 삭제하면 안따라가서 50ms 넣음
  useEffect(() => {
    setTimeout(() => {
      if (Math.abs(ref.current.scrollHeight - lastMessageMarginBottom) > 10)
        setLastMessageMarginBottom(ref.current.scrollHeight + 10);
    }, 50);
  }, [text]);
  //#endregion
  const onInput = (e: any) => {
    if (e.target.value !== "" && !isConfirm) setIsConfirm(true);
    else if (e.target.value === "" && isConfirm) setIsConfirm(false);
    setText(e.target.value);
  };
  const onClickSend = async () => {
    if (text === "") return;
    setText("");
    setIsConfirm(false);
    //#region 메세지 local mutation
    mutate([...list, MessageChatInit(text)], false);
    //#endregion
    setTimeout(() => {
      window.scroll(0, 9999999);
    }, 30);
    await postfetch("/chats", JSON.stringify({ message: text, chat_room_id: roomId, user_id: String(userData?.id) }), true);
    mutate();
  };
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        width: width - 32,
        padding: 16,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: GRAY1,
          padding: 8,
          marginRight: 16,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        {/* 카메라 */}
        {/* <Icon name={"camera"} size={12} /> */}
        <div style={{ flex: 1, display: "flex" }}>
          <TextareaAutosize
            ref={textRef}
            value={text}
            onInput={onInput}
            placeholder={"메세지를 남겨 주세요!"}
            style={{
              marginTop: 4,
              paddingLeft: 16,
              width: "100%",
              outline: "none",
              border: "none",
              backgroundColor: GRAY1,
              fontSize: 15,
              caretColor: ORANGE,
              resize: "none",
            }}
          />
        </div>
      </div>
      <div onClick={onClickSend} style={{ display: "flex", color: isConfirm ? ORANGE : GRAY6 }}>
        보내기
      </div>
    </div>
  );
});
//#region Types
export const MessageChatInit = (message: string) => {
  return {
    id: -1,
    chat_room_id: null, //start_route => id 로 감.
    message: message,
    deleted_at: null,
    user_id: null,
    published_at: null,
    created_at: null,
    updated_at: null,
    media: null,
  };
};
export type MessageChatType = {
  id: number;
  chat_room_id: ChatRoomType; //start_route => id 로 감.
  message: string; //"테스트 채팅!",
  deleted_at: string | null;
  user_id: CreatorType;
  published_at: string; // "2021-11-20T14:06:20.000Z",
  created_at: string; //"2021-11-20T14:06:17.000Z",
  updated_at: string; //"2021-11-20T14:06:20.000Z"
  media: string | null;
};

//#endregion

export default ChatScreen;
