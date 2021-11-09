import React, { useRef, useState } from "react";
import { BottomTabBar } from "../components/BottomTabBar";
import { InputSearch } from "../components/Input";
import { TitleHeader } from "../components/TitleHeader";
import { SCREEN_WIDTH } from "../style";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SwipeableViews from "react-swipeable-views";

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

const SearchBar = () => {
  const filterSearchTxt = useRef();

  //#region 네이버 상품검색
  const onChangeFilterSearchTxt = async (t) => {
    if (t.length === 0) {
      // setProcductInfo(procductInfoInit);
    } else {
      console.log("검색!");
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
    <div style={{ width: SCREEN_WIDTH, display: "flex", justifyContent: "center" }}>
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
