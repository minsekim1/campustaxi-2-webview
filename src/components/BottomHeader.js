import { homeTabIndexState } from "../components/recoil";
import { HEADER_HEIGHT, SCREEN_WIDTH } from "./../style/index";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";

export const BottomHeader = () => {
  const history = useHistory();
  const [homeTabIndex, setHomeTabIndex] = useRecoilState(homeTabIndexState);
  const onClick = (index) => {
		if (homeTabIndex !== index) {
			if (index === 1) history.push("/");
			else if ( index === 0) history.push("/course");
			setHomeTabIndex(index);
		}
  };
  const goToUser = () => {
    history.push("/my");
  };
  return (
    <div style={inlineStyle.barInner}>
      <div style={inlineStyle.flex}></div>
      <div style={inlineStyle.barFlexInner}>
        <div style={inlineStyle.flexL}>
          <button
            style={homeTabIndex === 0 ? inlineStyle.noStyleBtnActive : inlineStyle.noStyleBtn}
            onClick={() => onClick(0)}
          >
            코스
          </button>
        </div>
        <div style={inlineStyle.flexL}>&nbsp;|&nbsp;</div>
        <div style={inlineStyle.flexL}>
          <button
            style={homeTabIndex === 1 ? inlineStyle.noStyleBtnActive : inlineStyle.noStyleBtn}
            onClick={() => onClick(1)}
          >
            지도
          </button>
        </div>
      </div>
      <div style={inlineStyle.flex}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "end", marginRight: SCREEN_WIDTH * 0.05 }}>
          <button
            onClick={goToUser}
            style={{
              ...inlineStyle.noStyleBtn,
              border: `3px solid #F1F3F5`,
              borderRadius: 200,
              backgroundColor: "#F1F3F5",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              width: 44,
              height: 44,
            }}
          >
            <img
              alt={' '}
              width={32}
              height={32}
              style={{ borderRadius: 200 }}
              src={"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"}
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
};

const inlineStyle = {
  barInner: { height: HEADER_HEIGHT, width: SCREEN_WIDTH, display: "flex", alignItems: "center" },
  barFlexInner: { flex: 1, display: "flex", justifyContent: "center", alignItems: "baseline" },
  flex: { flex: 1 },
  flexL: { float: "left" },
  noStyleBtnActive: { backgroundColor: "transparent", border: "none", fontSize: 17, fontWeight: "bold", width: "3em" },
  noStyleBtn: { backgroundColor: "transparent", border: "none", fontSize: 15, fontWeight: "normal", width: "3em" },
  BtnProfile: {},
};
