import { BottomHeader } from "../components/BottomHeader";
import { BottomTabBar } from "../components/BottomTabBar";
import { SearchBar } from "../components/Input/SearchBar";
import { CourseList } from "../components/CourseList";
import { CreateBtnCourse } from "../components/Btn/CreateBtnCourse";
import { RouteCreateModal } from './../components/modal/RouteCreateModal';
import { CropScreen } from './../components/modal/CropScreen';
import { RouteProductModal } from "../components/modal/RouteProductModal";

const CourseScreen = () => {

  return (
    <>
      <BottomHeader />
      <SearchBar />
      <CourseList />
      <CreateBtnCourse />
      <RouteProductModal />
      <RouteCreateModal />
      <CropScreen />
      <BottomTabBar />
    </>
  );
};

export default CourseScreen;
