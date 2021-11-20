import { CircularProgress } from "@mui/material";
import { useRecoilState } from "recoil";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { MessageChatType } from "../../screen/ChatScreen";
import { GRAY2, GRAY5, GRAY7 } from "../../style";
import { lastMessageMarginBottomState } from "../recoil";

export const MessageChatCard = ({
	data,
	mref,
	isLast = false,
}: {
	data: MessageChatType;
	mref?: any;
	isLast?: boolean;
	}) => {
	console.log(data)
	switch (typeof data.media) {
		// 추후 사진/동영상 전송
		// case 'string':
		// 	return <DefaultChat data={data} mref={mref} isLast={isLast} />;
		default:
			return <DefaultChat data={data} mref={mref} isLast={isLast} />;
	}
};

export const myNickname = "minseki";
const DefaultChat = ({ data, mref, isLast = false }: { data: MessageChatType; mref?: any; isLast?: boolean }) => {

	const { height, width } = useWindowDimensions();
	const [lastMessageMarginBottom] = useRecoilState(lastMessageMarginBottomState); //setLastMessageMarginBottom
	const isMy = data.user_id  ? data.user_id.nickname === myNickname : true;

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
						{data.created_at}
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