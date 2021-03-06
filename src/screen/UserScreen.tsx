import { useHistory, useParams } from "react-router";
import { Key, useEffect, useState } from "react";
import { Avatar, Button, Tab, Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { BackHeader } from "../components/BackHeader";
import { CourseCard } from "../components/card/CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowDimensions from "../hook/useWindowDimensions";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { editProfileDialogState, loadingState, userDataState } from "../components/recoil";
import { GRAY2, GRAY4, GRAY6, GRAY7, GRAY8 } from "../style";
import fetcher from "../hook/useSWR/fetcher";
import useSWR from "swr";
import { API_URL } from "../components/common";
import { BackHeaderRight } from "../components/BackHeaderRight";
import { CourseType } from "../types/Course";
import { UserType } from "../types/User";
import { deepOrange } from "@mui/material/colors";
import { EditProfileDialog } from "../components/Dialog/EditProfileDialog";

const MyScreen = () => {
  const history = useHistory();
  const setEditProfileDialogInfo = useSetRecoilState(editProfileDialogState);

  //#region 데이터관리
  const [loading, setLoading] = useRecoilState(loadingState);
  const p: any = useParams();
  const id = p.id;
  const userDataLocal = useRecoilValue(userDataState);
  const { data, error, mutate } = useSWR(`${API_URL}/users?id=${id}`, fetcher);
  const { height, width } = useWindowDimensions();

  const isMe = id == userDataLocal?.id;
  const userData: UserType = isMe ? userDataLocal : data ? data[0] : null;
  if ((error || !userData) && !loading) setLoading(true);
  //#endregion
  //#region 스크롤 열기
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "overflow: scroll;");
    return () => {
      body.setAttribute("style", "overflow: hidden;");
    };
  }, []);
  //#endregion
  //#region 로딩관리
  useEffect(() => {
    return () => setLoading(false);
  }, []);
  if (error)
    return (
      <div>
        <BackHeader />
        failed to load
      </div>
    );
  if (!userData)
    return (
      <div>
        <BackHeader />
        {/* loading... */}
      </div>
    );
  if (loading) setLoading(false);
  //#endregion

  const editProfile = () => setEditProfileDialogInfo({ visible: true });
  return (
    <>
      <div style={{ height: 56, position: "fixed" }}>
        <BackHeader color={"black"} />
      </div>
      <div style={{ padding: 16, paddingTop: 56 }}>
        <div>
          <div style={{ fontSize: 17, paddingTop: 8, flexDirection: "row", display: "flex", width: "100%" }}>
            <div style={{ width: "20%" }}>
              <Avatar
                sx={{ border: "1px solid gray" }}
                src={userData.profile_image ?? undefined}
                style={{ width: width * 0.14, height: width * 0.14 }}
              >
                {userData.nickname.slice(0, 1)}
              </Avatar>
            </div>
            <div style={{ width: "60%", display: "flex", flexDirection: "column", paddingLeft: 16, paddingRight: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ flex: 1, marginTop: 4 }}>{userData.nickname ?? "이름 없음"}</div>
                <div style={{ flex: 1, marginBottom: 4 }}>
                  <div style={{ color: GRAY7, fontSize: 15, paddingTop: 2, overflowWrap: "anywhere" }}>
                    {userData.email ?? "이메일 없음"}
                  </div>
                </div>
              </div>
            </div>

            {isMe ? (
              <div
                style={{
                  width: "20%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "6em",
                }}
              >
                <Button variant="outlined" size="small" style={{ height: 32 }} onClick={editProfile}>
                  프로필 수정
                </Button>
              </div>
            ) : (
              false
            )}
          </div>
          <div style={{ padding: "8px 16px 0 16px", overflowWrap: "break-word", color: GRAY8 }}>
            {userData.greeting ?? "인삿말이 없습니다."}
          </div>
          {/* <FaPenAlt style={{ color: "343A40", marginLeft: 5, height: 15 }} /> */}
          {/* <div className="points">{points} 보유중</div> */}
          {/* <Button variant="text">Text</Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button> */}
          {/* <div className="points"> 팔로우하기</div> */}
        </div>

        {/* 코스제작 {courseNum} */}
        {/* <div style={{ color: GRAY7, fontSize: 15 }}>
            팔로잉 {userData.following && (userData.following.length ?? 0)} 팔로워 {"userData.follower" ?? 0}
          </div> */}
      </div>
      <ResultTabs />
      <EditProfileDialog />
    </>
  );
};

const ResultTabs = () => {
  const [index, setIndex] = useState(0);
  const handleChange = (e: any, i: number) => setIndex(i);
  const handleChangeIndex = (i: number) => setIndex(i);
  const { width } = useWindowDimensions();
  return (
    <>
      <Tabs
        value={index}
        onChange={handleChange}
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 10,
          marginTop: 8,
          marginLeft: 16,
          width: width,
        }}
      >
        {/* <Tab label="이용 내역" style={{ width: "50%", fontSize: 15 }} /> */}
        {/* <Tab label="경로 제작" style={{ width: "50%", fontSize: 15 }} /> */}
        <Tab label="경로 제작" style={{ fontSize: 15, width: "100%" }} />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        {/* <div>
          <LogList />
        </div> */}
        <div>
          <CourseList />
        </div>
      </SwipeableViews>
    </>
  );
};

const LogList = () => {
  const sampleLog = [
    {
      content: "코스 글에 좋아요했습니다.",
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
    {
      content: '"같이택시타실분..." 코스에 좋아요했습니다.',
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
    {
      content: "카직스님이 팔로우하셨습니다.",
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
    {
      content: "알리스타님이 코스에 좋아요했습니다.",
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
  ];
  const sampleLogList = [...sampleLog, ...sampleLog, ...sampleLog];

  return (
    <>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={90}>
        {sampleLogList.map((item, i) => (
          // item.content
          // item.user_id
          // item.img
          <SwiperSlide key={i.toString()}>
            <div
              style={{
                margin: "16px 16px",
                padding: "16px 16px",
                borderColor: GRAY4,
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 16,
                backgroundColor: GRAY2,
              }}
            >
              <div>{item.content}</div>
              <div>{item.user_id}</div>
              <div>{item.img}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const CourseList = () => {
  const p: any = useParams();
  const id = p.id;
  const { height, width } = useWindowDimensions();
  const { data: list, error, mutate } = useSWR(`${API_URL}/courses?creator_id=${id}`, fetcher);

  return (
    <>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={260}>
        {list
          ? list.map((course: CourseType | undefined) => (
              <SwiperSlide key={course?.id}>
                <CourseCard width={width} course={course} />
              </SwiperSlide>
            ))
          : false}
      </Swiper>
    </>
  );
};
export default MyScreen;

/*
<To-Do-List>
- 팔로잉 한 줄 두 개 style,
- 가로 스크롤뷰,
- 버튼 이용내역 디폴트로 클릭 된 상태로 만들기
- Menu 부분 (이전페이지, 고개센터, 옵션),
- 보유 포인트
- 이름 편집 아이콘
*/
