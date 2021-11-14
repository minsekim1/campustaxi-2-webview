import { VirtualizeSwipeableViews, slideRenderer } from "./list/CouseList";
import { useCallback, useEffect, useState } from "react";
import { getfetch } from "./common";
import useWindowDimensions from "../hook/useWindowDimensions";
import { CourseType } from "../types/CourseArea.d";
import _ from 'lodash'
import { useRecoilState } from "recoil";
import { CouseListState } from "./recoil";
// const favorite = {
//   enterCount: { '이벤트': 3, '데이트': 2, '여행': 1, '힐링': 10, '문화': 20, '놀이': 10 },
//   index: { '이벤트': 1, '데이트': 0, '여행': 1, '힐링': 1, '문화': 1, '놀이': 0 },
// };
export const tagInitList = ["문화", "힐링", "놀이", "이벤트", "데이트", "여행", "기타"];

export const CourseArea = () => {
  const [courseList, setCourseList] = useRecoilState<CourseType[]>(CouseListState);
  const [tagList, setTagList] = useState<string[]>([]);
  const { height, width } = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  

  //#region 코스 데이터 가져오기
  useEffect(() => {
    getfetch("/courses").then(async (d: CourseType[]) => {
      setCourseList(d)
      //#region 태그별 계산해서 높은 순으로 보여주기(좌우스크롤)
      // 많이 본 순서로 정렬, 이벤트는 무조건 처음.
      let tagList: string[] = []
      await d.map((course) => course.tags.map((tag) => tagList.push(tag.name)))
      tagList = await _.sortBy(_.groupBy(tagList), ['length']).map(n => n[0]).reverse().filter(i => i !== "이벤트")
      tagList.unshift("이벤트") //첫번째는 무조건 이벤트 먼저
      setTagList(tagList)
      //#endregion
    });
  }, []);
  //#endregion
  if (tagList.length === 0) return false
  return <VirtualizeSwipeableViews index={index} onChangeIndex={setIndex} slideRenderer={(p: { index: number, key: number }) => slideRenderer(p, tagList, width)} />;
};
