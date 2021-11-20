import React, { memo, useCallback, useEffect } from "react";
import { CourseCard } from "../card/CourseCard";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
import { Icon } from "../common/Icon";
import { GRAY4, GRAY6, } from "../../style/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { CourseListState } from "../recoil";
import { useRecoilState } from "recoil";
import { CourseType } from "../../types/Course";
// Import Swiper styles
// import 'swiper/';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

export const VirtualizeSwipeableViews = virtualize(SwipeableViews);


export const slideRenderer = ({ index, key }: { index: number, key: number }, tagList: string[], width: number) => {
  const indexMod = mod(index, tagList.length);
  return (
    <div key={key}>
      <MTitle
        width={width}
        beforeTxt={indexMod === 0 ? tagList[tagList.length - 1] : tagList[indexMod - 1]}
        text={`${tagList[indexMod]} 코스`}
        afterTxt={indexMod === tagList.length - 1 ? tagList[0] : tagList[indexMod + 1]}
      />
      <MCourseList width={width} tag={tagList[indexMod]} />
    </div>
  );
};

type CourseListType = {
  width: number,
  tag: string,
}
const CourseList = ({ width, tag }:CourseListType) => {
  const [courseList,] = useRecoilState<CourseType[]>(CourseListState);//setCourseList
  const list = courseList.filter(item => item.tags.filter((item) => item.name === tag).length > 0)
  
  return (
    <>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={260}>
        {list.map((course,i:number) =>
          <SwiperSlide key={i.toString()}>
            <CourseCard width={width} course={course}/>
          </SwiperSlide>)}
      </Swiper>
    </>
  );
};
const CourseListisEqual = (prevProps: any, nextProps: any) => prevProps.width === nextProps.width && prevProps.tag === nextProps.tag;
const MCourseList = memo(CourseList, CourseListisEqual);

type TitleType = {
  beforeTxt: string, text: string, afterTxt: string, width: number
}
const Title = ({ beforeTxt, text, afterTxt }: TitleType) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          flex: 1,
          padding: "16px 0 16px 24px",
          display: "flex",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <Icon name={"faChevronLeft"} color={GRAY4} type={"light"} size={"sm"} />
        <div
          style={{
            fontSize: 13,
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            color: GRAY6,
            padding: "0 8px",
          }}
        >
          {beforeTxt}
        </div>
      </div>

      <div
        style={{
          flex: 2,
          display: "flex",
          justifyContent: "center",
          fontSize: 712 < 375 ? 18 : 20,
          fontWeight: "bold",
        }}
      >
        {text}
      </div>
      <div style={{ flex: 1, padding: "16px 24px 16px 0", display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            color: GRAY6,
            padding: "0 8px",
          }}
        >
          {afterTxt}
        </div>
        <Icon name={"faChevronRight"} color={GRAY4} type={"light"} size={"sm"} />
      </div>
    </div>
  );
};
const TitleisEqual = (prevProps: any, nextProps: any) => prevProps.beforeTxt === nextProps.beforeTxt && prevProps.text === nextProps.text;
const MTitle = memo(Title, TitleisEqual);