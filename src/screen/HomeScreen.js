import React, { useEffect } from "react";
import { BottomHeader } from "../components/BottomHeader";
import { BottomTabBar } from "../components/BottomTabBar";
import { CreateBtn } from "../components/Btn/CreateBtn";
import { PreRegistrationPopup } from "../components/Dialog/PreRegistrationPopup";
import { NMAP } from "../components/NMap";
import { SearchPosition } from "../components/SearchPosition";
import { SelectMapModal } from "../components/SelectMapModal";
import { BottomModal, CreateBottomModal } from "./../components/BottomModal";

const HomeScreen = () => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "overflow: hidden;");
    return () => body.setAttribute("style", "overflow: scroll;");
  }, []);
  return (
    <>
      {/* <PreRegistrationPopup/> */}
      <BottomHeader />
      <SearchPosition />
      <NMAP />
      <CreateBtn />
      <BottomModal />
      <CreateBottomModal />
      <SelectMapModal />
      <BottomTabBar />
    </>
  );
};

export default HomeScreen;
