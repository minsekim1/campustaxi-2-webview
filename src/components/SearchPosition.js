import { useEffect, useRef } from "react";
import { Input, InputSearch } from "./Input";
import { getfetch } from './common/index';

export const SearchPosition = () => {
	const title = useRef('');
	
	const onChange = () => {
		getfetch()
	};
	return (
    <div style={{ position: "absolute", top: 96 + 24, left: 10, zIndex: 1 }}>
      <InputSearch value={title} placeholder={"검색 장소를 입력해주세요."} onChange={onChange} />
    </div>
  );
};
