import { CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { MessageChatType } from "../../screen/ChatScreen";
import { GRAY2, GRAY5, GRAY7 } from "../../style";
import { lastMessageMarginBottomState, userDataState } from "../recoil";

export const MessageChatCard = ({
	data,
	mref,
	isLast = false,
}: {
	data: MessageChatType;
	mref?: any;
	isLast?: boolean;
	}) => {
	switch (typeof data.media) {
		// 추후 사진/동영상 전송
		// case 'string':
		// 	return <DefaultChat data={data} mref={mref} isLast={isLast} />;
		default:
			return <DefaultChat data={data} mref={mref} isLast={isLast} />;
	}
};

const DefaultChat = ({ data, mref, isLast = false }: { data: MessageChatType; mref?: any; isLast?: boolean }) => {

	const [userData] = useRecoilState(userDataState);
	const { height, width } = useWindowDimensions();
	const [lastMessageMarginBottom] = useRecoilState(lastMessageMarginBottomState); //setLastMessageMarginBottom
	const isMy = data.user_id ? data.user_id.nickname === userData?.nickname : true;

	const year = data.created_at ? Number(data.created_at.slice(0, 4)) : "";
	const month = data.created_at ? Number(data.created_at.slice(5, 7)): "";
	const day = data.created_at ? Number(data.created_at.slice(8, 10)) : "";
	const date = data.created_at ? `${year}년 ${month}월 ${day}일` : ""

	const hour = data.created_at ? Number(data.created_at.slice(11, 13)) : 0;
	const min = data.created_at ? data.created_at.slice(13, 16) : "";
	const AMPM = hour < 12;
	const time = AMPM ? `오전 ${hour}${min}` : `오후 ${hour === 12 ? 12 : hour - 12}${min}`;
	return (
		<div
			style={{
				display: "flex",
				justifyContent: isMy ? "flex-end" : "flex-start",
				width: width - 32,
				padding: "2px 16px",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", alignItems: isMy ? "flex-end" : "flex-start" }}>
				<div
					style={{
						backgroundColor: isMy ? GRAY7 : GRAY2,
						padding: "12px 16px",
						borderRadius: isMy ? "16px 16px 0 16px " : "16px 16px 16px 0 ",
						color: isMy ? "white" : GRAY7,
						fontWeight: "normal",
						fontSize: 14,
						maxWidth: width - 80,
						wordBreak: "break-all",
					}}
				>
					{data.message}
				</div>
				{data.created_at ? (
					<div
						ref={mref}
						style={{
							color: GRAY5,
							fontWeight: "normal",
							fontSize: 12,
							marginTop: 4,
							paddingBottom: isLast ? lastMessageMarginBottom : 0,
						}}
					>
						{date+" "+time}
					</div>
				) : (
					<div
						ref={mref}
						style={{
							color: GRAY5,
							fontWeight: "normal",
							fontSize: 12,
							marginTop: 4,
							paddingBottom: isLast ? lastMessageMarginBottom : 0,
						}}
					>
						<CircularProgress color="inherit" size={12} />
					</div>
				)}
			</div>
		</div>
	);
};