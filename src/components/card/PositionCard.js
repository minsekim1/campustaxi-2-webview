import { GRAY5, GRAY6, GRAY7, GRAY8, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY4 } from "./../../style/index";

export const PositionCard = ({ title, desc, address, url, img, onClick, onClickDelete }) => {
  return (
    <div style={{ padding: "16px 16px 0 16px", display: "flex" }} onClick={onClick ? onClick : () => {}}>
      <div style={{ flex: 1 }}>
        <img src={img} width={"100%"} style={{ borderRadius: 20 }}></img>
      </div>
      <div style={{ flex: 4, marginLeft: 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
      </div>
      {typeof onClickDelete === "function" ? (
        <div style={{ position: "relative", width: 16, height: 28, top: -8 }} onClick={onClickDelete}>
          <Icon type={"regular"} name={"faTrashAlt"} size={"sm"} color={GRAY4} />
        </div>
      ) : (
        false
      )}
    </div>
  );
};
export const PositionCardReverse = ({ title, desc, address, url, img }) => {
  // onClick={onClick ? onClick : () => {}}
  return (
    <div style={{ padding: "8px 16px 0 16px", display: "flex" }}>
      <div style={{ flex: 4, marginRight: 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
      </div>
      <div style={{ flex: 1 }}>
        <img src={img} width={"100%"} style={{ borderRadius: 20 }}></img>
      </div>
    </div>
  );
};
