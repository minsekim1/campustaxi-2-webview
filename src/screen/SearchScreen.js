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
  slide1: {
    // backgroundColor: "#FEA900",
  },
  slide2: {
    // backgroundColor: "#B3DC4A",
  },
  slide3: {
    // backgroundColor: "#6AC0FF",
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

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const SearchBar = () => {
  const { height, width } = useWindowDimensions();
  const filterSearchTxt = useRef();

  //#region 유저 / 채팅방 / 코스 검색
  const onChangeFilterSearchTxt = async (t) => {
    // 검색시 이전꺼 멈춤
    try {
      if (source.cancel) source.cancel();
    } catch (e) {
      
    } 

    if (t.length === 0) {
    } else {
      console.log("검색!");
      // 유저 닉네임 검색
      axios.get(`${API_URL}/users?_q=${t}`, { cancelToken: source.token }).then(d=>console.log(d));
      // fetch(`${API_URL}/users?_q=${t}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      //   },
      // });
      // 챗방 출/도 검색
      // fetch(`${API_URL}/chat-rooms?_q=${t}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      //   },
      // });
      // // 코스 title 검색
      // fetch(`${API_URL}/courses?_q=${t}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      //   },
      // });

      // fetch(`/v1/search/shop.json?query=${t}&display=${procductInfoInit.display}`, {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "X-Naver-Client-Id": "yeoXdUtxPpcjkxR4G932",
      //     "X-Naver-Client-Secret": "TChrYL1rxH",
      //   },
      // })
      //   .then((d) => d.json())
      //   .then((d) => setProcductInfo(d));
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
  const handleChange = (e, i) => setIndex(i);
  const handleChangeIndex = (i) => setIndex(i);
  return (
    <>
      <Tabs value={index} fullWidth onChange={handleChange} style={styles.tabs}>
        <Tab label="사람" style={{ width: "33%", fontSize: 15 }} />
        <Tab label="채팅방" style={{ width: "34%", fontSize: 15 }} />
        <Tab label="코스" style={{ width: "33%", fontSize: 15 }} />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
      </SwipeableViews>
    </>
  );
};
export default SearchScreen;
