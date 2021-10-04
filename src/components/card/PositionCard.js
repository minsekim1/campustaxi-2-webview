import { GRAY5, GRAY6, GRAY7, GRAY8, textOverflowHidden } from "../../style";

export const PositionCard = ({ title, desc, address, url, img, onClick }) => {
  return (
    <div style={{ padding: "16px 16px 0 16px", display: "flex" }} onClick={onClick ? onClick : () => {}}>
      <div style={{ flex: 1}}>
        <img src={img} width={"100%"} style={{ borderRadius: 20}}></img>
      </div>
      <div style={{ flex: 4, marginLeft: 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address + address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc + desc + desc}</div>
      </div>
    </div>
  );
};
export const PositionCardReverse = ({ title, desc, address, url, img, onClick }) => {
  return (
    <div style={{ padding: "8px 16px 0 16px", display: "flex" }} onClick={onClick ? onClick : () => {}}>
      <div style={{ flex: 4, marginRight: 16, alignSelf: "center" }}>
        <div style={{ ...textOverflowHidden, fontSize: 12, color: GRAY7 }}>{address + address}</div>
        <div style={{ ...textOverflowHidden, fontSize: 15, color: GRAY8 }}>{title}</div>
        <div style={{ ...textOverflowHidden, fontSize: 13, color: GRAY6 }}>{desc + desc + desc}</div>
      </div>
      <div style={{ flex: 1}}>
        <img src={img} width={"100%"} style={{ borderRadius: 20}}></img>
      </div>
    </div>
  );
};
