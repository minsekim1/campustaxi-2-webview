import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { commandInputListState } from "../../recoil";
import { WithContext as ReactTags } from "react-tag-input";

import "../../../App.css";
import { ContentItemType } from "../../../types/Command";

const KeyCodes = {
  comma: 188,
  space: 32,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma, KeyCodes.space];

// tagList:[], inputValue:""
type Props = {
  index: number;
  data: ContentItemType;
  disable?: boolean;
}
export const CTag = ({ index, disable, data }: Props) => {
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const tagList = disable ? data.content.tagList  : commandInputList[index].content.tagList;
  const inputValue = disable ? data.content.inputValue :commandInputList[index].content.inputValue;
 
  //#region 태그기본함수
  // 태그삭제
  const handleDelete = (i: number) => {
    setCommandInputList([
      ...commandInputList.slice(0, index),
      {
        ...commandInputList[index],
        content: { inputValue: inputValue, tagList: tagList.filter((tag: string, index: number) => index !== i) },
      },
      ...commandInputList.slice(index + 1, 999),
    ]);
  };
  // 태그추가
  const handleAddition = (tag: any) => {
    setCommandInputList([
      ...commandInputList.slice(0, index),
      { ...commandInputList[index], content: { inputValue: "", tagList: [...tagList, tag] } },
      ...commandInputList.slice(index + 1, 999),
    ]);
  };
  //#endregion
  return (
    <>
      <ReactTags
        className={disable ? "disableTag" : ""}
        placeholder={"엔터, 스페이스, 쉼표로 태그를 구분해주세요."}
        maxLength={30}
        allowDeleteFromEmptyInput={false}
        inline
        tags={tagList}
        readOnly={disable}
        // inputValue={inputValue}
        // suggestions={suggestionList}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        // handleInputChange={handleInputChange}
        delimiters={delimiters}
      // renderSuggestion={({ text }, query) => (
      //   <div style={{ fontSize: 11 }}>
      //     {text}
      //     {/* ({query}) */}
      //   </div>
      // )}
      />
    </>
  );
};
