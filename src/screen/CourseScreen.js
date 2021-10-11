import { BottomHeader } from "../components/BottomHeader";
import { BottomTabBar } from "../components/BottomTabBar";
import { Input, InputMap, InputSearch } from "../components/Input/index";
import { useState } from "react";
import { SearchBar } from "../components/Input/SearchBar";
import { CourseList } from "../components/CourseList";
import { CreateBtn } from './../components/Btn/CreateBtn';
import { CreateBtnCourse } from "../components/Btn/CreateBtnCourse";
import { RouteCreateModal } from './../components/modal/RouteCreateModal';
import { CropScreen } from './../components/modal/CropScreen';

const CourseScreen = () => {

  return (
    <>
      <BottomHeader />
      <SearchBar />
      <CourseList />
      <CreateBtnCourse />
      <RouteCreateModal />
      <CropScreen/>
      <BottomTabBar />
    </>
  );
};

export default CourseScreen;
