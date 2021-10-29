import { VirtualizeSwipeableViews, slideRenderer } from "./list/CouseList";
import { useEffect,  useState } from "react";

const favorite = {
  enterCount: { 이벤트: 3, 데이트: 2, 여행: 1, 힐링: 10, 문화: 20, 놀이: 10 },
  index: { 이벤트: 1, 데이트: 0, 여행: 1, 힐링: 1, 문화: 1, 놀이: 0 },
};
export const CourseArea = () => {
  const [rankedCourseList, setRankedCourseList] = useState([]);
  //#region 많이 본 순서로 정렬, 이벤트는 무조건 처음.
  // 많이 클릭한 순서 => ['문화', '힐링', '놀이', '이벤트', '데이트', '여행']
  useEffect(() => {
    let list = Object.keys(favorite.enterCount)
      .sort((a, b) => favorite.enterCount[b] - favorite.enterCount[a])
      .filter((t) => t !== "이벤트");
    list.unshift("이벤트");
    setRankedCourseList(list);
  }, [favorite.enterCount]);
  //#endregion

  return (
    <div>
      <VirtualizeSwipeableViews slideRenderer={(p) => slideRenderer(p, rankedCourseList)} />
    </div>
  );
};
