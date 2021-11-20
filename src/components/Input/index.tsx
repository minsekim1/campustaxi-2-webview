import { GRAY2, GRAY7, GRAY9 } from "../../style";
import { forwardRef, useState, useCallback, Ref } from "react";
import { CreateBottomModalState, SearchPositionState } from "../recoil";
import { useRecoilState } from "recoil";
import { Icon } from "../common/Icon";
import TextareaAutosize from "react-autosize-textarea";
import useWindowDimensions from "../../hook/useWindowDimensions";

type InputProps = {
  onChange: (t: string) => void;
  placeholder?: string;
  inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
  type?: string;
  readOnly?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
};
export const Input = ({
  onChange,
  placeholder,
  inputMode,
  type,
  readOnly = false,
  disabled = false,
  defaultValue,
  inputRef,
}: InputProps) => {
  const onChangeInupt = (e: any) => {
    if (onChange) onChange(e.target.value);
  };
  const { height, width } = useWindowDimensions();
  return (
    <input
      ref={inputRef}
      defaultValue={defaultValue}
      onChange={onChangeInupt}
      readOnly={readOnly ?? false}
      inputMode={inputMode ?? "text"}
      placeholder={placeholder}
      type={type ?? ""}
      disabled={disabled ?? false}
      style={{
        width: width - 60,
        backgroundColor: GRAY2,
        border: "none",
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
        color: GRAY7,
        outline: "none",
      }}
    />
  );
};

type TextareaType = {
  placeholder?: string;
  style?: object;
  maxrows?: number;
  TextareaRef?: any;
  disabled?: boolean;
  defaultValue?: string;
};
export const Textarea = ({ placeholder, style, maxrows, TextareaRef, disabled = false, defaultValue }: TextareaType) => {
  const [rowIndex, setRowIndex] = useState({ height: 0, index: 0 });
  const { height, width } = useWindowDimensions();
  const onChangeInput = useCallback(
    (e) => {
      // if (!!onChange) onChange(e.target.value);
      if (!!maxrows) {
        if (rowIndex.index < maxrows && rowIndex.height < e.target.scrollHeight)
          setRowIndex({ index: rowIndex.index + 1, height: e.target.scrollHeight });
        else if (rowIndex.height < e.target.scrollHeight) e.target.value = e.target.value.slice(0, -1);
        e.target.style.maxHeight = rowIndex.height - 4 + "px";
        e.target.style.height = rowIndex.height - 4 + "px";
      }
    },
    [rowIndex, maxrows]
  );
  return (
    <TextareaAutosize
      disabled={disabled}
      ref={TextareaRef}
      // rows={rows ?? 1}
      onChange={onChangeInput}
      placeholder={placeholder}
      maxRows={maxrows}
      // onResize={onResizeInput}
      defaultValue={defaultValue}
      style={
        style
          ? style
          : {
            width: width - 60,
            height: "20px",
            backgroundColor: GRAY2,
            border: "none",
            padding: 10,
            borderRadius: 10,
            fontSize: 15,
            color: GRAY7,
            resize: "none",
            fontFamily: "AppleSDGothic",
            overflow: "hidden",
            outline: "none",
            
          }
      }
    />
  );
};

type SearchProps = {
  value: any;
  placeholder?: string;
  onChange?: (t: string) => void;
  autoFocus?: boolean;
};
export const InputSearch = ({ value, placeholder, onChange, autoFocus = false }: SearchProps) => {
  const { height, width } = useWindowDimensions();
  const onChangeInput = (e: any) => {
    value.current = e.target.value;
    if (onChange) onChange(e.target.value);
  };
  return (
    <div
      style={{
        width: width - 60,
        backgroundColor: GRAY2,
        border: "none",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Icon type={"regular"} name={"faSearch"} size={"lg"} />
      <input
        autoFocus={autoFocus}
        onChange={onChangeInput}
        style={{
          marginLeft: 6,
          height: "100%",
          backgroundColor: GRAY2,
          border: "none",
          width: width * 0.7,
          fontSize: width < 400 ? 13 : 14,
          color: GRAY9,
          outline: "none",
        }}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

type InputMapProps = {
  placeholder: string;
  position: "start" | "end" | "place" | "";
}
export const InputMap = ({ placeholder, position }: InputMapProps) => {
  const [, setVisible] = useRecoilState(CreateBottomModalState);
  const [, setVisibleSearch] = useRecoilState(SearchPositionState); //visibleSearch
  const { height, width } = useWindowDimensions();
  return (
    <div
      style={{
        width: width - 60,
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
