// import { User } from "./model/User";
import { atom } from "recoil";
import { ChatRoomInit, posInit } from "./common";
import { getItems } from "./Input/CommandInput/dndFunc";
import { localStorageEffect } from "./common/function/localStorageEffect";
import { tagInitList } from "./CourseArea";
import { CourseType } from "../types/Course";
import { UserType } from "../types/User";
import { ChatRoomType } from "../types/ChatRoom";
import { ContentItemType } from "../types/Command";

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
 *
 * address_name category_group_code category_group_name category_name distance id phone place_name place_url road_address_name x y
 */


const tagInitListItem = tagInitList[Math.floor(Math.random() * tagInitList.length)];
export const commandInputListState = atom<ContentItemType[]>({
  key: "recoil/commandInputList",
  default: [
    ...getItems(1),
    ...getItems(1, 1, "contour"),
    ...getItems(1, 2, "tag", {
      inputValue: "",
      tagList: [
        {
          id: tagInitListItem,
          text: tagInitListItem,
        },
      ],
    }),
  ],
  effects_UNSTABLE: [localStorageEffect("recoil/cache/commandInputList")],
});

export const loadingState = atom({
  key: "recoil/loading",
  default: false,
});
type CommandWindowProps = {
  color: "red" | 'blue' | 'brown' | 'purple' | 'yellow' | 'orange' | 'gray' | "";
  visible: boolean; top: number; left: number; index: number; height: number; pos: number;
  beforeInnerHTML?: any;
}
export const commandWindowState = atom<CommandWindowProps>({
  key: "recoil/commandWindow",
  default: { color: "", visible: false, top: 0, left: 0, index: -1, height: 0, pos: 0 },
});

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
export const pathState = atom({
  key: "recoil/path",
  default: { path: [], distance: -1, duration: -1, taxiFare: -1, departureTime: "2020-01-01T00:00:00" },
});
/**
 *  AlertDialog 띄우기
 *  { visible: false, text: "" }
 */
export const alertDialogInit = { visible: false, title: "", text: "", handleConfirm: () => { } };
export const alertDialogState = atom({
  key: "recoil/alertDialog",
  default: alertDialogInit,
});
/**
 *  코스 생성시 삭제모드
 * {visible: false, index: -1, isDialog: false}
 */
export const deleteModePosState = atom({
  key: "recoil/deleteMode",
  default: { visible: false, index: -1 },
});
/**
 *  코스 생성시 장소 선택
 * address_name category_group_code category_group_name category_name distance id phone place_name place_url road_address_name x y
 */
export const placePosState = atom({
  key: "recoil/placePos",
  default: posInit,
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
export type posInitType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: number;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string; //127.036586636975
  y: string; //37.5090312068588
};
export const startPosState = atom<posInitType>({
  key: "recoil/startPos",
  default: posInit,
});
/**
 *  검색 후 고른 채팅방 1개
 * address_name* / category_group_code / category_group_name / category_name*
 * distance / id / phone* / place_name* / place_url / x* / y*
 */
export const ChatRoomSeletedState = atom({
  key: "recoil/chatRoomSeleted",
  default: ChatRoomInit,
});
/**
 *  DB에 있는 모든 채팅방
 * address_name* / category_group_code / category_group_name / category_name*
 * distance / id / phone* / place_name* / place_url / x* / y*
 */
export const ChatRoomListState = atom({
  key: "recoil/chatRoomList",
  default: [],
  effects_UNSTABLE: [localStorageEffect("recoil/chatRoomList")],
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
 *  position : "start" | "end" | "place" | ""
 */
export const SearchPositionState = atom<{ visible: boolean; position: "start" | "end" | "place" | "" }>({
  key: "recoil/searchPosition",
  default: { visible: false, position: "" },
});
//#region bttomTabIndex

export const FilePathInit = { file: "", previewURL: "", type: "", name: "" };
/**
 * type : "" | "CourseCreateMainImg"
 */
export const FilePathState = atom({
  key: "recoil/filepath",
  default: FilePathInit,
  effects_UNSTABLE: [localStorageEffect("recoil/cache/filepath")],
});
/**
 *  이미지 수정 crop
 */
export const CropInit = { visible: false, file: new File([], ""), previewURL: "", type: "" };
export const CropState = atom({
  key: "recoil/crop",
  default: CropInit,
});
/**
 *  코스에 새 상품 추가
 */
export const CourseProductModalState = atom({
  key: "recoil/CourseProductModalState",
  default: false,
});
/**
 *  새Route 만들기
 */
export const CreateRouteBottomModalState = atom({
  key: "recoil/createRouteBottomModal",
  default: false,
});
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

//#region /course
export const CourseListState = atom<CourseType[]>({
  key: "recoil/CourseListState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("recoil/CourseListState")],
});
export const TagListState = atom<string[]>({
  key: "recoil/TagListState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("recoil/TagListState")],
});
export const CourseIndexState = atom<number>({
  key: "recoil/CourseIndexState",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("recoil/CourseIndexState")],
});
export const shareModalState = atom<{ visible: boolean }>({
  key: "recoil/shareModalState",
  default: { visible: false },
});
//#endregion

//#region /search
/**
 *  사용자 / 채팅방 / 코스 검색
 */
// { users: any[]; rooms: any[]; course: any[] }

export const searchState = atom<{ users: UserType[]; rooms: ChatRoomType[]; courses: CourseType[] }>({
  key: "recoil/searchState",
  default: { rooms: [], users: [], courses: [] },
});
//#endregion

//#region  /chat 채팅방
export const lastMessageMarginBottomState = atom<number>({
  key: "recoil/lastMessageMarginBottomState",
  default: 0,
});
//#endregion

//#region /users 회원가입
export const userDataState = atom<UserType | null>({
  key: "recoil/userDataState",
  default: null,
  effects_UNSTABLE: [localStorageEffect("recoil/userDataState")],
});
//#endregion