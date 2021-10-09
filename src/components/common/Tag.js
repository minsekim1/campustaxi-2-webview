import { GRAY1, GRAY2, GRAY3, GRAY4, GRAY5, GRAY7, GRAY8, textOverflowHidden } from "../../style";
import "../../index.css";
export const Tag = ({ text, index }) => {
  const marginLeft = index == 0 ? 0 : 4;
  return (
    <div
      style={{
        ...textOverflowHidden,
        fontSize: 12,
        color: GRAY7,
        borderStyle: "solid",
        borderColor: GRAY2,
        borderWidth: 1,
        borderRadius: 10,
        lineHeight: 2,
        height: 20,
        padding: "0px 6px 4px",
        backgroundColor: GRAY3,
        marginLeft: marginLeft,
      }}
    >
      {text}
    </div>
  );
};
