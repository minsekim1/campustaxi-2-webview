export type CourseType = {
	content: string;//"[{\"id\":\"item-1636275004918\",\"content\":\"힐링해요~\",\"type\":\"text\"},{\"id\":\"item-1636275051161\",\"content\":{\"inputValue\":\"\",\"tagList\":[{\"id\":\"힐링\",\"text\":\"힐링\"}]},\"type\":\"tag\"},{\"id\":\"item-1636275051196\",\"content\":\"3\",\"type\":\"text\"}]"
	created_at: string;//"2021-11-07T11:38:10.000Z"
	creator_id: CreatorType;
	deleted_at: null | string;
	description: string;//"힐링2"
	id: number;
	images: ImageType[];
	published_at: string;// "2021-11-07T11:38:10.000Z"
	tag: null;
	tag_id: null;
	tags: TagType[];
	title: string;//"힐링1"
	updated_at: string;// "2021-11-07T11:38:10.000Z"
}
export const CourseTypeInit = {
	content: '',//"[{\"id\":\"item-1636275004918\",\"content\":\"힐링해요~\",\"type\":\"text\"},{\"id\":\"item-1636275051161\",\"content\":{\"inputValue\":\"\",\"tagList\":[{\"id\":\"힐링\",\"text\":\"힐링\"}]},\"type\":\"tag\"},{\"id\":\"item-1636275051196\",\"content\":\"3\",\"type\":\"text\"}]"
	created_at: '',//"2021-11-07T11:38:10.000Z"
	creator_id: '',
	deleted_at: '',
	description: '',//"힐링2"
	id: 0,
	images: [],
	published_at: '',// "2021-11-07T11:38:10.000Z"
	tag: '',
	tag_id: '',
	tags: [],
	title: '',//"힐링1"
	updated_at: '',// "2021-11-07T11:38:10.000Z"
}

type CreatorType = {
	access_token: null | string;
	badge_message: null | string;
	badge_my: null | string;
	badge_shop: null | string;
	birth: null | string;
	blocked: boolean;
	confirmed: boolean;
	created_at: string;// "2021-11-06T08:40:56.000Z"
	deleted_at: null | string;
	device: null;
	device_token: null | string;
	device_type: string;//"android"
	email: string;//"tkarnrwl7862@naver.com"
	gender: null | string;
	greeting: string;//"인삿말이 없습니다."
	id: number;
	last_logined_at: null | string;
	last_logined_ip: null | string;
	nickname: string;//"nickname"
	os: null | string;
	phone: null | string;
	phone_verified_at: null | string;
	point: number;
	profile_image: undefined | string;
	provider: string; //"local"
	refresh_token: null | string;
	refresh_token_expire: null | string;
	role: 1;
	socket_id: null | string;
	socket_room: null | string;
	socket_status: null | string;
	updated_at: string;//"2021-11-06T08:40:56.000Z"
	username: string;// "kim"
}
type ImageType = {
	alternativeText: null | string;
	caption: null | string;
	created_at: string; // "2021-11-07T11:38:09.000Z"
	ext: string; // ".jpeg"
	formats: null | string;
	hash: string;//"1636285088580_2d6244a05c"
	height: null | number;
	id: number;
	mime: string; // "image/jpeg"
	name: string;// "1636285088580.jpeg"
	previewUrl: null | string;
	provider: "local";
	provider_metadata: null | string;
	size: number;//0.06
	updated_at: string; // "2021-11-07T11:38:09.000Z"
	url: string;// "/uploads/1636285088580_2d6244a05c.jpeg"
	width: null | string;
}
type TagType = {
	common_code_id: null | number;
	course_id: null | number;
	created_at: string;//"2021-11-07T08:04:52.000Z"
	id: number;
	name: string;//"힐링"
	published_at: string;// "2021-11-07T08:05:05.000Z"
	updated_at: string;//"2021-11-07T08:05:05.000Z"
}