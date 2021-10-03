import { GRAY2, GRAY6, GRAY7, GRAY8, GRAY9, SCREEN_WIDTH } from "../../style";
import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fal from "@fortawesome/pro-light-svg-icons";
import * as fas from "@fortawesome/free-solid-svg-icons";
import * as far from "@fortawesome/pro-regular-svg-icons";
import { CreateBottomModalState, SearchPositionState } from "../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "../common/Icon";

export const Input = forwardRef(({ onChange, placeholder, inputMode, type, readOnly, disabled, defaultValue }, ref) => {
  const onChangeInupt = (e) => {
    if (onChange) onChange(e.target.value);
  }
  return (
    <input
      ref={ref}
      defaultValue={defaultValue}
      onChange={onChangeInupt}
      readOnly={readOnly ?? false}
      inputMode={inputMode ?? "text"}
      placeholder={placeholder}
      type={type ?? ""}
      disabled={disabled ?? false}
      style={{
        width: SCREEN_WIDTH - 60,
        backgroundColor: GRAY2,
        border: "none",
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
        color: GRAY7,
      }}
    />
  );
});

export const InputSearch = ({ value, placeholder, inputMode, type, readOnly, disabled, onChange }) => {
  const onChangeInput = (e) => {
    value.current = e.target.value;
    onChange(e.target.value);
  };
  return (
    <div
      style={{
        width: SCREEN_WIDTH - 60,
        backgroundColor: GRAY2,
        border: "none",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Icon type={"regular"} name={"faSearch"} size={"lg"} />
      <input
        onChange={onChangeInput}
        style={{
          marginLeft: 6,
          height: "100%",
          backgroundColor: GRAY2,
          border: "none",
          width: SCREEN_WIDTH - 100,
          fontSize: 15,
          color:GRAY9
        }}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export const InputMap = ({ value, placeholder, position }) => {
  const [, setVisible] = useRecoilState(CreateBottomModalState);
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  return (
    <div
      style={{
        width: SCREEN_WIDTH - 60,
        backgroundColor: GRAY2,
        border: "none",
        padding: 10,
        borderRadius: 10,
      }}
      onClick={() => {
        setVisible(false);
        setVisibleSearch({ visible: true, position: position });
      }}
    >
      <div style={{ float: "left", justifyContent: "center", alignItems: "center", display: "flex", marginRight: 6 }}>
        <Icon type={"regular"} name={"faSearch"} size={"lg"} />
      </div>
      <div style={{ color: "#63717f", fontSize: 15 }}>{placeholder}</div>
    </div>
  );
};
