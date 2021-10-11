import { GRAY2, GRAY7, SCREEN_WIDTH, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY8 } from "./../../style/index";
import { ProfileIcon } from './../Icon/ProfileIcon';

export const TagBlack = ({ title }) => {
  return (
    <div
      style={{
        ...textOverflowHidden,
        padding: "6px 12px",
        backgroundColor: GRAY7,
        color: "white",
        fontSize: 10,
        borderRadius: 20,
        fontWeight: "bold",
      }}
    >
      {title}
    </div>
  );
};
export const CourseCard = () => {
  return (
    <div style={{ margin: SCREEN_WIDTH > 340 ? "16px 24px" : "16px 12px" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: GRAY2,
          borderRadius: 10,
        }}
      >
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* 좌우 태그 */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 3, display: "flex", flexDirection: "row" }}>
                <TagBlack title={"EVENT"} />
              </div>
              <div style={{ flex: 1, minWidth: 120, display: "flex", justifyContent: "flex-end" }}>
                <TagBlack title={"매주 커피 3잔!"} />
              </div>
            </div>
            {/* 타이틀/상세내용 */}
            <div style={{ fontSize: 18, marginTop: 12, fontWeight: "bold", color: GRAY7 }}>서울 한강 공원 명소</div>
            <div
              style={{
                ...textOverflowHidden,
                WebkitLineClamp: 3,
                padding: 6,
                marginTop: 6,
                color: GRAY7,
                fontSize: 13,
                maxHeight: 48,
              }}
            >
              서울에 있는 한강 공원의 명소로 택시를 타고 이동해요. 주변에 ㅇㅇ맛집, ㅁㅁ식당 등이 있고, 주문 배달할 때는
              02-0000-0000로 전화하...
            </div>
            {/* 유저사진, 댓글, 북마크수 */}
            <div style={{ display: "flex", flexDirection: "row", marginTop: 12, alignItems: "flex-end" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                <ProfileIcon icon={"faCrown"} />
                <div style={{ marginLeft: 3 }}>
                  <ProfileIcon size={"sm"} />
                </div>
                {SCREEN_WIDTH > 340 ? (
                  <div style={{ marginLeft: 3 }}>
                    <ProfileIcon size={"sm"} />
                  </div>
                ) : (
                  false
                )}
              </div>
              <div
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
