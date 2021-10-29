 
import { Textarea } from '../components/Input';
import { BookmarkBtn } from './../components/Btn/BookmarkBtn';
import { ProfileCard } from '../components/card/ProfileCard';
import { CourseImage } from './../components/Input/CourseImage';
import { BackHeader } from './../components/BackHeader';

const CourseDetailScreen = () => {
  return (
    <>
        <BackHeader/>
        <CourseImage placeholder={""} />
        <div style={{ padding: "0 16px 80px 16px" }}>
          <div style={{ marginTop: -40 }}>
            <Textarea
              style={{
                border: "none",
                width: "100%",
                fontSize: 19,
                paddingRight: 6,
                padding: 2,
                fontFamily: "AppleSDGothic",
                backgroundColor: "transparent",
                resize: "none",
                outline: "none",
              }}
            />
            <div style={{ marginTop: 12 }}>
              <Textarea
                style={{
                  border: "none",
                  width: "100%",
                  fontSize: 15,
                  paddingRight: 6,
                  fontFamily: "AppleSDGothic",
                  backgroundColor: "transparent",
                  resize: "none",
                  overflow: "hidden",
                  outline: "none",
                }}
              />
            </div>
            <BookmarkBtn />
            <ProfileCard address={"캠퍼스택시"} title={"서울시 강남구"} desc={"팔로워 3,456명"} img={"img"} />
          </div>
        </div>
    </>
  );
};

export default CourseDetailScreen;
