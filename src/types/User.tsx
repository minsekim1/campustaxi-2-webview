// role: {
//   id: number;
//   name: "Authenticated";
//   description: "Default role given to authenticated user.";
//   type: "authenticated";

import { CourseType } from "./Course";

// };
export type UserType = {
  like_courses: CourseType[];
  id: number;
  username: string; //"김민성";
  email: string; //"tkarnrwl7862@gmail.com";
  provider: "local";
  confirmed: boolean; //true;
  blocked: boolean; //false;
  role: {
    id: number; //1;
    name: string; //"Authenticated";
    description: string; //"Default role given to authenticated user.";
    type: string; //"authenticated";
  };
  nickname: string; //"김민성";
  profile_image: string; //"http://k.kakaocdn.net/dn/j0ZNn/btqGmUejwAP/3d6x9Sz0oRgj83NUITVul1/img_110x110.jpg";
  point: number;
  greeting: string; //"";
  device_type: string | null;
  device_token: string | null;
  access_token: string | null;
  refresh_token: string | null;
  refresh_token_expire: string | null;
  phone: string | null;
  os: string; //"Linux OS";
  phone_verified_at: null;
  device: string | null;
  last_logined_at: string | null;
  last_logined_ip: string; //"112.169.13.48";
  birth: string | null;
  deleted_at: string | null;
  socket_status: string | null;
  socket_room: string | null;
  socket_id: null;
  gender: "M" | "W" | "None";
  badge_message: string | null;
  badge_shop: string | null;
  badge_my: string | null;
  created_at: string; // "2021-11-21T10:15:50.000Z";
  updated_at: string; //"2021-11-21T10:15:50.000Z";
  kakao_id: string; //"1452229818";
  kakao_nickname: string; // "김민성";
  kakao_profile_image: string; //"http://k.kakaocdn.net/dn/j0ZNn/btqGmUejwAP/3d6x9Sz0oRgj83NUITVul1/img_640x640.jpg";
  kakao_profile_thumbnail: string; //"http://k.kakaocdn.net/dn/j0ZNn/btqGmUejwAP/3d6x9Sz0oRgj83NUITVul1/img_110x110.jpg";
  kakao_email: string; //"tkarnrwl7862@gmail.com";
  kakao_age_range: string; //"20~29";
  kakao_birthday: string; // "0402";
  kakao_birthday_type: string; //"SOLAR";
  kakao_gender: string; //"male";
  kakao_access_token: string; //"WF0VmZKD7lvTtqWm6zEhfIpw3wEq1kyfvCwSzworDSAAAAF9Qf6oZg";
  kakao_token_type: string; //"bearer";
  kakao_refresh_token: string; //"aunhxF9aOvPcn2rln4bskCeD0ncHcW2gNgARDworDSAAAAF9Qf6oZA";
  kakao_expires_in: string; //"7199";
  kakao_refresh_token_expires_in: string; //"5183999";
  browser: string; //"Google Chrome";
  follower: UserType[];
  following: UserType[];
  
};
