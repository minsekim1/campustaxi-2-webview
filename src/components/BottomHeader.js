import { homeTabIndexState, userDataState } from "../components/recoil";
import { HEADER_HEIGHT } from "./../style/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import useWindowDimensions from "../hook/useWindowDimensions";
import { KaKaoLoginBtn } from "./Btn/LoginBtn";
import { Avatar } from "@mui/material";

export const BottomHeader = ({ title, noProfile=false }) => {
  const userData = useRecoilValue(userDataState);

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
    if (userData) history.push(`/user/${userData.id}`);
    else alert("로그인을 먼저 해야 다른 유저의 정보를 확인할 수 있습니다.");
  };
  return (
    <div style={{ height: HEADER_HEIGHT, width: width, display: "flex", alignItems: "center", paddingTop: 8 }}>
      <div style={inlineStyle.flex}></div>
      <div style={inlineStyle.barFlexInner}>
        <div style={inlineStyle.flexL}>
          {!title ? (
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
          ) : (
            false
          )}
        </div>
        <div style={{ margin: "0 12px", alignSelf: "flex-start", fontWeight: "bold", fontSize: 15 }}>
          {!title ? "|" : title}
        </div>
        <div style={inlineStyle.flexL}>
          {!title ? (
            <div
              style={homeTabIndex === 1 ? inlineStyle.noStyleBtnActive : inlineStyle.noStyleBtn}
              onClick={() => onClick(1)}
            >
              지도
            </div>
          ) : (
            false
          )}
        </div>
      </div>
      <div style={inlineStyle.flex}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "end", marginRight: width * 0.05 }}>
          {!noProfile ? (
            userData ? (
              <div onClick={goToUser}>
                <Avatar
                  sx={{ border: "1px solid gray" }}
                  src={userData.profile_image ?? undefined}
                >
                  {userData.nickname.slice(0, 1)}
                </Avatar>
              </div>
            ) : (
              // <div
              //   onClick={goToUser}
              //   style={{
              //     ...inlineStyle.noStyleBtn,
              //     border: `3px solid #F1F3F5`,
              //     borderRadius: 200,
              //     backgroundColor: "#F1F3F5",
              //     alignItems: "center",
              //     justifyContent: "center",
              //     display: "flex",
              //     width: 44,
              //     height: 44,
              //   }}
              // >
              //   <img
              //     alt={" "}
              //     width={32}
              //     height={32}
              //     style={{ borderRadius: 200 }}
              //     src={
              //       userData.profile_image ??
              //       "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
              //     }
              //   ></img>
              // </div>
              <KaKaoLoginBtn />
            )
          ) : (
            false
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
