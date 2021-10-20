//#region CommandArea Functions
// fake data generator
export const getItems = (count, offset = 0, type = "text", content = "") =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: content,
    type: type,
  }));
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const grid = 8;
export const getItemStyle = (isDragging, draggableStyle) => {
  let translate = draggableStyle.transform;
  if (isDragging && typeof draggableStyle.transform == "string") {
    let y = Number(translate.split(",")[1].split("x")[0].slice(1, -1));
    translate = translate.split(",")[0] + `, ${y - 40}px)`;
    draggableStyle.transform = translate;
  }
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // change background colour if dragging
    // styles we need to apply on draggables
    ...draggableStyle,
    // transform: `translate(${draggableStyle.style.transform.x}px, ${draggableStyle.style.transform.y}px)`,
  };
};
export const getListStyle = () => ({
  // padding: grid,
  flex: 1,
});
export const onDragEnd = (result, list, setList) => {
  if (!result.destination) return;
  const arr = reorder(list, result.source.index, result.destination.index);
  setList(arr);
};
//#endregion
