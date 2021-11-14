import { HEADER_HEIGHT } from "../style";

export const TitleHeader = ({ title = "" }) => {
  return (
		<div style={{
			fontWeight: "bold", fontSize: 15,
			display: "flex", justifyContent: "center",
			height: HEADER_HEIGHT,
			alignItems:'center'
		}}>
      {title}
    </div>
  );
};
