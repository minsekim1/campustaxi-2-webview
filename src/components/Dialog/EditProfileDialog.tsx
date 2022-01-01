import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editProfileDialogState, loadingState, userDataState } from "./../recoil";
import { GRAY4, GRAY5, GRAY6, GRAY8 } from "./../../style/index";
import { Avatar, Badge, Input, TextField } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Icon } from "../common/Icon";
import { useRef, useState } from "react";
import { API_URL_NO_Proxy, postfetch } from "../common";
import { useParams } from "react-router";
import axios from "axios";
import { dataURLtoFile } from "../modal/CourseCreateModal";

export const EditProfileDialog = () => {
	const [userData, setUserData] = useRecoilState(userDataState);
	const [editProfileDialogInfo, setEditProfileDialogInfo] = useRecoilState(editProfileDialogState);
	const setLoading = useSetRecoilState(loadingState);
	const p: any = useParams();
	const id = p.id;
	const nickname = useRef<string | null>(userData?.nickname ?? null);
	const email = useRef<string | null>(userData?.email ?? null);
	const greeting = useRef<string | null>(userData?.greeting ?? null);
	const imgFile = useRef<File>();
	const [imgUrl, setImgUrl] = useState(userData?.profile_image);
	const handleClose = () => {
		setEditProfileDialogInfo({ ...editProfileDialogInfo, visible: false });
	};
	const handleProfileImg = (event: any) => {
		if (!event.target.files) return;
		const file: File = event.target.files[0];
		const limitSize = 10; //10MB로 제한.
		if (file.size > 1024 * 1024 * limitSize) {
			// 용량 초과시 경고후 해당 파일의 용량도 보여줌
			const currentFileSize = Math.round((file.size / 1024 / 1024) * 100) / 100 + "MB";
			alert(`${limitSize}MB 이하 파일만 등록할 수 있습니다.\n\n` + "현재파일 용량 : " + currentFileSize);
			return;
		}
		event.target.value = "";
		const url = URL.createObjectURL(file);
		setImgUrl(url)
		imgFile.current = file;
	};
	const hanedleSubmit = async () => {


		setLoading(true);
		//imgFile.current
		// if (imgFile.current) { alert('현재 프로필 이미지 교체는 안됩니다.'); imgFile.current = undefined; }
		if (imgFile.current) {
			// 프로필 사진 업로드
			const data = new FormData();
			data.append("files", imgFile.current);
			await axios.post(`${API_URL_NO_Proxy}/upload`, data).then(async (d: any) => {
				// FIXME 나중에 서버연결 후 교체할것
				const url = d.data[0].url;
				const params = { nickname: nickname.current, email: email.current, profile_image: url, greeting: greeting.current };
				postfetch(`/users/${id}`, JSON.stringify(params), true, "PUT").then((d: any) => {
					if (typeof d.id === "number") setUserData((prev: any) => { console.log({ ...prev, ...d }); return { ...prev, ...d } })
				});
			})
		} else {
			const params = { nickname: nickname.current, email: email.current, greeting: greeting.current };
			await postfetch(`/users/${id}`, JSON.stringify(params), true, "PUT").then((d: any) => {
				if (typeof d.id === "number") setUserData((prev: any) => { console.log({ ...prev, ...d }); return { ...prev, ...d } })
			});
		}



		handleClose();
		setLoading(false);
	};
	return (
		<div>
			<Dialog
				open={editProfileDialogInfo.visible}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">프로필 수정</DialogTitle>
				<DialogContent style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom:0 }}>
					<input accept="image/*" style={{ display: "none" }} id="file-picker" type="file" onInput={handleProfileImg} />
					<label htmlFor="file-picker">
						<Badge
							overlap="circular"
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							badgeContent={
								<div
									style={{
										backgroundColor: GRAY6,
										borderRadius: 100,
										padding: 4,
										borderStyle: "solid",
										borderWidth: 2,
										borderColor: "white",
									}}
								>
									<Icon name={"faHammer"} color={"white"} />
								</div>
							}
						>
							<Avatar sx={{ border: "1px solid gray" }}
								src={imgUrl ?? undefined}
								style={{ width: 56, height: 56 }}
							>
								{userData?.nickname.slice(0, 1)}
							</Avatar>
						</Badge>
					</label>
					<TextField
						onChange={(e) => {
							nickname.current = e.target.value;
						}}
						id="outlined-basic"
						label="Nickname"
						variant="outlined"
						size="small"
						margin="normal"
						defaultValue={nickname.current}
					/>
					<TextField
						onChange={(e) => {
							email.current = e.target.value;
						}}
						id="outlined-basic"
						label="Email"
						variant="outlined"
						size="small"
						defaultValue={email.current}
						margin="normal"
					/>
					
					
				</DialogContent>
				<div style={{padding:"0 24px", }}>
				<TextField
					onChange={(e) => {
						greeting.current = e.target.value;
						}}
						fullWidth
					multiline
					id="outlined-basic"
					label="인삿말"
					variant="outlined"
					size="small"
					defaultValue={greeting.current}
					margin="normal"
					maxRows={7}
					/>
				</div>
				
				<DialogActions>
					<Button onClick={handleClose} style={{ color: GRAY6 }}>
						취소
					</Button>
					<Button onClick={hanedleSubmit} style={{ color: "#d32f2f" }}>
						수정
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};


