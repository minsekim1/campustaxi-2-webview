import { GRAY1, GRAY2, GRAY3, GRAY4, GRAY5, GRAY8 } from "../../style"
import "../../index.css"
export const Tag = ({text}) => {
	return (
    <div
      style={{
        fontSize: 12,
        borderStyle: "solid",
				borderColor: GRAY2,
				borderWidth:1,
        borderRadius: 10,
        backgroundColor: GRAY3,
        padding: 6,
				fontFamily: "AppleSDGothicNeo",
				color: GRAY8,
				marginLeft:4
      }}
    >
      {text}
    </div>
  );
}