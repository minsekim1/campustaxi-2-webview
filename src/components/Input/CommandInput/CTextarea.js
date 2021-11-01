import { GRAY7, SCREEN_WIDTH } from "../../../style";
import { useState, useCallback, useRef, useEffect } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { offset, position } from "caret-pos";
import { useRecoilState } from "recoil";
import { commandInputListState, commandWindowState } from "./../../recoil";
import { getPlatform } from "../../common/function/getPlatform";
export const platform = getPlatform();

export const CTextarea = ({ style, maxrows, index }) => {
  const [placeholder, setPlaceHolder] = useState("");
  const [rowIndex, setRowIndex] = useState({ height: 0, index: 0 });
  const [beforeInput, setBeforeInput] = useState("");
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);

  const ref = useRef();
  const RedText = ()=>{return <span style={{ color: "red" }}>asd</span>;}
  //#region 컬러선택시 특정위치에 컬러넣기
  //index -> -1 필요
  useEffect(() => {
    if (!!commandWindow.color && commandWindow.index === index)
    {
      ref.current.value = <RedText/>;
      
    }
  }, [commandWindow.color]);
  //#endregion
  const onChangeInput = useCallback(
    (e) => {
      //#region #누르면 명령어창 보여줌 || 안드로이드 설정(한번에 여러개들어옴)
      if (
        e.nativeEvent.data == "#" ||
        (platform === "android" && !!e.nativeEvent.data && e.nativeEvent.data.includes("#"))
      ) {
        let { left, top, height, pos } = position(ref.current);
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
          pos: pos,
        });
      } else {
        setCommandWindow({ ...commandWindow, visible: false, index: -1 });
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
    if (commandWindow.index != index) {
      if (commandWindow.visible) setCommandWindow({ ...commandWindow, visible: false, index: index });
      else setCommandWindow({ ...commandWindow, index: index });
    }
    setPlaceHolder('명령어 사용시 "#"을 입력하세요.');
  };
  return (
    <>
      <TextareaAutosize
        ref={ref}
        // rows={rows ?? 1}
        onFocus={onFocus}
        onChange={onChangeInput}
        placeholder={placeholder}
        maxRows={maxrows}
        onBlur={onBlur}
        value={commandInputList[index].content}
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
      ></TextareaAutosize>
      {/* <div onInputCapture={(e)=>onChangeInput(e.target.innerText)} contentEditable suppressHydrationWarning style={{width:SCREEN_WIDTH - 60, outline:'none'}}>
        <span style={{ color: "black" }} >asd</span>
        <span style={{ color: "red" }}>asd</span>
        {commandInputList[index].content}
      </div> */}
    </>
  );
};
