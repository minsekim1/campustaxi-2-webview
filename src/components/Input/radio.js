import { useState } from "react";

export const Radio = ({ value, title, initIndex }) => {
  const [clicked, setClicked] = useState(initIndex);
  const onChangeInput = (i) => {
    value.current = i;
    setClicked(i);
  };
	return (
    <div style={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}>
      {value.map((item, i) => (
        <div key={i.toString()}>
          <input
            name="name"
            type="radio"
            checked={clicked == i}
            readOnly
						onClick={() => onChangeInput(i)}
						style={{marginRight:6}}
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
