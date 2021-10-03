// import { User } from "./model/User";
import { atom, atomFamily } from "recoil";
import { posInit } from "./common";
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

/**
 *  출발지/도착지 선택 후 도착 장소 결과
 */
export const SearchEndPosState = atom({
  key: "recoil/searchEndPos",
  default: {
    address_name: "",
    category_group_code: "",
    category_group_name: "",
    category_name: "",
    distance: -1,
    id: -1,
    phone: "",
    place_name: "",
    place_url: "",
    x: -1,
    y: -1,
  },
});
/**
 *  출발지/도착지 선택 후 출발 장소 결과
 */
export const SearchStartPosState = atom({
  key: "recoil/searchStartPos",
  default: {
    address_name: "",
    category_group_code: "",
    category_group_name: "",
    category_name: "",
    distance: -1,
    id: -1,
    phone: "",
    place_name: "",
    place_url: "",
    x: -1,
    y: -1,
  },
});
/**
 *  도착지
 * address_name category_group_code category_group_name category_name distance id phone place_name place_url road_address_name x y
 */
export const endPosState = atom({
  key: "recoil/endPos",
  default: posInit,
});
/**
 * 출발지
 * address_name category_group_code category_group_name category_name distance id phone place_name place_url road_address_name x y
 */
export const startPosState = atom({
  key: "recoil/startPos",
  default: posInit,
});
/**
 *  출발지/도착지 선택 후 장소 검색 결과
 * address_name* / category_group_code / category_group_name / category_name*
 * distance / id / phone* / place_name* / place_url / x* / y*
 */
export const SearchPosResultState = atom({
  key: "recoil/searchPosResult",
  default: { documents: [posInit], meta: { is_end: true, pageable_count: -1, total_count: -1 } },
});

/**
 *  출발지/도착지 선택 시 지도에서 검색하기
 *  position : "start" | "end"
 */
export const SearchPositionState = atom({
  key: "recoil/searchPosition",
  default: { visible: false, position: "" },
});
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
