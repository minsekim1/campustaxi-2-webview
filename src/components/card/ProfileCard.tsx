import { GRAY6, GRAY7, SUB_BLUE, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY4 } from "../../style/index";
import { ProfileIcon } from "../Icon/ProfileIcon";
import { userDataState } from "../recoil";
import { useRecoilState } from "recoil";
import { getfetch, postfetch } from "../common";
import { UserType } from "../../types/User";
import { useEffect } from "react";
import _ from "lodash";
import useSWR from "swr";
import { fetcherBlob } from "../../hook/useSWR/fetcher";

export const togglerFollow = async (myUserData: UserType, other_user_id: number) => {
  if (!myUserData.id) return;
  console.log(myUserData);

  // const list = myUserData.follower.map((user)=>user.id).

  // if (true) {
  //   // 좋아요 추가
  //   const list = _.uniq(myUserData.like_courses.map((d) => d.id).concat(Number(other_user_id)))
  //   await postfetch(`/users/${myUserData.id}`, JSON.stringify({ followers: list }), true, "PUT")
  //   // 좋아요 게시글에 반영 && 내 팔로우 수 변경
  //   mutate();
  //   //
  //   mutate();
  // } else {
  //   // 좋아요 삭제
  //   const list = myUserData.like_courses.map((d) => d.id).filter((id) => id !== Number(id))
  //   await postfetch(`/users/${myUserData.id}`, JSON.stringify({ like_courses: list }), true, "PUT").then((d) => d && d.id ? setUserData(d) : false);
  //   // 좋아요 게시글에 반영
  //   mutate();
  // }

  // postfetch(`/users/${myUserData.id}`, {})
};

type Props = {
  title?: string;
  desc?: string;
  address?: string;
  url?: string;
  img?: string;
  userId?: number;
  onClick?: () => void;
  onClickDelete?: () => void;
  disable?: boolean;
  icon?: string;
};
export const ProfileCard = ({
  title,
  desc,
  address,
  img,
  userId,
  onClick,
  onClickDelete,
  disable,
  icon = "faCrown",
}: Props) => {
  const [userData, setUserData] = useRecoilState(userDataState);
  
  return (
    <div style={{ height: 80 }}>
      <div style={{ padding: "16px 16px 0 16px", display: "flex", alignItems: "center" }}>
        {/* 유저아이콘 */}
        <div
          style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
          onClick={onClick ? onClick : () => {}}
        >
          <ProfileIcon icon={icon ? icon : ""} img={img} />
        </div>
        {/* 상세내용 */}
        <div style={{ flex: 4, marginLeft: 16, alignSelf: "center" }} onClick={onClick ? onClick : () => {}}>
          <div style={{ ...textOverflowHidden, fontSize: 14, color: GRAY7, fontWeight: "bold" }}>{address}</div>
          <div style={{ ...textOverflowHidden, fontSize: 12, marginTop: 3, color: GRAY6 }}>{title}</div>
          <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY6 }}>{desc}</div>
        </div>
        {/* 삭제버튼 */}
        {typeof onClickDelete === "function" ? (
          <div style={{ position: "relative", width: 16, height: 28, top: -8 }} onClick={onClickDelete}>
            <Icon type={"regular"} name={"faTrashAlt"} size={"sm"} color={GRAY4} />
          </div>
        ) : (
          false
        )}
        {/* 팔로우버튼 */}
        {!userId || userData?.id !== userId ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 12,
              fontWeight: "bold",
              justifyContent: "center",
              backgroundColor: !userData ? "gray" : SUB_BLUE,
              color: "white",
              borderRadius: 20,
              padding: "3px 20px",
              height: 22,
            }}
            onClick={() => (!userData ? alert("로그인이 필요한 기능입니다!") : togglerFollow(userData, 2))}
          >
            팔로우
          </div>
        ) : (
          false
        )}
      </div>
      {/* 덮개 */}
      {disable ? (
        <div
          style={{ position: "relative", width: "100%", height: 70, background: "rgba(255,255,255,0.6", top: -70 }}
        />
      ) : (
        false
      )}
    </div>
  );
};
