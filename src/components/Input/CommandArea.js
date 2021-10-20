import { GRAY6 } from "../../style";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "../common/Icon";
import { CTextarea } from "./CommandInput/CTextarea";
import { useRecoilState } from "recoil";
import { commandInputListState, commandWindowState, placePosState } from "../recoil";
import { FadeDiv } from "../FadeDiv";
import { CommandListRenderItem } from "./CommandInput/CommandListRenderItem";
import { getItems, getItemStyle, getListStyle, onDragEnd } from "./CommandInput/dndFunc";
import { useCallback, useEffect } from "react";
import { posInit } from "../common";
import { CItem } from "./CommandInput/CItem";
import { SCREEN_WIDTH } from './../../style/index';

export const CommandArea = ({}) => {
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [placePos, setPlacePos] = useRecoilState(placePosState);

  //#region  장소 선택 후 돌아올떄 반영
  useEffect(() => {
    if (placePos.id != -1) {
      let i = commandWindow.index;
      if (commandInputList.slice(i + 1, 999).length != 0)
        setCommandInputList([
          ...commandInputList.slice(0, i + 1),
          ...getItems(1, commandInputList.length, "place", placePos),
          ...commandInputList.slice(i + 1, 999),
        ]);
      else
        setCommandInputList([
          ...commandInputList.slice(0, i + 1),
          ...getItems(1, commandInputList.length, "place", placePos),
          ...getItems(1, commandInputList.length + 1, "text"),
        ]);
      setPlacePos(posInit);
    }
  }, []);
  //#endregion

  const CommandRect = useCallback(() => {
    return (
      <FadeDiv
        visible={commandWindow.visible}
        style={{ position: "absolute", top: commandWindow.top, left: commandWindow.left, zIndex: 9999 }}
      >
        <div style={{ height: 400, overflow: "scroll" }}>
          <CommandListRenderItem img={"text"} title={"#텍스트, #text"} desc={"일반 텍스트로 글을 작성하세요."} />
          <CommandListRenderItem img={"place"} title={"#장소, #place"} desc={"지도에서 장소를 선택하세요."} />
          <CommandListRenderItem img={"product"} title={"#상품, #product"} desc={"네이버샵의 상품을 선택하세요."} />
          <CommandListRenderItem img={"image"} title={"#이미지, #image"} desc={"이미지를 업로드해보세요."} />
          <CommandListRenderItem img={"h1"} title={"#큰 제목, h1"} desc={"큰 제목으로 글을 시작하세요."} />
          <CommandListRenderItem img={"h2"} title={"#부제목, #h2"} desc={"부제목으로 글을 시작하세요."} />
          <CommandListRenderItem img={"h3"} title={"#소제목 #h3"} desc={"소주제로 글을 시작하세요."} />
          <CommandListRenderItem img={"tag"} title={"#태그, #tag"} desc={"태그를 걸어 다른 사용자와 공유하세요."} />
          <CommandListRenderItem img={"contour"} title={"#구분선, #contour"} desc={"블록을 구분선으로 나눕니다."} />
          <CommandListRenderItem img={"emoji"} title={"#이모지, #emoji"} desc={"텍스트로 넣을 이모지 선택하세요."} />
          <CommandListRenderItem img={"red"} title={"#빨간색 글씨, #red"} desc={"빨간색으로 글을 작성하세요."} />
          <CommandListRenderItem img={"blue"} title={"#파란색 글씨, #blue"} desc={"파란색으로 글을 작성하세요."} />
          <CommandListRenderItem img={"brown"} title={"#갈색 글씨, #yellow"} desc={"갈색으로 글을 작성하세요."} />
          <CommandListRenderItem img={"purple"} title={"#보라색 글씨, #purple"} desc={"보라색으로 글을 작성하세요."} />
          <CommandListRenderItem
            img={"yellow"}
            title={"#노란색 배경, #yellow-background"}
            desc={"노란색 배경으로 글을 작성하세요."}
          />
          <CommandListRenderItem
            img={"orange"}
            title={"#주황색 배경, #orange-background"}
            desc={"주황색 배경으로 글을 작성하세요."}
          />
          <CommandListRenderItem
            img={"gray"}
            title={"#회색 배경, #gray-background"}
            desc={"회색 배경으로 글을 작성하세요."}
          />
        </div>
        {/* <div>#인용</div> */}
        {/* <div>#콜아웃</div> */}
        {/* <div>#사용자 멘션하기</div> */}
        {/* <div>#동영상</div> */}
        {/* <div>#코드</div> */}
        {/* <div>#파일</div> */}
        {/* <div>#북마크</div> */}
      </FadeDiv>
    );
  }, [commandWindow.visible, commandWindow.left, commandWindow.top]);
  return (
    <div style={{ paddingBottom: 600 }}>
      <CommandRect />
      <DragDropContext onDragEnd={(r) => onDragEnd(r, commandInputList, setCommandInputList)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {commandInputList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div
                          style={{ display: "flex", alignItems: "flex-start", justifyItems: "center", marginTop: 8 }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyItems: "center",
                              marginRight: 8,
                              marginTop: 7,
                            }}
                          >
                            <Icon name={"faEllipsisV"} type={"solid"} size={"xs"} color={GRAY6} />
                            <Icon name={"faEllipsisV"} type={"solid"} size={"xs"} color={GRAY6} />
                          </div>
                          <CItem index={index} data={item} />
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
