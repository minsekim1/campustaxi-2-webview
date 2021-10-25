import React from "react";
import { Icon } from './../common/Icon';

export const BookmarkBtn = ({disable}) => {
  const onClick = () => {
    if (!disable) {
      alert("즐겨찾기!")
    }
  };
  return (
    <div
      style={{
        fontSize: 13,
        padding: 12,
        margin: "24px 12px",
        backgroundColor: disable ? "rgba(255,102,0,0.3)" : "rgba(255,102,0,1)",
        borderRadius: "10px",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <Icon name={"faBookmark"} type={"regular"} color={"white"} />
      <div style={{ marginLeft: 12 }}>북마크 추가</div>
    </div>
  );
};
