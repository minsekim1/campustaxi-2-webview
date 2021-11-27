import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { BackHeader } from "../components/BackHeader";
import { CourseCard } from "../components/card/CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowDimensions from "../hook/useWindowDimensions";
import { useRecoilState } from "recoil";
import { loadingState } from "../components/recoil";
import { GRAY2, GRAY4, GRAY7 } from "../style";
import fetcher from "../hook/useSWR/fetcher";
import useSWR from "swr";
import { API_URL } from "../components/common";
import { BackHeaderRight } from "../components/BackHeaderRight";

const MyScreen = () => {
  const history = useHistory();
  // const [userData] = useRecoilState(userDataState);

  //#region 데이터관리
  const [loading, setLoading] = useRecoilState(loadingState);
  const { id } = useParams();
  const { data, error, mutate } = useSWR(`${API_URL}/users?id=${id}`, fetcher);

  const userData = data ? data[0] : null;
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
        <BackHeaderRight title={""} userImg={""} roomId={id} />
        failed to load
      </div>
    );
  if (!userData)
    return (
      <div>
        <BackHeaderRight title={""} userImg={""} roomId={id} />
        {/* loading... */}
      </div>
    );
  if (loading) setLoading(false);
  //#endregion
  return (
    <>
      <div style={{ height: 56, position: "fixed" }}>
        <BackHeader color={'black'}/>
      </div>
      <div style={{ padding: 16, paddingTop: 56 }}>
        <div>
          <img style={{ borderRadius: 100 }} width={80} src={userData.profile_image ?? ""}></img>
        </div>
        <div className="profileName">
          <div>
            <div style={{ fontSize: 17, paddingTop: 8 }}>
              {userData.nickname ?? ""}
              <div style={{ color: GRAY7, fontSize: 15, paddingTop: 2 }}>{userData.kakao_email ?? ""}</div>
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
      </div>
      <ResultTabs />
    </>
  );
};

const ResultTabs = () => {
  const [index, setIndex] = useState(0);
  const handleChange = (e, i) => setIndex(i);
  const handleChangeIndex = (i) => setIndex(i);

  return (
    <>
      <Tabs
        value={index}
        fullWidth
        onChange={handleChange}
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          width: "100%",
          zIndex: 10,
          paddingTop: 0,
        }}
      >
        <Tab label="이용 내역" style={{ width: "50%", fontSize: 15 }} />
        <Tab label="경로 제작" style={{ width: "50%", fontSize: 15 }} />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div>
          <LogList />
        </div>
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
  const { id } = useParams();
  const { height, width } = useWindowDimensions();
  const { data: list, error, mutate } = useSWR(`${API_URL}/courses?creator_id=${id}`, fetcher);

  return (
    <>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={260}>
        {list ? list.map((course, i) => (
          <SwiperSlide key={i.toString()}>
            <CourseCard width={width} course={course} />
          </SwiperSlide>
        )) : false}
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
