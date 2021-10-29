import { InputSearch } from ".";
import { useState } from "react";

export const SearchBar = () => {
  const [filterSearchTxt, setFilterSearchTxt] = useState("");

  const onChangeFilterSearchTxt = (t) => {
    setFilterSearchTxt(t);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InputSearch
        value={filterSearchTxt}
        placeholder={"검색 장소를 입력해주세요."}
        onChange={onChangeFilterSearchTxt}
      />
    </div>
  );
};
