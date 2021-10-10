import "../../style/switch.css";
import { useState } from 'react';
import { GRAY6, GRAY7, GRAY8, GRAY9 } from "../../style";

export const Switch = ({ defalutValue, title, onChange }) => {
  const [clicked, setClicked] = useState(defalutValue);
  const onChangeInput = (b) => {
    if (onChange) onChange(b);
    setClicked(b);
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        <label className="switch">
          <input type="checkbox" checked={clicked || false} readOnly onClick={()=>onChangeInput(!clicked)} />
          <span className="slider round"></span>
        </label>
      </div>
      <div style={{ color: clicked ? GRAY9 : GRAY6, marginLeft: 8 }}>{title}</div>
    </div>
  );
};
