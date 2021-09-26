// import { User } from "./model/User";
import { atom, atomFamily } from "recoil";
//#region userData token
/**
 * 유저 데이터 Badge, user 포함
 * localForageEffect(key) ; key 이름으로 저장 = AscnyStorage(key, data)
 */
// export const userState = atom({
//   key: "recoil/user",
//   default: new User(),
//   // effects_UNSTABLE: [localForageEffectObject("recoil/user", "object")],
// });

//#region bttomTabIndex
/**
 *  새채팅방 만들기
 */
export const CreateBottomModalState = atom({
  key: "recoil/createBottomModal",
  default: false,
});
export const BottomModalState = atom({
  key: "recoil/bottomModal",
  default: false,
});
//#endregion
//#region bttomTabIndex
/**
 *  지도옮길시 내 위치 저장
 */
export const MyPosState = atom({
  key: "recoil/myPosState",
  default: { lat: 37.554722, lng: 126.970833 },
});
//#endregion
//#region bttomTabIndex
/**
 *  코스 / 지도 전환 2개 탭 인덱스
 */
export const homeTabIndexState = atom({
  key: "recoil/homeTabIndex",
  default: 1,
});
//#endregion
//#region bttomTabIndex
/**
 *  바텀탭 4개 인덱스
 */
export const bottomTabIndexState = atom({
  key: "recoil/bottomTabIndex",
  default: 0,
});
//#endregion