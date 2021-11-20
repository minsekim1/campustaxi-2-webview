import { GRAY6, GRAY7, GRAY8, textOverflowHidden } from "../../style";
import { Icon } from "../common/Icon";
import { GRAY4 } from "./../../style/index";

export const PositionCard = ({
  title,
  desc,
  address,
  url,
  img,
  onClick = ()=> {},
  onClickDelete,
  imgWidth = "100%",
  padding = "16px 16px 0 16px",
}) => {
  return (
    <div style={{ padding: padding, display: "flex", flex: 1 }} onClick={onClick ? onClick : () => {}}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img alt={" "} src={img} width={imgWidth} style={{ borderRadius: 12, maxHeight: "5em", maxWidth:"5em" }}></img>
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
export const PositionCardReverse = ({ title, desc,imgWidth = "100%", address, url, img }) => {
  // onClick={onClick ? onClick : () => {}}
  return (
    <div style={{ padding: "8px 16px 0 16px", display: "flex" }}>
      <div style={{ flex: 4, marginRight: 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc}</div>
      </div>
      <div style={{ flex: 1 }}>
        <img alt={" "} src={img} width={imgWidth} style={{ borderRadius: 12, maxHeight: "5em", maxWidth: "5em" }}></img>
      </div>
    </div>
  );
};
