export type RouteType = {
  id: number; //3,
  x: number; //126.99091499545715,
  y: number; //37.5508943520962,
  phone: string;
  address_code: string | null;
  category_name: string | null; //"교통,수송 > 교통시설 > 주차장",
  road_address_name: string | null; //"",
  place_url: string | null; //"http://place.map.kakao.com/17562408",
  category_group_name: string | null; //"주차장",
  category_group_code: string | null; // "PK6",
  address_name: string | null; //"서울 중구 예장동 산 5-6",
  naver_id: string | null; //"17562408",
  place_name: string | null; //"남산공원 주차장3",
  published_at: string | null; //"2021-11-20T04:05:44.000Z",
  created_at: string | null; //"2021-11-20T04:05:44.000Z",
  updated_at: string | null; //"2021-11-20T04:05:44.000Z",
  courses: number[];
  chat_rooms: number[];

  place_image?: string | null;
};
