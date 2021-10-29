import React from "react";
import { useRecoilState } from "recoil";
import { GRAY7, SCREEN_WIDTH } from "../../style";
import { CreateRouteBottomModalState } from "../recoil";
import { Icon } from './../common/Icon';
import { GRAY8 } from './../../style/index';

export const CreateBtnCourse = () => {
  const [, setVisibleRoute] = useRecoilState(CreateRouteBottomModalState); //visibleRoute
  const onClick = () => {
    setVisibleRoute(true);
  };
  return (
    <div
      style={{
        position: "fixed",
        width: 60,
        height: 60,
        borderRadius: 200,
        backgroundColor: "white",
        bottom: 96 + 18,
        right: SCREEN_WIDTH * 0.125,
        boxShadow: "0.2px 0.2px 0 0 gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Icon name={"faIcons"} size={"lg"} color={GRAY8} />
        <div style={{ fontSize: 8, color: GRAY7 }}>Create</div>
      </div>
    </div>
  );
};
