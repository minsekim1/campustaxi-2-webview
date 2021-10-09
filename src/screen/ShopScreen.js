import { BottomTabBar } from "../components/BottomTabBar";
import { NMAP } from '../components/NMap';
import { BottomModal } from './../components/BottomModal';
import { useState, useEffect, useCallback } from 'react';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./../style/index";
import { PositionCard, PositionCardReverse } from "../components/card/PositionCard";
import { getfetch, postfetch } from "../components/common";

const ShopScreen = () => {
  // const [data, setData] = useState([]);
  
  // // useEffect(()=>{},[]) 샵 들어올때 1번 실행
  // useEffect(() => {
  //   // 데이터 가져오기
  //   getfetch("/users").then((d) => setData(d));
  //   // getfetch("/chat-rooms").then((d) => setData(d));

  //   //데이터 저장하기
  //   // postfetch("/chat-rooms", {저장할 값들})
  //   // alert(data);
  // }, []);

  // // 새함수만들기
  // const postMyFetch = (value) => {
  //   // 새채팅방 만들기
  //   postfetch("/chat-rooms").then(d=>console.log(d));
  // };

  // // alert('re-render!')
  return (
    <>
      {/* <div onClick={() => setData([1, 2, 3])} style={{ height: 100, width: 100, backgroundColor: "red" }}></div> */}
      {/* <div onClick={() => postMyFetch([1, 2, 3])} style={{ height: 100, width: 100, backgroundColor: "red" }}></div> */}
      {/* {JSON.stringify(data)} */}
      <BottomModal />
      <BottomTabBar />
    </>
  );
};



export default ShopScreen;

/*

<div>=> 스타일? 레이아웃 = 버튼가능
<div onClick={()=>console.log("눌렀네!")}> </div>

RN => <Text>asd</Text>
React => asd
태그표현
 1. <div> {내용} </div>
 2. <div />

<img/> => 이미지 넣고
<video /> 비디오
<input /> 방생성 할떄 시간/텍스트 입력
*/