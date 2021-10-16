import { GRAY2, GRAY7, SCREEN_WIDTH } from "../../../style";
import { useState, useCallback, useRef } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { position, offset } from "caret-pos";
import { useRecoilState } from "recoil";
import { commandInputListState, commandWindowState } from "./../../recoil";

export const CTextarea = ({ style, maxrows, index }) => {
  const [placeholder, setPlaceHolder] = useState("");
  const [rowIndex, setRowIndex] = useState({ height: 0, index: 0 });
  const [beforeInput, setBeforeInput] = useState("");
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);

  const ref = useRef();
  const onChangeInput = useCallback(
    (e) => {
      //#region #누르면 명령어창 보여줌
      if (e.nativeEvent.data == "#") {
        const { left, top, height } = offset(ref.current);
        setCommandWindow({ visible: true, top: top - 20, left: left, index: index });
      } else {
        setCommandWindow({ ...commandWindow, visible: false, index: -1 });
      }
      //#region 내용업데이트
      console.log("...commandInputList.slice(0, index)", { ...commandInputList.slice(0, index) });
      setCommandInputList([
        ...commandInputList.slice(0, index),
        { ...commandInputList[index], content: e.target.value },
        ...commandInputList.slice(index + 1, 999),
      ]);
      //#endregion
      setBeforeInput(e.target.value);
      //#endregion #누르면 명령어창 보여줌
      //#region 줄 수 제한 높이체크
      if (!!maxrows) {
        if (rowIndex.index < maxrows && rowIndex.height < e.target.scrollHeight)
          setRowIndex({ index: rowIndex.index + 1, height: e.target.scrollHeight });
        else if (rowIndex.height < e.target.scrollHeight) e.target.value = e.target.value.slice(0, -1);
        e.target.style.maxHeight = rowIndex.height - 4 + "px";
        e.target.style.height = rowIndex.height - 4 + "px";
      }
      //#endregion 줄 수 제한 높이체크
    },
    [rowIndex, beforeInput, commandWindow, index]
  );
  const onBlur = () => {
    setPlaceHolder("");
  };
  const onFocus = () => {
    setCommandWindow({ ...commandWindow, index: index });
    setPlaceHolder('명령어 사용시 "#"를 입력하세요.');
  };
  return (
    <TextareaAutosize
      value={commandInputList[index].content}
      ref={ref}
      // rows={rows ?? 1}
      onFocus={onFocus}
      onChange={onChangeInput}
      placeholder={placeholder}
      maxRows={maxrows}
      onBlur={onBlur}
      // onResize={onResizeInput}
      // defaultValue={defaultValue}
      style={
        style
          ? style
          : {
              width: SCREEN_WIDTH - 60,
              height: "20px",
              border: "none",
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
