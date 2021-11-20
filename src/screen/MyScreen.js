import { BottomTabBar } from "../components/BottomTabBar";
import { NMAP } from "../components/NMap";
import "./MyScreen.css";
import { FaChevronLeft, FaHeadset, FaPenAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import { useState } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { BackHeader } from "../components/BackHeader";
import { CourseCard } from "../components/card/CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowDimensions from "../hook/useWindowDimensions";
import { CourseTypeInit } from "../types/Course";

var points = 0,
  following = 0,
  follower = 0,
  courseNum = 0;
var address = "서울시 강남구",
  name = "캠퍼스택시";

var points = 0,
  following = 0,
  follower = 0,
  courseNum = 0;
var address = "서울시 강남구",
  name = "캠퍼스택시"; //서울시 강남구

const MyScreen = () => {
  const history = useHistory();
  return (
    <>
      <div style={{ height: 56 }}>
        <BackHeader />
      </div>
      <header>
        <div className="myScreenTop">
          {/* <div className="topMenu" onClick={onClickBack}>
          <FaChevronLeft style={{ margin: 10, width: 30, height: 30, color: "#343A40" }} />
        </div> */}
          <div className="profilePhoto">
            <img
              className="photo"
              src="https://pbs.twimg.com/profile_images/763061332702736385/KoK6gHzp_400x400.jpg"
            ></img>
          </div>
          <div className="profileName">
            <div>
              <p className="name">{name}</p>
              <FaPenAlt style={{ color: "343A40", marginLeft: 5, height: 15 }} />
              {/* <div className="points">{points} 보유중</div> */}
              {/* <Button variant="text">Text</Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button> */}
              <div className="points"> 팔로우하기</div>
            </div>
            <p className="address">{address}</p>
            <p className="followInfor">
              팔로잉 {following} 팔로워 {follower}
              {/* 코스제작 {courseNum} */}
            </p>
          </div>
        </div>

        {/* <div className="myScreenBottom">
        <div className="buttons">
          <button>이용 내역</button>
          <button>경로 제작</button>
        </div>
      </div> */}
      </header>
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
      <Tabs value={index} fullWidth onChange={handleChange}>
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
  let sampleLogList = [
    {
      content: "ㅇㅇㅇ글에 좋아요했습니다.",
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
    {
      content: "ㅇㅇㅇ글에 좋아요했습니다.",
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
    {
      content: "ㅇㅇㅇ글에 좋아요했습니다.",
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
    {
      content: "ㅇㅇㅇ글에 좋아요했습니다.",
      user_id: 5, //상대방 유저아이디
      img: "", //아바타 처럼 둥근거 들어갈 수있을듯
    },
  ];
  const [courseList, setCourseList] = useState([1, 2, 3, 4]);
  const { height, width } = useWindowDimensions();
  const list = courseList;
  //.filter(item => item.tags.filter((item) => item.name === tag).length > 0)

  return (
    <>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={100}>
        {sampleLogList.map((item, i) => (
          // item.content
          // item.user_id
          // item.img
          <SwiperSlide key={i.toString()}>
            {/* 의서님작업할거 */}
            <div>{item.content}</div>
            <div>{item.user_id}</div>
            <div>{item.img}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const CourseList = () => {
  const [courseList, setCourseList] = useState([1, 2, 3, 4]);
  const { height, width } = useWindowDimensions();
  const list = courseList;
  //.filter(item => item.tags.filter((item) => item.name === tag).length > 0)

  return (
    <>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={260}>
        {list.map((course, i) => (
          <SwiperSlide key={i.toString()}>
            <CourseCard width={width} course={course} />
          </SwiperSlide>
        ))}
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
