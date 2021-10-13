import { GRAY2, GRAY7, SCREEN_WIDTH } from "../../style";
import { useState, useCallback, useRef } from "react";
import TextareaAutosize from "react-autosize-textarea";

import { Editor } from '@hexx/editor';
import {
  BlockMap, // default block mapping
  // preset
  PlusButton,
  TuneButton,
  InlineTool,
  // additional inline tool
  InlineCode,
  InlineMarker,
  InlineLink
} from '@hexx/editor/components';

export const CommandTextarea = ({}) => {
  const [textList, setTextList] = useState([{ type: "text", content: "" }]);
  const [commandData, setCommandData] = useState({ visible: false,x:0,y:0 });
  const focusIndex = useRef(0);

  return (
    <div>
      <Editor blockMap={BlockMap}>
        <PlusButton />
        <TuneButton />
        <InlineTool>
          <InlineMarker />
          <InlineCode />
          <InlineLink />
        </InlineTool>
      </Editor>
      {/* <CommandList data={commandData} />
      {textList.map((section, i) => {
        const onKeyDown = (e) => {
          if (e.key === "#") {
            setCommandData({ visible: true, x: e.target.offsetwidth, y: 0 });
          }
          console.log("e.target", (e.target));
        };
        // const onChangeInput = (section, i, e) => {
        // focusIndex.current = i;
        // if (section.type === "text") {
        //   let contents = textList;
        //   contents[i].content = e.target.value;
        //   if(e.target.value.includes('#')) setShowCommand(true)
        //   setTextList(contents);
        // } else alert(JSON.stringify(section) + i);
        // console.log(e);
        // };
        return (
          <div key={i.toString()}>
            <TextareaAutosize
              // onChange={(e) => onChangeInput(section, i, e)}
              onKeyDown={onKeyDown}
              placeholder={'내용을 입력해주세요. \n명령어 사용 시 "#"을 입력하세요.'}
              style={{
                border: "none",
                width: "100%",
                fontSize: 15,
                paddingRight: 6,
                fontFamily: "AppleSDGothic",
                backgroundColor: "transparent",
                resize: "none",
                overflow: "hidden",
                outline: "none",
              }}
            />
          </div>
        );
      })} */}
    </div>
  );
};

const CommandList = ({ data }) => {
  const x = data.x
  const y = data.y
  const visible = data.visible;
  return (
    <div>
      <div style={{ position: "relative", height:0, top: y, left: x, display: !visible ? "none" : "" }}>★</div>
    </div>
  );
}
//#region 
const getCaretCoordinates = (fromStart = true) => {
  let x, y;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(fromStart ? true : false);
      const rect = range.getClientRects()[0];
      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
  }
  return { x, y };
};
const getSelection = (element) => {
  let selectionStart, selectionEnd;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const range = window.getSelection().getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(element);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    selectionStart = preSelectionRange.toString().length;
    selectionEnd = selectionStart + range.toString().length;
  }
  return { selectionStart, selectionEnd };
};

//#endregion
