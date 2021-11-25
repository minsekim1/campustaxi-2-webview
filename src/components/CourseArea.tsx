import { VirtualizeSwipeableViews, slideRenderer } from "./list/CouseList";
import { useCallback, useEffect, useState } from "react";
import { getfetch } from "./common";
import useWindowDimensions from "../hook/useWindowDimensions";
import { CourseType } from "../types/Course";
import _ from 'lodash'
import { useRecoilState } from "recoil";
import { CourseIndexState, CourseListState,  TagListState } from "./recoil";
import { useHistory } from "react-router";

export const tagInitList = ["문화", "힐링", "놀이", "이벤트", "데이트", "여행", "기타"];

export const CourseArea = () => {
  const [courseList, setCourseList] = useRecoilState<CourseType[]>(CourseListState);
  const [tagList, setTagList] = useRecoilState<string[]>(TagListState);
  const [index, setIndex] = useRecoilState<number>(CourseIndexState);
  const { height, width } = useWindowDimensions();
  
  const history = useHistory();
  
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
  }, [history]);
  //#endregion
  if (tagList.length === 0) return false
  return <VirtualizeSwipeableViews index={index} onChangeIndex={setIndex} slideRenderer={(p: { index: number, key: number }) => slideRenderer(p, tagList, width)} />;
};
