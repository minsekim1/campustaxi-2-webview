import "../../style/switch.css";

export const Switch = ({value, onPress, title}) => {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={value} readOnly onClick={onPress} />
        <span className="slider round"></span>
      </label>
      {title}
    </div>
  );
};
