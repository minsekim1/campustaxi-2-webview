import { CourseCard } from "./card/CourseCard";

export const CourseList = () => {
  let a = [1, 2, 3,4,5];
  return (
    <div>
      {a.map((c) => (
        <CourseCard />
      ))}
    </div>
  );
};
