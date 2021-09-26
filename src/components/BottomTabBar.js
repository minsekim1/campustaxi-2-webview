import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fal from "@fortawesome/pro-light-svg-icons";
import * as fas from "@fortawesome/free-solid-svg-icons";

import { useRecoilState } from "recoil";
import { BottomModalState, bottomTabIndexState, homeTabIndexState } from "./recoil";
import { GRAY9, SCREEN_HEIGHT } from "../style";
import { SCREEN_WIDTH } from "./../style/index";
import { Link, useHistory } from "react-router-dom";

export const BottomTabBar = () => {
  const history = useHistory();
  const [homeTabIndex] = useRecoilState(homeTabIndexState);
  const [, setVisible] = useRecoilState(BottomModalState);
  const [bottomTabIndex, setBottomTabIndex] = useRecoilState(bottomTabIndexState);
  const onClick = (index) => {
    if (bottomTabIndex !== index) {
      if (homeTabIndex === 1 && index === 1) {
        setVisible(true)
        return;
      }
      if (homeTabIndex === 1 && index === 0) history.replace("/");
      else if (homeTabIndex === 0 && index === 0) history.replace("/course");
      else if (homeTabIndex === 0 && index === 1) history.replace("/search");
      else if (index === 2) history.replace("/shop");
      else if (index === 3) history.replace("/chat/my");
      setBottomTabIndex(index);
    }
  };
  return (
    <div style={inlineStyle.barInner}>
      <div style={inlineStyle.barFlexInner}>
        <div style={inlineStyle.barTxt}>
          <button style={inlineStyle.noStyleBtn} onClick={() => onClick(0)}>
            <FontAwesomeIcon
              icon={bottomTabIndex === 0 ? fas.faHome : fal.faHome}
              size={"lg"}
              opacity={bottomTabIndex === 0 ? 1 : 0.3}
              color={GRAY9}
            />
          </button>
        </div>
        <div style={inlineStyle.barTxt}>
          <button style={inlineStyle.noStyleBtn} onClick={() => onClick(1)}>
            <FontAwesomeIcon
              icon={bottomTabIndex === 1 ? fas.faSearch : fal.faSearch}
              size={"lg"}
              opacity={bottomTabIndex === 1 ? 1 : 0.3}
              color={GRAY9}
            />
          </button>
        </div>
        <div style={inlineStyle.barTxt}>
          <button style={inlineStyle.noStyleBtn} onClick={() => onClick(2)}>
            <FontAwesomeIcon
              icon={bottomTabIndex === 2 ? fas.faShoppingBag : fal.faShoppingBag}
              size={"lg"}
              opacity={bottomTabIndex === 2 ? 1 : 0.3}
              color={GRAY9}
            />
          </button>
        </div>
        <div style={inlineStyle.barTxt}>
          <button style={inlineStyle.noStyleBtn} onClick={() => onClick(3)}>
            <FontAwesomeIcon
              icon={bottomTabIndex === 3 ? fas.faEnvelope : fal.faEnvelope}
              size={"lg"}
              opacity={bottomTabIndex === 3 ? 1 : 0.3}
              color={GRAY9}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const inlineStyle = {
  barInner: {
    position: "absolute",
    bottom: 48,
    height: 42,
    boxShadow: "0.2px 0.2px 0 0 gray",
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.8,
    marginLeft: SCREEN_WIDTH * 0.1,
    backgroundColor: "white",
  },
  barFlexInner: {
    display: "flex",
    height: 42,
    alignItems: "center",
  },
  barTxt: {
    flex: 1,
    textAlign: "center",
  },
  noStyleBtn: { backgroundColor: "transparent", border: "none" },
};
