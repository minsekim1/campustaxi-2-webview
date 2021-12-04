import axios from "axios";
import KakaoLogin from "react-kakao-login";
import { LoginResponse } from "react-kakao-login/lib/types";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { getfetch, postfetch } from "../common";
import { Browser, OS } from "../common/function/getPlatform";
import { loadingState, userDataState } from "../recoil";

export const KaKaoLoginBtn = ({ width=64}) => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [, setLoading] = useRecoilState(loadingState); //loading
  const history = useHistory();

  //#region 회원가입하기
  const onSuccess = async (response: { response: LoginResponse; profile?: any | profileType | undefined }) => {
    const prof = response.profile;
    const res = response.response;
    if (!res || !prof || !prof.kakao_account.email) {
      alert("로그인 오류입니다. 잠시후에 다시 시도해주세요.");
      return;
    }
    const ipRes: any = await axios.get("https://geolocation-db.com/json/");
    const ip = ipRes && ipRes.data && ipRes.data.IPv4 ? ipRes.data.IPv4 : "";

    const signRes = await getfetch(`/users?kakao_id=${prof.id}`);
    setLoading(true)
    if (signRes && !!signRes.length && signRes.length > 0 && typeof signRes[0].id == "number") {
      setLoading(false)
      setUserData(signRes[0]);
    } else
      await postfetch(`/users`, {
        os: OS() ?? "",
        browser: Browser() ?? "",
        username: prof.id,
        email: prof.id + "@samplemail.com",
        password: prof.id,
        confirmed: true,
        blocked: false,
        role: 1,
        nickname: prof.properties.nickname ?? "",
        profile_image: prof.properties.thumbnail_image ?? "",
        point: 0,
        greeting: "",
        last_logined_ip: ip,
        gender: prof.kakao_account.gender === "male" ? "M" : prof.kakao_account.gender === "female" ? "W" : "None",

        kakao_id: prof.id,
        kakao_nickname: prof.properties.nickname ?? "",
        kakao_profile_image: prof.properties.profile_image ?? "",
        kakao_profile_thumbnail: prof.properties.thumbnail_image ?? "",
        kakao_email: prof.kakao_account.email ?? "",
        kakao_age_range: prof.kakao_account.age_range ?? "",
        kakao_birthday: prof.kakao_account.birthday ?? "",
        kakao_birthday_type: prof.kakao_account.birthday_type ?? "",
        kakao_gender: prof.kakao_account.gender ?? "",
        kakao_access_token: res.access_token ?? "",
        kakao_token_type: res.token_type ?? "",
        kakao_refresh_token: res.refresh_token ?? "",
        kakao_expires_in: res.expires_in ?? "",
        kakao_refresh_token_expires_in: res.refresh_token_expires_in ?? "",
      }).then((d) => {
        setLoading(false)
        if (d.statusCode === 400) console.error("로그인실패..", d);
        else {
          setUserData(d);
        }
        history.goBack();
      });
  };
  //#endregion
  // 로그인된 상태에서 버튼 누르면 로그아웃됌
  return (
    // <></>
    <KakaoLogin
      
      token={"0319421ef3dceca8c69d3b04efc365dc"}
      onSuccess={onSuccess}
      onFail={(p) => console.error(p)}
      onLogout={() => console.log("logout!")}
      useLoginForm
      style={{ backgroundColor: '#ffeb00', width: width, border:'none'  }}
      
    ><p style={{color:'black'}}>로그인</p></KakaoLogin>
  );
};

type profileType = {
  id: number; //1452229818, kakao_id
  connected_at: string; //"2020-08-16T13:03:44Z",
  properties: {
    nickname: string; //"김민성", kakao_nickname
    profile_image: string; //"http://k.kakaocdn.net/dn/j0ZNn/btqGmUejwAP/3d6x9Sz0oRgj83NUITVul1/img_640x640.jpg", kakao_profile_image
    thumbnail_image: string; //"http://k.kakaocdn.net/dn/j0ZNn/btqGmUejwAP/3d6x9Sz0oRgj83NUITVul1/img_110x110.jpg" kakao_profile_thumbnail
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean; //false,
    profile_image_needs_agreement: boolean; //false,
    profile: {
      nickname: string; //"김민성",
      thumbnail_image_url: string; //"http://k.kakaocdn.net/dn/bCEqSJ/btriSkOib8t/sMrNWCubb6C5X8kP9jJAh0/img_110x110.jpg",
      profile_image_url: string; //"http://k.kakaocdn.net/dn/bCEqSJ/btriSkOib8t/sMrNWCubb6C5X8kP9jJAh0/img_640x640.jpg",
      is_default_image: boolean; //false
    };
    has_email: boolean; //true,
    email_needs_agreement: boolean; //false,
    is_email_valid: boolean; //true,
    is_email_verified: boolean; //true,
    email: string; //"tkarnrwl7862@gmail.com", kakao_email
    has_age_range: boolean; //true,
    age_range_needs_agreement: boolean; //false,
    age_range: string; //"20~29", kakao_age_range
    has_birthday: boolean; //true,
    birthday_needs_agreement: boolean; //false,
    birthday: string; //"0402", kakao_birthday
    birthday_type: string; //"SOLAR", kakao_birthday_type
    has_gender: boolean; //true,
    gender_needs_agreement: boolean; //false,
    gender: string; //"male" kakao_gender
  };
};
type ResponseType = {
  access_token: string; //"K_mx0s8UySOt",  kakao_access_token
  token_type: string; //"bearer", kakao_token_type
  refresh_token: string; //"umOUzyj3hvSR", kakao_refresh_token
  expires_in: number; //7199, kakao_expires_in
  scope: string; //"age_range birthday account_email profile_image talk_message gender profile_nickname",
  refresh_token_expires_in: number; //5183999 kakao_refresh_token_expires_in
};
