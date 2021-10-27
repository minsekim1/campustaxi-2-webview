import { VirtualizeSwipeableViews, slideRenderer } from "./list/CouseList";
import { useState } from "react";

export const CourseArea = () => {
  //#region 많이 본 순서로 정렬, 이벤트는 무조건 처음.
  // 유저가 많이 클릭할 수록 상위 노출+3줄 , 4줄 노출
  const favorite = {
    enterCount: { 이벤트: 3, 데이트: 2, 여행: 1, 힐링: 10, 문화: 20, 놀이: 10 },
    index: { 이벤트: 1, 데이트: 0, 여행: 1, 힐링: 1, 문화: 1, 놀이: 0 },
  };
  // 많이 클릭한 순서 => ['문화', '힐링', '놀이', '이벤트', '데이트', '여행']
  let rankedCourseList = Object.keys(favorite.enterCount)
    .sort((a, b) => favorite.enterCount[b] - favorite.enterCount[a])
    .filter((t) => t !== "이벤트");
  rankedCourseList.unshift("이벤트");
  //#endregion

  return (
    <div>
      <VirtualizeSwipeableViews slideRenderer={(p) => slideRenderer(p, rankedCourseList)} />
    </div>
  );
};
