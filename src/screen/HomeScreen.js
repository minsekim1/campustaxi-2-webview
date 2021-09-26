import React from "react";
import { BottomHeader } from "../components/BottomHeader";
import { BottomTabBar } from "../components/BottomTabBar";
import { CreateBtn } from "../components/Btn/CreateBtn";
import { NMAP } from "../components/NMap";
import { BottomModal, CreateBottomModal } from './../components/BottomModal';

const HomeScreen = () => {
  return (
    <>
      <BottomHeader />
      <NMAP />
      <CreateBtn/>
      <BottomModal />
      <CreateBottomModal />
      <BottomTabBar />
    </>
  );
};


export default HomeScreen;
