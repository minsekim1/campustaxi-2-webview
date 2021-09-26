import { faEdit, faFileEdit } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { BottomHeader } from "../components/BottomHeader";
import { BottomTabBar } from "../components/BottomTabBar";
import { NMAP } from "../components/NMap";
import { BottomModal } from './../components/BottomModal';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./../style/index";

const HomeScreen = () => {
  return (
    <>
      <BottomHeader />
      <NMAP />
      <CreateBtn/>
      <BottomModal />
      <BottomTabBar />
    </>
  );
};
const CreateBtn = () => {
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
    >
      <FontAwesomeIcon icon={faEdit} size={"lg"} />
    </div>
  );
}

export default HomeScreen;
