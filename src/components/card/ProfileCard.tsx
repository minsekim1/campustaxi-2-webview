import { GRAY6, GRAY7, SUB_BLUE, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY4 } from "../../style/index";
import { ProfileIcon } from "../Icon/ProfileIcon";

export const togglerFollow = (my_user_id: number, your_user_id: number) => {
  alert("팔로우!");
  // postfetch('/follow')
};

type Props = {
  title?: string;
  desc?: string;
  address?: string;
  url?: string;
  img?: string;
  onClick?: ()=>void;
  onClickDelete?: ()=>void;
  disable?: boolean;
  icon?: string;
};
export const ProfileCard = ({ title, desc, address, url, img, onClick, onClickDelete, disable, icon="faCrown" }: Props) => {
  return (
    <div style={{ height: 80 }}>
      <div
        style={{ padding: "16px 16px 0 16px", display: "flex", alignItems: "center" }}
        onClick={onClick ? onClick : () => {}}
      >
        {/* 유저아이콘 */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ProfileIcon icon={icon ? icon : ""} />
        </div>
        {/* 상세내용 */}
        <div style={{ flex: 4, marginLeft: 16, alignSelf: "center" }}>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            fontWeight: "bold",
            justifyContent: "center",
            backgroundColor: SUB_BLUE,
            color: "white",
            borderRadius: 20,
            padding: "3px 20px",
            height: 22,
          }}
          onClick={() => togglerFollow(1, 2)}
        >
          팔로우
        </div>
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
