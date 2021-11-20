import useWindowDimensions from "../hook/useWindowDimensions";
import { HEADER_HEIGHT } from "../style";

export const TitleHeader = ({ title = "" }) => {
	const { height, width } = useWindowDimensions();
  return (
		<div style={{
			width:width,
			fontWeight: "bold", fontSize: 15,
			display: "flex", justifyContent: "center",
			height: HEADER_HEIGHT,
			alignItems:'center'
		}}>
      {title}
    </div>
  );
};
