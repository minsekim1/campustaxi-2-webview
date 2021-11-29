import { GRAY6, GRAY7, GRAY8 } from "../../../style";
import { useState, useCallback, useRef, useEffect } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { offset, position } from "caret-pos";
import { useRecoilState } from "recoil";
import { commandInputListState, commandWindowState } from "../../recoil";
import { getPlatform } from "../../common/function/getPlatform";
import _ from "lodash";
import useWindowDimensions from "../../../hook/useWindowDimensions";
import { ContentItemType } from "../../../types/Command";
export const platform = getPlatform();

type Props = {
  style?: any;
  maxrows?: number;
  index: number;
  data: ContentItemType;
  disable?: boolean;
}
export const CTextarea = ({ style, maxrows, index, data, disable = false }: Props) => {
  const [placeholder, setPlaceHolder] = useState("");
  const [rowIndex, setRowIndex] = useState({ height: 0, index: 0 });
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const { height, width } = useWindowDimensions();
  const ref = useRef<any>();
  // 텍스트 변한 위치 찾기
  const beforeInput = useRef("");

  //#region 이전 기본값 넣기
  useEffect(() => {
    if (ref && ref.current && data && typeof data.content === "string") {
      ref.current.innerHTML = data.content
    }
  }, [ref.current])
  //#endregion
  //#region 컬러선택시 특정위치에 컬러넣기
  let codes = "";
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
      if (ref)
        if (ref.current && ref.current.innerHTML) {
          const origin = ref.current.innerHTML;
          const left = origin.slice(0, commandWindow.pos);
          const right = origin.slice(commandWindow.pos, origin.length);
          ref.current.innerHTML = `${left}<span style='color:${color};background-color:${backgroundColor}'>${commandWindow.color}</span>${right}`;
        }
    }
  }, [commandWindow.color]);
  //#endregion
  const onInput = useCallback((e: any) => {
    //#region placeholer 삭제
    if (placeholder !== "" && e.target.innerHTML !== "") setPlaceHolder("");
    //#endregion
    //#region 추가된 텍스트 위치 찾기 (pos)
    let pos;
    const len =
      beforeInput.current.length > e.target.innerHTML.length ? beforeInput.current.length : e.target.innerHTML.length;
    for (pos = 0; pos < len; pos++) {
      if (beforeInput.current[pos] !== e.target.innerHTML[pos]) break;
    }
    //#endregion
    //#region #누르면 명령어창 보여줌 || 안드로이드 설정(한번에 여러개들어옴)
    if (
      e.nativeEvent.data == "#" ||
      (platform === "android" && !!e.nativeEvent.data && e.nativeEvent.data[e.nativeEvent.data.length - 1] === "#")
    ) {
      let { left, top, height } = offset(ref.current);
      //#region 가로이동 제한 & height 화면 안 넘어가게 제한
      // 가로제한
      if (left + 260 > width && left < 260) {
        left = commandWindow.left;
      } else if (width - left < 260 && left > 260) left -= 280;
      // 세로제한
      let heightCommand = 448;
      top -= heightCommand;
      if (top < 0) {
        heightCommand += top - height;
        top = 0;
      }
      //#endregion
      setCommandWindow({
        ...commandWindow,
        beforeInnerHTML: e.target.innerHTML,
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
      beforeInput.current = e.target.innerHTML;
      setCommandInputList([
        ...commandInputList.slice(0, index),
        { ...commandInputList[index], content: e.target.innerHTML },
        ...commandInputList.slice(index + 1, 999),
      ]);
    //#endregion
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
  }, [rowIndex, beforeInput.current, commandWindow, index]);
  const onBlur = useCallback(() => {
    setPlaceHolder("");
  },[]);
  const onFocus = useCallback(() => {
    setCommandWindow({
      ...commandWindow,
      visible: false,
      top: 0,
      left: 0,
      index: index,
      height: 0,
      pos: 0,
    });
    if (ref.current.innerHTML === "") setPlaceHolder('명령어 사용시 "#"을 입력하세요.');
  }, [commandWindow, ref]);

  return (
    <>
      <div
        ref={ref}
        onFocus={onFocus}
        onInput={onInput}
        onBlur={onBlur}
        dangerouslySetInnerHTML={{ __html: codes }}
        contentEditable={!disable}
        suppressContentEditableWarning
        spellCheck={false}
        style={{ width: width - 60, color: GRAY7, outline: "none" }}
      />
      <div style={{ color: GRAY6, fontSize: 15, position: "relative", height: 0, top: "-1.4em", zIndex: -1 }}>{index === 0 && (!data || data.content === "") ? '내용을 반드시 입력해주세요!' : placeholder}</div>
    </>
  );
};
