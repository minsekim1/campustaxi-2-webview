import { useState } from "react";
import { useRecoilState } from "recoil";
import { commandInputListState } from "../../recoil";
import { WithContext as ReactTags } from "react-tag-input";

import "../../../App.css";

const KeyCodes = {
  comma: 188,
  space: 32,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma, KeyCodes.space];

// tagList:[], inputValue:""
export const CTag = ({ index, type = "h1" }) => {
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const tagList = commandInputList[index].content.tagList;
  const inputValue = commandInputList[index].content.inputValue;
  // const [suggestionList] = useState([
  //   //setSuggestionList
  //   { id: "0", text: "캠퍼스택시" },
  //   { id: "1", text: "Campustaxi" },
  //   { id: "2", text: "문화" },
  //   { id: "3", text: "힐링" },
  //   { id: "4", text: "놀이" },
  //   { id: "5", text: "데이트" },
  //   { id: "6", text: "여행" },
  // ]);

  //#region 태그기본함수
  // 태그삭제
  const handleDelete = (i) => {
    setCommandInputList([
      ...commandInputList.slice(0, index),
      {
        ...commandInputList[index],
        content: { inputValue: inputValue, tagList: tagList.filter((tag, index) => index !== i) },
      },
      ...commandInputList.slice(index + 1, 999),
    ]);
  };
  // 태그추가
  const handleAddition = (tag) => {
    setCommandInputList([
      ...commandInputList.slice(0, index),
      { ...commandInputList[index], content: { inputValue: "", tagList: [...tagList, tag] } },
      ...commandInputList.slice(index + 1, 999),
    ]);
  };
  // 인풋수정
  const handleInputChange = (e) => {
    setCommandInputList([
      ...commandInputList.slice(0, index),
      { ...commandInputList[index], content: { inputValue: e, tagList: tagList } },
      ...commandInputList.slice(index + 1, 999),
    ]);
  };

  return (
    <>
      <ReactTags
        placeholder={"엔터, 스페이스, 쉼표로 태그를 구분해주세요."}
        maxLength={30}
        allowDeleteFromEmptyInput={false}
        inline
        tags={tagList}
        // inputValue={inputValue}
        // suggestions={suggestionList}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        // handleInputChange={handleInputChange}
        delimiters={delimiters}
        renderSuggestion={({ text }, query) => (
          <div style={{ fontSize: 11 }}>
            {text}
            {/* ({query}) */}
          </div>
        )}
      />
    </>
  );
};
