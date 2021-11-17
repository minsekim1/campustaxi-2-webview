import React, { useRef, useState } from "react";
import { BottomTabBar } from "../components/BottomTabBar";
import { InputSearch } from "../components/Input";
import { TitleHeader } from "../components/TitleHeader";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import useWindowDimensions from "../hook/useWindowDimensions";
import { API_URL, getfetch } from "../components/common";
import axios from "axios";
import { UserType } from "../types/User";
import { ChatRoomType } from "../types/ChatRoom";
import { CourseType } from "../types/Course";
import { List, listClasses } from "@mui/material";
import { useRecoilState } from "recoil";
import { searchState } from "../components/recoil";
import { ProfileCard } from "../components/card/ProfileCard";
import { RoomCard } from "../components/card/RoomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { CourseCard } from "../components/card/CourseCard";
import { CourseTypeInit } from "../types/CourseArea.d";

const styles = {
  tabs: {
    background: "#fff",
    width: "100%",
  },
  slide: {
    padding: 15,
    minHeight: 700,
    color: "black",
  },
};

const SearchScreen = () => {
  return (
    <>
      <TitleHeader title="찾기" />
      <SearchBar />
      <ResultTabs />
      <BottomTabBar />
    </>
  );
};

const SearchBar = () => {
  const { height, width } = useWindowDimensions();
  const filterSearchTxt = useRef();
  // const [list, setList] = useState<{ users: UserType[]; rooms: ChatRoomType[]; course: CourseType[] }>({
  //   users: [],
  //   rooms: [],
  //   course: [],
  // });
  const [list, setList] = useRecoilState(searchState);

  //#region 유저 / 채팅방 / 코스 검색
  let cancelToken = axios.CancelToken.source(); //<- 1: 선언
  const onChangeFilterSearchTxt = async (t: string) => {
    if (t.length !== 0) {
      // 검색시 이전꺼 멈춤
      cancelToken.cancel(); //<- 2: 이미 있으면 axios 중지
      cancelToken = axios.CancelToken.source(); //<- 3: 새로 토큰 생성
      //#region 검색 API
      let list: { users: UserType[]; rooms: ChatRoomType[]; course: CourseType[] } = {
        users: [],
        rooms: [],
        course: [],
      };
      let checkCount = 0;
      const checkList = () => {
        // if (checkCount === 2) setList(list);
        // else checkCount++;
      };
      // 유저 닉네임 검색
      axios.get(`${API_URL}/users?_q=${t}`, { cancelToken: cancelToken.token }).then((d) => {
        list.users = d.data;
        checkList();
      });
      // 챗방 출/도 검색 => TEST 현재 타이틀만 검색 가능함! 출/도 검색 추가필요함!
      // route검색해서 해당 채팅방 따로 띄워주기!
      axios.get(`${API_URL}/chat-rooms?_q=${t}`, { cancelToken: cancelToken.token }).then((d) => {
        list.rooms = d.data;
        checkList();
      });
      // 코스 title 검색 => content 내용 검색
      axios.get(`${API_URL}/courses?_q=${t}`, { cancelToken: cancelToken.token }).then((d) => {
        list.course = d.data;
        checkList();
      });
      //#endregion
    }
  };
  //#endregion

  return (
    <div style={{ width: width, display: "flex", justifyContent: "center" }}>
      <InputSearch
        value={filterSearchTxt}
        placeholder={"닉네임/출발지,도착지/코스를 검색해보세요."}
        onChange={onChangeFilterSearchTxt}
      />
    </div>
  );
};

const ResultTabs = () => {
  const [index, setIndex] = useState(0);
  const [list, setList] = useRecoilState(searchState);
  const handleChange = (e: any, i: number) => setIndex(i);
  const handleChangeIndex = (i: number) => setIndex(i);
  return (
    <>
      <Tabs value={index} onChange={handleChange} style={styles.tabs}>
        <Tab label="사람" style={{ width: "33%", fontSize: 15 }} />
        <Tab label="채팅방" style={{ width: "34%", fontSize: 15 }} />
        <Tab label="코스" style={{ width: "33%", fontSize: 15 }} />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div>
          {list.users.length > 0 ? (
            <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={80}>
              {list.users.map((user, i: number) => (
                <SwiperSlide key={i.toString()}>
                  <ProfileCard
                    title={"title"}
                    desc={"desc"}
                    address={"address"}
                    url={"url"}
                    img={"img"}
                    onClick={() => {}}
                    disable={false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            false
          )}
        </div>
        <div>
          {list.rooms.length > 0 ? (
            <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={230}>
              {list.rooms.map((room, i: number) => (
                <SwiperSlide key={i.toString()}>
                  <RoomCard room={null} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            false
          )}
        </div>
        <div>
          {list.courses.length > 0 ? (
            <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={260}>
              {list.courses.map((course, i: number) => (
                <SwiperSlide key={i.toString()}>
                  <CourseCard width={300}/>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            false
          )}
        </div>
      </SwipeableViews>
    </>
  );
};
export default SearchScreen;
