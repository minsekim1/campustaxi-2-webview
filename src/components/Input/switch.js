import "../../style/switch.css";
import { useState } from 'react';

export const Switch = ({ value, title }) => {
	const [clicked, setClicked] = useState(false);
	  const onChangeInput = (e) => {
      value.current = !clicked;
      setClicked(!clicked);
    };
  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={clicked} readOnly onClick={onChangeInput} />
        <span className="slider round"></span>
      </label>
      {title}
    </div>
  );
};
