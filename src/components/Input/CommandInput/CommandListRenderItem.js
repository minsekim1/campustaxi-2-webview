import { GRAY6, GRAY8, SCREEN_HEIGHT } from "../../../style";
import { useRecoilState } from "recoil";
import {
  commandWindowState,
  commandInputListState,
  SearchPositionState,
  CreateBottomModalState,
  placePosState,
  RouteProductModalState,
  CreateRouteBottomModalState,
} from "../../recoil";
import { getItems } from "./dndFunc";
import { homeTabIndexState } from "./../../recoil";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export const CommandListRenderItem = ({ img, title, desc }) => {
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [homeTabIndex, setHomeTabIndex] = useRecoilState(homeTabIndexState);
  const [visibleSearch, setVisibleSearch] = useRecoilState(SearchPositionState);
  const [visibleCreate, setVisibleCreate] = useRecoilState(CreateBottomModalState);
  const [visibleRouteProduct, setVisibleRouteProduct] = useRecoilState(RouteProductModalState);
  const [visibleRoute, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState);

  const history = useHistory();

  const onClick = () => {
    let i = commandWindow.index;
    if (img == "text") {
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } else if (img == "place") {
      setHomeTabIndex(1);
      setVisibleSearch({ visible: true, position: "place" });
      setVisibleCreate(false);
      history.push("/");
      setCommandWindow({ ...commandWindow, visible: false });
    } else if (img == "product") {
      setVisibleRoute(false);
      setVisibleRouteProduct(true);
      setCommandWindow({ ...commandWindow, visible: false });
    } else if (img == "image") {
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length, "image"),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } else if (img == "h1") {
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length, "h1"),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } else if (img == "h2") {
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length, "h2"),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } else if (img == "h3") {
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length, "h3"),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } else if (img == "tag") {
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length, "tag",{tagList:[], inputValue:""}),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } else if (img == "contour") {
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length, "contour"),
        ...commandInputList.slice(i + 1, 999),
      ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } else if (img == "emoji") {
      // setCommandInputList([
      //   ...commandInputList.slice(0, i + 1),
      //   ...getItems(1, commandInputList.length, "h1"),
      //   ...commandInputList.slice(i + 1, 999),
      // ]);
      setCommandWindow({ ...commandWindow, visible: false, index: -1 });
    } 
  };
  return (
    <div style={{ display: "flex", marginBottom: 6 }} onClick={onClick}>
      <img src={`./images/CommandInput/asset/${img}.png`} height={SCREEN_HEIGHT * 0.045} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 8 }}>
        <div style={{ color: GRAY8, fontSize: 13 }}>{title}</div>
        <div style={{ color: GRAY6, fontSize: 11 }}>{desc}</div>
      </div>
    </div>
  );
};
