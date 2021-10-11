import { GRAY5, GRAY6, GRAY7, GRAY8, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY4 } from "./../../style/index";
import { ProfileIcon } from './../Icon/ProfileIcon';

export const ProfileCard = ({ title, desc, address, url, img, onClick, onClickDelete}) => {
  return (
    <div style={{ padding: "16px 16px 0 16px", display: "flex" }} onClick={onClick ? onClick : () => {}}>
      {/* 유저아이콘 */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ProfileIcon icon={'faCrown'}/>
      </div>
      {/* 상세내용 */}
      <div style={{ flex: 4, marginLeft: 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
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
      <div style={{}} onClick={()=>alert("팔로우!")}>
        팔로우
      </div>
    </div>
  );
};