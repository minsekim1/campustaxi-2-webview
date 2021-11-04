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

const SearchScreen = () => {
  return (
    <>
      <TitleHeader title="찾기" />
      <SearchBar/>
      <ResultTabs/>
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
    <div style={{width:SCREEN_WIDTH, display:'flex', justifyContent:'center'}}>
      <InputSearch
        value={filterSearchTxt}
        placeholder={"검색어를 입력해주세요. 유저닉네임/채팅방이름/코스이름 등"}
        onChange={onChangeFilterSearchTxt}
      />
    </div>
  );
};
const tabList = [
  { text: "tab 1", index: 0 },
  { text: "tab 2", index: 1 },
  { text: "tab 3", index: 2 },
];
const ResultTabs = () => {
  const [index, setIndex] = useState(0);
  const handleChange = (e) => {
    console.log(tabList.filter((d) => d.text === e.target.innerHTML));
    // setIndex(tabList.filter(d=>d.text === e.target.innerHTML)[0].index);
  };
  const handleChangeIndex = (i) => {
    setIndex(i)
  };
  return (
    <>
      <Tabs value={index} >
        {tabList.map((d) => (
          <Tab label={d.text} onClick={handleChange} style={{width:"100%", height:"100%"}} key={d.index.toString()} />
        ))}
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div>slide n°1</div>
        <div>slide n°2</div>
        <div>slide n°3</div>
      </SwipeableViews>
    </>
  );
}
export default SearchScreen;
