export type CourseType = {
  id: number;
  title: string | null;
  description: string | null;
  deleted_at: string | null;
  creator_id: CreatorType;
  content: string; //"[{\"id\":\"item-1637380239913\",\"content\":\"삼육대에서 태릉입구까지 같이 타요!!!\",\"type\":\"text\"},{\"id\":\"item-1637380239914\",\"content\":\"\",\"type\":\"contour\"},{\"id\":\"item-1637380239915\",\"content\":{\"inputValue\":\"\",\"tagList\":[{\"id\":\"대학교\",\"text\":\"대학교\"}]},\"type\":\"tag\"},{\"id\":\"item-1637380246852\",\"content\":\"\",\"type\":\"text\"}]",
  end_route: string | null;
  published_at: string; // "2021-11-20T05:24:49.000Z",
  created_at: string; // "2021-11-20T05:24:49.000Z",
  updated_at: string; // "2021-11-20T05:24:49.000Z",
  start_route: string | null;
  images: ImageType[];
  tags: TagType[];
};
export const CourseTypeInit = {
  content: "", //"[{\"id\":\"item-1636275004918\",\"content\":\"힐링해요~\",\"type\":\"text\"},{\"id\":\"item-1636275051161\",\"content\":{\"inputValue\":\"\",\"tagList\":[{\"id\":\"힐링\",\"text\":\"힐링\"}]},\"type\":\"tag\"},{\"id\":\"item-1636275051196\",\"content\":\"3\",\"type\":\"text\"}]"
  created_at: "", //"2021-11-07T11:38:10.000Z"
  creator_id: {},
  deleted_at: "",
  description: "", //"힐링2"
  id: 0,
  images: [],
  published_at: "", // "2021-11-07T11:38:10.000Z"
  tag: "",
  tag_id: "",
  tags: [],
  title: "", //"힐링1"
  updated_at: "", // "2021-11-07T11:38:10.000Z"
};


export type CreatorType = {
  id: number;
  username: string; // "minsekim",
  email: string; // "tkarnrwl78627862@naver.com",
  provider: "local";
  confirmed: boolean; //false,
  blocked: boolean; //false,
  role: number; //1,
  nickname: string; //"nickname1",
  profile_image: string; //"https://picsum.photos/100/100",
  point: number;
  greeting: string; //"인삿말이 없습니다.",
  device_type: string | null;
  device_token: string | null;
  access_token: string | null;
  refresh_token: string | null;
  refresh_token_expire: string | null;
  phone: string | null;
  os: string | null;
  phone_verified_at: string | null;
  device: string | null;
  last_logined_at: string | null;
  last_logined_ip: string | null;
  birth: string | null;
  deleted_at: string | null;
  socket_status: string | null;
  socket_room: string | null;
  socket_id: string | null;
  gender: string | null;
  badge_message: string | null;
  badge_shop: string | null;
  badge_my: string | null;
  created_at: string; //"2021-11-20T04:00:22.000Z",
  updated_at: string; //"2021-11-20T04:00:22.000Z"
  follower: number;
};

type ImageType = {
  id: number;
  name: string; // "1637385960108.jpeg",
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string; // "thumbnail_1637385960108.jpeg",
      hash: string; // "thumbnail_1637385960108_78a99c0c63",
      ext: string; // ".jpeg",
      mime: string; // "image/jpeg",
      width: number; //156,
      height: number; //156,
      size: number; //5.99,
      path: null;
      public_id: string; //"thumbnail_1637385960108_78a99c0c63.jpeg",
      url: string; //"http://218.153.157.69/ftp/thumbnail_1637385960108_78a99c0c63.jpeg"
    };
  };
  hash: string; //"1637385960108_78a99c0c63",
  ext: string; //".jpeg",
  mime: string; //"image/jpeg",
  size: number; //32.44,
  url: string; //"http://218.153.157.69/ftp/1637385960108_78a99c0c63.jpeg",
  previewUrl: string | null;
  provider: string; //"ftp-v2",
  provider_metadata: string | null;
  created_at: string; //"2021-11-20T05:24:48.000Z",
  updated_at: string; // "2021-11-20T05:24:48.000Z"
};
type TagType = {
  id: number;
  name: string; //"대학교",
  published_at: string; // "2021-11-20T05:24:46.000Z",
  created_at: string; //"2021-11-20T05:24:46.000Z",
  updated_at: string; // "2021-11-20T05:24:46.000Z"
};
