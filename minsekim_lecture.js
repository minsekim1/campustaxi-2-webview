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