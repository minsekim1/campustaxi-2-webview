import { CreatorType } from "./Course";
import { RouteType } from "./Route";
import { UserType } from "./User";

export const posInit = {
  address_name: "",
  category_group_code: "",
  category_group_name: "",
  category_name: "",
  distance: "",
  id: -1,
  phone: "",
  place_name: "",
  place_url: "",
  road_address_name: "",
  x: "", //127.036586636975
  y: "", //37.5090312068588
};
export type ChatRoomType = {
  created_at: string; //"2021-11-20T05:20:04.000Z"
  creator_id: CreatorType | null;
  deleted_at: null | string; //
  departureTime: string; //"2021-11-20T14:19:59.000Z"
  disable_at: null | string; //
  distance: number; //16.8
  duration: number; //60
  end_route: RouteType | null;
  enter_users: UserType[];
  gender: "None" | "M" | "W";
  id: number; //23;
  path: []; // "126.9921518,37.5704197,126.9921518,37.5704242,126";
  person_limit: number; //2;
  published_at: string; //"2021-11-20T05:20:04.000Z";
  start_at: string; //"2021-11-20T14:20:55.000Z";
  start_route: RouteType | null;
  taxiFare: number; //19670;
  title: string; //"채팅방 이름2";
  updated_at: string; // "2021-11-20T05:20:04.000Z";

  // 개발용옵션
  address_name?: string;
  category_group_code?: string;
  category_group_name?: string;
  category_name?: string;
  phone?: string;
  place_name?: string;
  place_url?: string;
  road_address_name?: string;
  x?: number;
  y?: number;
};

export const ChatRoomInit: ChatRoomType = {
  ...posInit,
  creator_id: null,
  duration: 0,
  published_at: "",
  updated_at: "",
  departureTime: "",
  created_at: "",
  deleted_at: null,
  disable_at: "",
  distance: 0,
  end_route: null,
  gender: "None",
  path: [],
  person_limit: -1,
  start_at: "",
  start_route: null,
  taxiFare: -1,
  title: "",
  enter_users: [],
  x: undefined,
  y: undefined,
};
