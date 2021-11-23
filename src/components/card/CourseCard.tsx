import { GRAY2, GRAY3, GRAY4, GRAY6, GRAY7, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { ProfileIcon } from "../Icon/ProfileIcon";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { CourseType } from "../../types/Course";
import _ from "lodash";
import axios from "axios";
import { ProxyURL } from "../common";
export const TagBlack = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        ...textOverflowHidden,
        padding: "4px 12px",
        backgroundColor: GRAY7,
        color: "white",
        fontSize: 11,
        borderRadius: 20,
        fontWeight: "bold",
        marginRight: 4,
      }}
    >
      {title}
    </div>
  );
};
type CourseCardType = {
  course?: CourseType;
  width: number;
};
type ContentType = {
  content: string; //"문화"
  id: string; //"item-1636275004918"
  type: string; //"text"
};
export const CourseCard = ({ course, width }: CourseCardType) => {
  const history = useHistory();
  const content = course
    ? course.content
      ? _.join(
          JSON.parse(course.content)
            .filter((item: ContentType) => item.type === "text")
            .map((item: ContentType) => item.content),
          " "
        )
      : null
    : null;
  let image = null;
  if (course && course.images && course.images.length > 0)
    if (course.images[0].url.includes("218")) image = course.images[0].url;
  // axios
  //   .get(, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-Requested-With": "XMLHttpRequest",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "X-Requested-With",
  //     },
  //   })
  //   .then((d) => console.log(d));

  const imageCSS = image
    ? {
        backgroundImage: `url('${image}')`,
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "darken",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: GRAY2,
      }
    : { backgroundColor: GRAY4 };
  return (
    <div style={{ margin: width > 340 ? "16px 24px" : "8px 16px 0 16px" }}>
      <div
        onClick={() => history.push(`/course/detail/${course && (course.id ?? "")}`)}
        style={{
          width: "100%",
          borderRadius: 10,
          height: 240,
          ...imageCSS,
        }}
      >
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* 좌우 태그 */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 3, display: "flex", flexDirection: "row" }}>
                {/* 왼쪽 태그 */}
                {course &&
                  course.tags &&
                  course.tags.map((tag, i: number) => (
                    <TagBlack key={i.toString()} title={tag.name === "이벤트" ? "EVENT" : tag.name} />
                  ))}
              </div>
              <div style={{ flex: 1, minWidth: 120, display: "flex", justifyContent: "flex-end" }}>
                {/* 오른쪽 태그 */}
                {/* <TagBlack title={"매주 커피 3잔!"} /> */}
              </div>
            </div>
            {/* 타이틀/상세내용 */}
            <div
              style={{
                fontSize: 18,
                marginTop: 12,
                fontWeight: "bold",
                color: "white",
                textShadow: "2px 2px 2px gray",
              }}
            >
              {course && course.title ? course.title : ""}
            </div>
            <div
              style={{
                ...textOverflowHidden,
                WebkitLineClamp: 3,
                padding: 6,
                marginTop: 6,
                color: "white",
                fontSize: 13,
                maxHeight: 48,
                textShadow: "2px 2px 2px gray",
              }}
            >
              {content}
            </div>
            {/* 유저사진, 댓글, 북마크수 */}
            <div style={{ display: "flex", flexDirection: "row", marginTop: 12, alignItems: "flex-end" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "baseline" }}>
                <ProfileIcon
                  icon={"faCrown"}
                  img={course && course.creator_id && (course.creator_id.profile_image ?? undefined)}
                />
                {/* 두번째 유저 */}
                {/* <div style={{ marginLeft: 3 }}>
                  <ProfileIcon size={"sm"} />
                </div> */}
                {/* 세번째유저 */}
                {/* {width > 340 ? (
                  <div style={{ marginLeft: 3 }}>
                    <ProfileIcon size={"sm"} />
                  </div>
                ) : (
                  false
                )} */}
              </div>
              {/* <div
                style={{
                  backgroundColor: "white",
                  padding: "6px 12px",
                  borderRadius: 10,
                  display: "flex",
                  maxHeight: 20,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon name={"faBookmark"} type={"regular"} size={"sm"} color={GRAY7} />
                    <div style={{ marginLeft: 6, color: GRAY7, fontSize: 11 }}>45</div>
                  </div>
                  <div style={{ marginLeft: 12, display: "flex", alignItems: "center" }}>
                    <Icon name={"faComment"} type={"regular"} size={"sm"} color={GRAY7} />
                    <div style={{ marginLeft: 6, color: GRAY7, fontSize: 11 }}>244565</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
