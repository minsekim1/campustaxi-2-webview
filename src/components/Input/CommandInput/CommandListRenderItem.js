import { GRAY6, GRAY8, SCREEN_HEIGHT } from "../../../style";
import { useRecoilState } from "recoil";
import { commandWindowState, commandInputListState } from "../../recoil";
import { getItems } from "./dndFunc";
import { homeTabIndexState } from './../../recoil';
import { useHistory } from 'react-router-dom';

export const CommandListRenderItem = ({ img, title, desc }) => {
  const [commandWindow, setCommandWindow] = useRecoilState(commandWindowState);
  const [commandInputList, setCommandInputList] = useRecoilState(commandInputListState);
  const [homeTabIndex, setHomeTabIndex] = useRecoilState(homeTabIndexState);
  const history = useHistory();
  const onClick = () => {
    if (img == "text") {
      let i = commandWindow.index;
      setCommandInputList([
        ...commandInputList.slice(0, i + 1),
        ...getItems(1, commandInputList.length),
        ...commandInputList.slice(i + 1, 999),
      ]);
    } else if (img == 'place') {
      history.push("/");
      setHomeTabIndex(1)
    }
    setCommandWindow({ ...commandWindow, visible: false, index: -1 });
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
