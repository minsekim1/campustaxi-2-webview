import { useHistory } from "react-router";
export const BottomHeader = () => {
	const history = useHistory(); // <<-- 추가
	const onClick = () => {
		history.push('/course') //<--페이지 이동하기
	
		history.back() //<-- 뒤로가기
	}
...
return <>
	     <div onClick={onClick}

						</>


						git log로 확인가능

						git pull origin main

						// https://www.figma.com/community/file/912837788133317724
						// 무료 LivePreview