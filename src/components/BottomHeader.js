import { homeTabIndexState, userDataState } from "../components/recoil";
import { HEADER_HEIGHT } from "./../style/index";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import useWindowDimensions from "../hook/useWindowDimensions";
import { KaKaoLoginBtn } from "./Btn/LoginBtn";

export const BottomHeader = () => {
  const [userData] = useRecoilState(userDataState);

  const { height, width } = useWindowDimensions();
  const history = useHistory();
  const [homeTabIndex, setHomeTabIndex] = useRecoilState(homeTabIndexState);
  const onClick = (index) => {
    if (homeTabIndex !== index) {
      if (index === 1) history.push("/");
      else if (index === 0) history.push("/course");
      setHomeTabIndex(index);
    }
  };
  const goToUser = () => {
    history.push("/my");
  };
  return (
    <div style={{ height: HEADER_HEIGHT, width: width, display: "flex", alignItems: "center", paddingTop: 8 }}>
      <div style={inlineStyle.flex}></div>
      <div style={inlineStyle.barFlexInner}>
        <div style={inlineStyle.flexL}>
          <div
            style={
              homeTabIndex === 0
                ? {
                    ...inlineStyle.noStyleBtnActive,
                    display: "flex",
                    justifyContent: "right",
                  }
                : { ...inlineStyle.noStyleBtn, display: "flex", justifyContent: "right" }
            }
            onClick={() => onClick(0)}
          >
            코스
          </div>
        </div>
        <div style={{ margin: "0 12px", alignSelf: "flex-start" }}>|</div>
        <div style={inlineStyle.flexL}>
          <div
            style={homeTabIndex === 1 ? inlineStyle.noStyleBtnActive : inlineStyle.noStyleBtn}
            onClick={() => onClick(1)}
          >
            지도
          </div>
        </div>
      </div>
      <div style={inlineStyle.flex}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "end", marginRight: width * 0.05 }}>
          {userData ? (
            <div
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
                alt={" "}
                width={32}
                height={32}
                style={{ borderRadius: 200 }}
                src={
                  userData.profile_image ??
                  "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                }
              ></img>
            </div>
          ) : (
            <div stlye={{ height: 16 }}>
              <KaKaoLoginBtn />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const inlineStyle = {
  barFlexInner: { flex: 1, display: "flex", justifyContent: "center", alignItems: "baseline" },
  flex: { flex: 1 },
  flexL: { float: "left" },
  noStyleBtnActive: { backgroundColor: "transparent", border: "none", fontSize: 17, fontWeight: "bold", width: "4em" },
  noStyleBtn: { backgroundColor: "transparent", border: "none", fontSize: 15, fontWeight: "normal", width: "4em" },
  BtnProfile: {},
};
