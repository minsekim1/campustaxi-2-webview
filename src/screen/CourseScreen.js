import { BottomHeader } from "../components/BottomHeader";
import { BottomTabBar } from "../components/BottomTabBar";
import { SearchBar } from "../components/Input/SearchBar";
import { CourseArea } from "../components/CourseArea";
import { CreateBtnCourse } from "../components/Btn/CreateBtnCourse";
import { CourseCreateModal } from "./../components/modal/CourseCreateModal";
import { CropScreen } from "./../components/modal/CropScreen";
import { CourseProductModal } from "../components/modal/CourseProductModal";
import { AlertDialog } from "./../components/Dialog/AlertDialog";

const CourseScreen = () => {
  return (
    <>
      <BottomHeader />
      {/* <SearchBar /> */}
      <CourseArea />
      <CreateBtnCourse />
      <CourseProductModal />
      <CourseCreateModal />
      <CropScreen />
      <BottomTabBar />
      <AlertDialog />
    </>
  );
};

export default CourseScreen;
