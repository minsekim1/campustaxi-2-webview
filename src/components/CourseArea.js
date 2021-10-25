import { SwipeableDrawer } from "@mui/material";
import { CourseCard } from "./card/CourseCard";

export const CourseArea = () => {
  // 유저가 많이 클릭할 수록 상위 노출+3줄 , 4줄 노출
  const favorite = {
    enterCount: { 이벤트: 3, 데이트: 2, 여행: 1, 힐링: 10, 문화: 20, 놀이: 10 },
    index: { 이벤트: 1, 데이트: 0, 여행: 1, 힐링: 1, 문화: 1, 놀이: 0 },
  };
  // 많이 클릭한 순서 => ['문화', '힐링', '놀이', '이벤트', '데이트', '여행']
  const rankedCourseList = Object.keys(favorite.enterCount)
    .sort((a, b) => favorite.enterCount[b] - favorite.enterCount[a])
    .filter((t) => t !== "이벤트");

  return (
    // 태그들로 저장!
    <div>
      {/* 이벤트는 무조건 1줄 */}
      <CourseList title={"이벤트"} line={1} />
      {/* 아래부터 순위대로 1위 3줄 2위 2줄 그외 1줄씩, 0번부터 인덱스 저장해서 페이징 후 가져오기 */}
      {/* 끝으로가면 처음 0인덱스부터 다시 뜸 => 끝까지가면 랜덤 섞기 or 표시후 다른 종류 코스 띄우기 */}
      {rankedCourseList.map((title, i) => (
        <CourseList title={title} line={i === 0 ? 3 : i === 1 ? 2 : 1} />
      ))}
    </div>
  );
};

const CourseList = ({ line, title }) => {
  return (
    <>
      <Title text={`${title} 코스`} />
      {line > 0 ? <CourseCard courseId={1} /> : false}
      {line > 1 ? <CourseCard courseId={2} /> : false}
      {line > 2 ? <CourseCard courseId={3} /> : false}
    </>
  );
};
const Title = ({ text }) => {
  return <div style={{ marginLeft: 24, fontSize: 20, fontWeight: "bold" }}>{text}</div>;
};
