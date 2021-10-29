import { GRAY7, SCREEN_WIDTH } from "../../../style";
import { useState, useCallback, useRef } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { offset } from "caret-pos";
import { useRecoilState } from "recoil";
import { commandInputListState, commandWindowState } from "../../recoil";
import { platform } from './CTextarea';

export const CH = ({ index, type = "h1" }) => {
  const [placeholder, setPlaceHolder] = useState("");
  const [rowIndex, setRowIndex] = useState({ height: 0, index: 0 });
  const [beforeInput, setBeforeInput] = useState("");
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);

  const ref = useRef();
  const onChangeInput = useCallback(
    (e) => {
      //#region #누르면 명령어창 보여줌 || 안드로이드 설정(한번에 여러개들어옴)
      if (
        e.nativeEvent.data == "#" ||
        (platform === "android" && !!e.nativeEvent.data && e.nativeEvent.data.includes("#"))
      ) {
        let { left, top, height } = offset(ref.current);
        //#region 가로이동 제한 & height 화면 안 넘어가게 제한
        // 가로제한
        if (left + 260 > SCREEN_WIDTH && left < 260) {
          left = commandWindow.left;
        } else if (SCREEN_WIDTH - left < 260 && left > 260) left -= 280;
        // 세로제한
        let heightCommand = 448;
        top -= heightCommand;
        if (top < 0) {
          heightCommand += top - height;
          top = 0;
        }
        //#endregion
        setCommandWindow({
          visible: true,
          top: top,
          left: left,
          index: index,
          height: heightCommand,
        });
      } else {
        setCommandWindow({ ...commandWindow, visible: false, index: -1, height: 0 });
      }
      //#region 내용업데이트
      setCommandInputList([
        ...commandInputList.slice(0, index),
        { ...commandInputList[index], content: e.target.value },
        ...commandInputList.slice(index + 1, 999),
      ]);
      //#endregion
      setBeforeInput(e.target.value);
      //#endregion #누르면 명령어창 보여줌
    },
    [rowIndex, beforeInput, commandWindow, index]
  );
  const onBlur = () => {
    setPlaceHolder("");
  };
  const onFocus = () => {
    if (commandWindow.index != index) {
      if (commandWindow.visible) setCommandWindow({ ...commandWindow, visible: false, index: index });
      else setCommandWindow({ ...commandWindow, index: index });
    }
    setPlaceHolder('명령어 사용시 "#"을 입력하세요.');
  };

  const style =
    type == "h1" ? { fontSize: 21, fontWeight: "bold" } : type == "h2" ? { fontSize: 18 } : { fontSize: 16 };
  return (
    <TextareaAutosize
      ref={ref}
      onFocus={onFocus}
      onChange={onChangeInput}
      placeholder={placeholder}
      onBlur={onBlur}
      defaultValue={commandInputList[index].content}
      style={{
        ...style,
        width: SCREEN_WIDTH - 60,
        height: "20px",
        border: "none",
        color: GRAY7,
        resize: "none",
        fontFamily: "AppleSDGothic",
        overflow: "hidden",
        outline: "none",
      }}
    />
  );
};