import { Avatar, AvatarGroup } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import useSWR from "swr";
import fetcher from "../hook/useSWR/fetcher";
import { GRAY6, GRAY8 } from "../style";
import { ChatRoomType } from "../types/ChatRoom";
import { API_URL } from "./common";
import { Icon } from "./common/Icon";
import { MenuModalState } from "./recoil";


type PropType = {
	roomData: ChatRoomType | null;
};
export const BackHeaderRight = ({ roomData }: PropType) => {
	const history = useHistory();
	const setMenu = useSetRecoilState(MenuModalState)

	if (!roomData) return <></>;
	const onMenu = () => setMenu({visible:true})
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				position: "sticky",
				backgroundColor: "white",
				top: 0,
				zIndex: 5,
			}}
			className={"topNotchHeader"}
		>
			<div style={{ flex: 1, padding: 16 }}>
				<div style={{ width: 30 }} onClick={() => history.goBack()}>
					<Icon name={"faChevronLeft"} color={GRAY8} type={"light"} />
				</div>
			</div>
			<div style={{ flex: 1, display: "flex", justifyContent: "center", padding: 8, fontWeight: "bold" }}>
				<AvatarGroup max={4}>
					{roomData.enter_users.map((u) =>
						
						<Avatar sx={{ border: "1px solid gray" }}
							alt={u.nickname}
							src={u.profile_image}
							style={{ width: 32, height: 32 }}
						>
							{u.nickname.slice(0, 1)}
						</Avatar>
					)}
				</AvatarGroup>
			</div>
			{/* 메뉴 : 차단하기 및 삭제하기 */}
			<div style={{ flex: 1, display: "flex", justifyContent: "flex-end", margin: "8px 16px 8px 8px" }}onClick={onMenu}>
				<div style={{ padding: 8 }}>
					<Icon name={"faBars"} color={GRAY8} size={16} type="light"/>
				</div>
			</div>
		</div>
	);
};