import { useState } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import fetcher from "../hook/useSWR/fetcher";
import { GRAY6, GRAY8 } from "../style";
import { API_URL } from "./common";
import { Icon } from "./common/Icon";


type PropType = {
	title: string;
	userImg?: string | undefined | null;
	roomId?: string;
};
export const BackHeaderRight = ({ title, userImg = "", roomId }: PropType) => {

	//#region 토큰 가져오기
	const history = useHistory();
	const { data, error, mutate } = useSWR(`${API_URL}/users?id=${1}`, fetcher);
	//#endregion

	return (
		<>
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
					<div style={{ width: 30 }} onClick={()=>history.goBack()}>
						<Icon name={"faChevronLeft"} color={GRAY8} type={"light"} />
					</div>
				</div>
				<div style={{ flex: 1, display: "flex", justifyContent: "center", padding: 16, fontWeight: "bold" }}>
					{userImg ? <img src={userImg} width={24} height={24} style={{ borderRadius: 40, marginRight: 8 }} /> : false}
					{title}
				</div>
				{/* 차단하기 및 삭제하기 */}
				<div style={{ flex: 1, display: "flex", justifyContent: "flex-end", margin: "8px 16px 8px 8px" }}>
						<div style={{ padding: 8 }}>
						{/* <Icon name={"ellipsis-v-alt"} type={'light'} color={GRAY8} size={12} /> */}
						</div>
				</div>
			</div>
		</>
	);
};