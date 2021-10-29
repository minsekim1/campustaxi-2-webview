import { CourseCard } from "../card/CourseCard";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { mod } from "react-swipeable-views-core";
import { Icon } from "./../common/Icon";
import { GRAY4, GRAY6 } from "./../../style/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// Import Swiper styles
// import 'swiper/';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

export const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export const slideRenderer = ({ key, index }, list = []) => {
  return (
    <div key={key}>
      <Title
        beforeTxt={mod(index, list.length) === 0 ? list[list.length - 1] : list[mod(index, list.length) - 1]}
        text={`${list[mod(index, list.length)]} 코스`}
        afterTxt={mod(index, list.length) === list.length - 1 ? list[0] : list[mod(index, list.length) + 1]}
      />
      <CourseList />
    </div>
  );
};

const CourseList = ({ title }) => {
  return (
    <>
      <Swiper slidesPerView={1} direction={"vertical"} speed={500} height={250}>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
        <SwiperSlide>
          <CourseCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

const Title = ({ beforeTxt, text, afterTxt }) => {
  return (
    <div style={{ fontSize: 20, fontWeight: "bold", display: "flex", alignItems: "center" }}>
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
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{text}</div>
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
