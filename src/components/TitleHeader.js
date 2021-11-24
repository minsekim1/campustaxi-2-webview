import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import useWindowDimensions from "../hook/useWindowDimensions";
import { HEADER_HEIGHT } from "../style";
import { KaKaoLoginBtn } from "./Btn/LoginBtn";
import { userDataState } from "./recoil";

export const TitleHeader = ({ title = "" }) => {
  const { height, width } = useWindowDimensions();
  const [userData] = useRecoilState(userDataState);
  const history = useHistory();

  const goToUser = () => {
    if (userData) history.push(`/user/${userData.id}`);
    else alert("로그인을 먼저 해야 다른 유저의 정보를 확인할 수 있습니다.")
  };

  return (
    <div
      style={{
        width: width,
        fontWeight: "bold",
        fontSize: 15,
        display: "flex",
        justifyContent: "center",
        height: HEADER_HEIGHT,
        alignItems: "center",
      }}
    >
      {title}
      <div style={{ position: "absolute", right: 16 }}>
        {location.pathname === "/shop" ? (
          false
        ) : !userData ? (
          <KaKaoLoginBtn />
        ) : (
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
        )}
      </div>
    </div>
  );
};
const inlineStyle = {
  noStyleBtn: { backgroundColor: "transparent", border: "none", fontSize: 15, fontWeight: "normal", width: "4em" },
};
