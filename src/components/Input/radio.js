import { useState } from "react";

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
          <input
            name="name"
            type="radio"
            checked={clicked == i}
            readOnly
            onClick={() => onChangeInput(i)}
            style={{ marginRight: 12 }}
          />
          {item}
        </div>
      ))}
    </div>
    // <div>
    //   <label className="switch">
    //     <input type="checkbox" checked={clicked} readOnly onClick={onChangeInput} />
    //     <span className="slider round"></span>
    //   </label>
    //   {title}
    // </div>
  );
};
