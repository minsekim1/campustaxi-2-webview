import { useState } from "react";
import { GRAY2 } from "../../style";

export const Radio = ({ data, title, defaultIndex, onClick }) => {
  const [clicked, setClicked] = useState(defaultIndex);
  const onChangeInput = (i) => {
    setClicked(i);
    if (onClick) onClick(i);
  };
  return (
    <div style={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}>
      {data.map((item, i) => (
        <div key={i.toString()}>
          <div
            onClick={() => onChangeInput(i)}
            style={{
              backgroundColor: clicked === i ? "white" : GRAY2,
              borderStyle: "solid",
              borderColor: clicked === i ? GRAY2 : "white",
              padding: "12px 16px",
              borderRadius: 10,
              textAlign: "center",
            }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};
