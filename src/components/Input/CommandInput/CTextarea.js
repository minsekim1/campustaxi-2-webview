import { GRAY7, GRAY8, SCREEN_WIDTH } from "../../../style";
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
  //#region 컬러선택시 특정위치에 컬러넣기
  //index -> -1 필요
  let codes = "<b>Will This Work?</b>";
  useEffect(() => {
    if (!!commandWindow.color && commandWindow.index === index) {
      let color = GRAY8;
      let backgroundColor = "white";
      switch (commandWindow.color) {
        case "red":
          color = "#FF003D";
          break;
        case "blue":
          color = "#0057FF";
          break;
        case "brown":
          color = "#91624A";
          break;
        case "purple":
          color = "#8F00FF";
          break;
        case "yellow":
          backgroundColor = "#FFF500";
          break;
        case "orange":
          backgroundColor = "#FF7D3A";
          break;
        case "gray":
          backgroundColor = "#E8ECEF";
          break;
        default:
          break;
      }
      let origin = ref.current.innerHTML;
      let split = typeof origin === "string" ? origin.split(/(?:<|>)+/) : "";
      let left = "";
      let right = "";
      if (split.length === 5) {
        left = split[0] + "<" + split[1] + ">" + split[2].slice(0, commandWindow.pos - 1);
        right = split[2].slice(commandWindow.pos, origin.length) + "<" + split[3] + ">" + split[4];
      } else {
        let p = commandWindow.pos;
        let i;
        try {
          // 배열 번호(p)와 문자열 번호 구하기(i)
          for (i = 0; split[i].length < p; i++) p -= split[i].length;
          // console.log(p,i) index:2,pos:3
          // left 구하기
          for (let i = 0; i <= p; i++) left += split[i] + (i % 2 === 0 ? "<" : ">");
          left += split[p + 1].slice(0, i);
          // right 구하기
          right += split[p + 1].slice(i + 1, split[p].length);
          for (let i = p + 1; i < split[i].length + 2; i++) {
            right += (i % 2 === 0 ? "<" : ">") + split[i + 1];
            console.log(split[i + 1], i % 2 === 0 ? "<" : ">");
          }
          right += ">"
        } catch (e) {
          console.debug(e);
        }
      }
      console.log("left", left, "right", right);
      ref.current.innerHTML = `${left}<span style='color:${color};background-color:${backgroundColor}'>${commandWindow.color}</span>${right}`;
      // if (origin.length >= commandWindow.pos) {
      //   const left = origin.slice(0, commandWindow.pos);
      //   const right = origin.slice(commandWindow.pos, origin.length);
      //   console.log("origin", origin, left, right);
      //   ref.current.innerHTML = `${left}<span style='color:${color};background-color:${backgroundColor}'>${commandWindow.color}</span>${right}`;
      // }
    }
  }, [commandWindow.color]);
  //#endregion
  const onInput = useCallback(
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
      {/* <TextareaAutosize
        // rows={rows ?? 1}
        placeholder={placeholder}
        maxRows={maxrows}
        // value={commandInputList[index].content}
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
      ></TextareaAutosize> */}

      <div
        ref={ref}
        onFocus={onFocus}
        onInput={onInput}
        onBlur={onBlur}
        dangerouslySetInnerHTML={{ __html: codes }}
        contentEditable
        suppressContentEditableWarning
        style={{ width: SCREEN_WIDTH - 60, color: GRAY7, outline: "none" }}
      />
      {/* <div onInputCapture={(e)=>onChangeInput(e.target.innerText)} contentEditable suppressHydrationWarning style={{width:SCREEN_WIDTH - 60, outline:'none'}}>
        <span style={{ color: "black" }} >asd</span>
        <span style={{ color: "red" }}>asd</span>
        {commandInputList[index].content}
      </div> */}
    </>
  );
};
