import { BottomTabBar } from "../components/BottomTabBar";
import { NMAP } from "../components/NMap";
import "./MyScreen.css";
import { FaChevronLeft, FaHeadset, FaPenAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { BackHeader } from "../components/BackHeader";

var points = 0,
  following = 0,
  follower = 0,
  courseNum = 0;
var address = "서울시 강남구",
  name = "캠퍼스택시";

var points = 0, following = 0, follower = 0, courseNum = 0;
var address = "서울시 강남구",
  name = "캠퍼스택시"; //서울시 강남구
const MyScreen = () => {
  const history = useHistory(); 
  	const onClickBack = () => {
      history.goBack(); //<-- 뒤로가기
    };
  return (
    <>
      <div style={{height:56}}>
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
            <div className="points">{points} 보유중</div>
          </div>
          <p className="address">{address}</p>
          <p className="followInfor">
            팔로잉 {following} 팔로워 {follower} 코스제작 {courseNum}
          </p>
        </div>
      </div>
      <div className="myScreenBottom">
        <div className="buttons">
          <button>이용 내역</button>
          <button>경로 제작</button>
        </div>
      </div>
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
        <div>이용 내역</div>
        <div>경로 제작</div>
      </SwipeableViews>
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
