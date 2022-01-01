import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon } from "../common/Icon";
import { useRecoilState } from "recoil";
import { alertDialogInit, alertDialogState, commandInputListState, commandWindowState, placePosState } from "../recoil";
import { FadeDiv } from "../FadeDiv";
import { CommandListRenderItem } from "./CommandInput/CommandListRenderItem";
import { getItems, getItemStyle, getListStyle, onDragEnd } from "./CommandInput/dndFunc";
import { useCallback, useEffect } from "react";
import { CItem, MCItem } from "./CommandInput/CItem";
import { deleteModePosState } from "./../recoil";
import Button from "@mui/material/Button";
import { Rowdot } from "./../Icon/Rowdot";
import { posInit } from "../../types/ChatRoom";

export const CommandArea = ({ }) => {
  const [deleteMode, setDeleteMode] = useRecoilState(deleteModePosState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [alertDialogInfo, setAlertDialogInfo] = useRecoilState(alertDialogState);
  const [commandWindow] = useRecoilState(commandWindowState);
  const [placePos, setPlacePos] = useRecoilState(placePosState);

  //#region 명령어입력창 마지막는 무조건 텍스트(text,h1,h2,h3)로
  useEffect(() => {
    const type = commandInputList[commandInputList.length - 1].type;
    if (type !== "text" && type !== "h1" && type !== "h2" && type !== "h3") {
      setCommandInputList([...commandInputList, ...getItems(1, commandInputList.length + 1, "text")]);
    }
  }, [commandInputList.length]);
  //#endregion
  //#region 장소 선택 후 돌아올떄 반영
  useEffect(() => {
    if (placePos.id !== -1) {
      let i = commandWindow.index;
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length, "place", placePos),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setPlacePos(posInit);
    }
  }, []);
  //#endregion
  //#region 명령어창 UI
  const CommandRect = useCallback(() => {
    return (
      <FadeDiv
        visible={commandWindow.visible}
        style={{ position: "absolute", top: commandWindow.top, left: commandWindow.left, zIndex: 9999 }}
      >
        <div style={{ height: commandWindow.height, width: 260, overflow: "scroll" }}>
          <CommandListRenderItem img={"text"} title={"새 텍스트"} desc={"일반 텍스트로 글을 작성하세요."} />
          <CommandListRenderItem img={"place"} title={"장소"} desc={"지도에서 장소를 선택하세요."} />
          <CommandListRenderItem img={"product"} title={"상품"} desc={"네이버샵의 상품을 선택하세요."} />
          <CommandListRenderItem img={"image"} title={"이미지"} desc={"이미지를 업로드해보세요."} />
          <CommandListRenderItem img={"h1"} title={"큰 제목, h1"} desc={"큰 제목으로 글을 시작하세요."} />
          <CommandListRenderItem img={"h2"} title={"부제목, h2"} desc={"부제목으로 글을 시작하세요."} />
          <CommandListRenderItem img={"h3"} title={"소제목, h3"} desc={"소주제로 글을 시작하세요."} />
          <CommandListRenderItem img={"tag"} title={"태그"} desc={"태그를 걸어 다른 사용자와 공유하세요."} />
          <CommandListRenderItem img={"contour"} title={"구분선"} desc={"블록을 구분선으로 나눕니다."} />
          {/* <CommandListRenderItem img={"emoji"} title={"#이모지, #emoji"} desc={"텍스트로 넣을 이모지 선택하세요."} /> */}
          
          {/* <CommandListRenderItem img={"red"} title={"빨간색 글씨"} desc={"빨간색으로 글을 작성하세요."} />
          <CommandListRenderItem img={"blue"} title={"파란색 글씨"} desc={"파란색으로 글을 작성하세요."} />
          <CommandListRenderItem img={"brown"} title={"갈색 글씨"} desc={"갈색으로 글을 작성하세요."} />
          <CommandListRenderItem img={"purple"} title={"보라색 글씨"} desc={"보라색으로 글을 작성하세요."} />
          <CommandListRenderItem img={"yellow"} title={"노란색 배경"} desc={"노란색 배경으로 글을 작성하세요."} />
          <CommandListRenderItem img={"orange"} title={"주황색 배경"} desc={"주황색 배경으로 글을 작성하세요."} />
          <CommandListRenderItem img={"gray"} title={"회색 배경"} desc={"회색 배경으로 글을 작성하세요."} /> */}
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
  //#endregion
  //#region 블록 하나 삭제
  const onClickDelete = (i, item) => {
    if (!alertDialogInfo.visible) {
      setAlertDialogInfo({
        visible: true,
        title: "",
        text: "정말 삭제하시겠습니까?",
        handleConfirm: () => {
          const list = [...commandInputList.slice(0, i), ...commandInputList.slice(i + 1, 999)];
          setCommandInputList(list.length > 0 ? list : [...getItems(1, 1, "text", "")]);
          setAlertDialogInfo(alertDialogInit);
        },
      });
      setDeleteMode({ ...deleteMode, index: i });
    }
  };

  //#endregion
  return (
    <div style={{ paddingBottom: 300 }}>
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
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyItems: "center",
                            marginTop: 8,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyItems: "center",
                              marginRight: 8,
                              marginTop: 7,
                              height: 10,
                            }}
                          >
                            {deleteMode.visible ? (
                              <div onClick={() => onClickDelete(index, item)}>
                                <Icon name={"faTrash"} type={"light"} />
                              </div>
                            ) : (
                              <Rowdot />
                            )}
                          </div>
                          <div
                            style={
                              alertDialogInfo.visible && deleteMode.index === index
                                ? {
                                    borderStyle: "solid",
                                    borderWidth: 2,
                                    borderRadius: 3,
                                    borderColor: "#d32f2f",
                                  }
                                : { padding: 1.5 }
                            }
                          >
                            <MCItem index={index} data={item} />
                          </div>
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
      <DeleteBlock />
    </div>
  );
};

const DeleteBlock = ({ }) => {
  const [deleteMode, setDeleteMode] = useRecoilState(deleteModePosState);
  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        left: "4%",
      }}
      onClick={() => setDeleteMode({ visible: !deleteMode.visible, index: -1 })}
    >
      <Button
        style={{ textTransform: "none", width: 110 }}
        variant={deleteMode.visible ? "contained" : "outlined"}
        color="error"
      >
        <Icon name={"faTrash"} color={deleteMode.visible ? "white" : "#d32f2f"} />
        <div style={{ marginLeft: 6, fontFamily: "roboto", color: deleteMode.visible ? "white" : "#d32f2f" }}>
          삭제모드
        </div>
      </Button>
    </div>
  );
};
