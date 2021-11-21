import React, { useEffect, useRef, useState } from "react";
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
import { List, listClasses } from "@mui/material";
import { useRecoilState } from "recoil";
import { loadingState, searchState } from "../components/recoil";
import { ProfileCard } from "../components/card/ProfileCard";
import { RoomCard } from "../components/card/RoomCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { CourseCard } from "../components/card/CourseCard";
import { CourseType, CourseTypeInit } from "../types/Course";
import { Router, useHistory } from "react-router";

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
      <TitleHeader title="탐색" />
      <SearchBar />
      <ResultTabs />
      <BottomTabBar />
    </>
  );
};

const SearchBar = () => {
  const { height, width } = useWindowDimensions();
  const filterSearchTxt = useRef();

  const [list, setList] = useRecoilState(searchState);
  const [loading, setLoading] = useRecoilState(loadingState); //loading

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  //#region 유저 / 채팅방 / 코스 검색
  let cancelToken = axios.CancelToken.source(); //<- 1: 선언
  const onChangeFilterSearchTxt = async (t: string) => {
    if (t.length === 0) {
      // 검색시 이전꺼 멈춤
      if (loading) setLoading(false);
      cancelToken.cancel(); //<- 2: 이미 있으면 axios 중지
      cancelToken = axios.CancelToken.source(); //<- 3: 새로 토큰 생성
      setList({ users: [], rooms: [], courses: [] });
    } else {
      cancelToken.cancel(); //<- 2: 이미 있으면 axios 중지
      cancelToken = axios.CancelToken.source(); //<- 3: 새로 토큰 생성
      //#region 검색 API
      setLoading(true);
      let list: { users: UserType[]; rooms: ChatRoomType[]; courses: CourseType[] } = {
        users: [],
        rooms: [],
        courses: [],
      };
      let checkCount = 0;
      const checkList = () => {
        if (checkCount === 2) {
          setList(list);
          setLoading(false);
        } else checkCount++;
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
        list.courses = d.data;
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
  const [list,] = useRecoilState(searchState);//setList
  const history = useHistory();
  const { height, width } = useWindowDimensions();

  const handleChange = (e: any, i: number) => setIndex(i);
  const handleChangeIndex = (i: number) => setIndex(i);
  
  const onClick = (id: number) => { history.push(`user/${id}`) }
  return (
    <>
      <Tabs value={index} onChange={handleChange} style={styles.tabs}>
        <Tab label="사람" style={{ width: width*0.33, fontSize: 15 }} />
        <Tab label="채팅방" style={{ width: width * 0.34, fontSize: 15 }} />
        <Tab label="코스" style={{ width: width * 0.33, fontSize: 15 }} />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div>
          {list.users.length > 0 ? (
            <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={80}>
              {list.users.map((user, i: number) => (
                <SwiperSlide key={i.toString()}>
                  <ProfileCard
                    address={user.nickname}
                    title={user.greeting}
                    desc={(user.device ?? "") + (user.gender ?? "") + user.username}
                    url={user.profile_image ?? ""}
                    img={"img"}
                    icon={""}
                    onClick={() => onClick(user.id)}
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
            <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={253} style={{padding:"0px 16px"}} >
              {list.rooms.map((room, i: number) => (
                <SwiperSlide key={i.toString()}>
                  <RoomCard room={room} noClick />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            false
          )}
        </div>
        <div>
          {list.courses.length > 0 ? (
            <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={256}>
              {list.courses.map((course, i: number) => (
                <SwiperSlide key={i.toString()}>
                  <CourseCard course={course} width={300} />
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
