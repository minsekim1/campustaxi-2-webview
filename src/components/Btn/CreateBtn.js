import { faEdit } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRecoilState } from "recoil";
import { SCREEN_WIDTH } from "../../style";
import { CreateBottomModalState } from "../recoil";

export const CreateBtn = () => {
  const [, setVisible] = useRecoilState(CreateBottomModalState);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div
      style={{
        position: "absolute",
        width: 48,
        height: 48,
        borderRadius: 200,
        backgroundColor: "white",
        bottom: 96 + 24,
        right: SCREEN_WIDTH * 0.125,
        boxShadow: "0.2px 0.2px 0 0 gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faEdit} size={"sm"} />
    </div>
  );
};
