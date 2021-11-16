export type CreatorType = {
	id: number;
	username: string; //"kim";
	email: string; //"tkarnrwl7862@naver.com";
	provider: "local";
	confirmed: false;
	blocked: false;
	role: number;
	nickname: string; //"nickname";
	profile_image: string | null;
	point: number;
	greeting: string; //"인삿말이 없습니다.";
	device_type: string; //"android";
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
	created_at: string; //"2021-11-06T08:40:56.000Z";
	updated_at: string; //"2021-11-06T08:40:56.000Z";
}
export type CourseType = {
	id: number;
	description: string; //"힐링2";
	deleted_at: string | null;
	creator_id: CreatorType;
	title: string; //"힐링1";
	content: string; //'[{"id":"item-1636275004918","content":"힐링해요~","type":"text"},{"id":"item-1636275051161","content":{"inputValue":"","tagList":[{"id":"힐링","text":"힐링"}]},"type":"tag"},{"id":"item-1636275051196","content":"3","type":"text"}]';
	published_at: string; //"2021-11-07T11:38:10.000Z";
	created_at: string; //"2021-11-07T11:38:10.000Z";
	updated_at: string; //"2021-11-07T11:38:10.000Z";
	tag_id: string | null;
	tag: string | null;
	images: [
		{
			id: number;
			name: string//"1636285088580.jpeg";
			alternativeText: string | null;
			caption: string | null;
			width: string | null;
			height: string | null;
			formats: string | null;
			hash: string; // "1636285088580_2d6244a05c";
			ext: string; //".jpeg";
			mime: string; // "image/jpeg";
			size: number; //0.06;
			url: string; //"/uploads/1636285088580_2d6244a05c.jpeg";
			previewUrl: string | null;
			provider: "local";
			provider_metadata: string | null;
			created_at: string; //"2021-11-07T11:38:09.000Z";
			updated_at: string; //"2021-11-07T11:38:09.000Z";
		}
	];
	tags: [
		{
			id: number;
			common_code_id: string | null;
			course_id: string | null;
			published_at: string; //"2021-11-07T08:05:05.000Z";
			created_at: string; //"2021-11-07T08:04:52.000Z";
			updated_at: string; //"2021-11-07T08:05:05.000Z";
			name: string; //"힐링";
		}
	];
};
