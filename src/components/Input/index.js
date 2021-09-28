import { GRAY2, SCREEN_WIDTH } from "../../style";

export const Input = ({ value, onChange, placeholder, inputMode, style, type }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      readOnly={onChange ? false : true}
      inputMode={inputMode ?? "text"}
      placeholder={placeholder}
      type={type ?? ""}
      style={{
        width: SCREEN_WIDTH - 60,
        backgroundColor: GRAY2,
        border: "none",
        padding: 10,
        borderRadius: 10,
        ...style,
      }}
    />
  );
};
