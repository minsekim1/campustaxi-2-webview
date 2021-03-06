import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import HomeScreen from "./screen/HomeScreen";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import SearchScreen from "./screen/SearchScreen";
import CourseDetailScreen from "./screen/CourseDetailScreen";
import CourseScreen from "./screen/CourseScreen";
import ShopScreen from "./screen/ShopScreen";
import MyChatScreen from "./screen/MyChatScreen";
import UserScreen from "./screen/UserScreen";
import { resetServerContext } from "react-beautiful-dnd";
import { LinearProgress } from "@mui/material";
import { loadingState } from "./components/recoil";
import ChatScreen from "./screen/ChatScreen";
import moment from "moment";
import "moment/locale/ko";
import { Redirect } from "./screen/Redirect";
/* eslint-disable */

export const isIOSPublishing = false; //iOS 심사중일때는 켜놓을것.
resetServerContext();

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <LoadingPage />
        <Switch>
          <Route exact path="/">
            {/* <HomeScreenPre /> */}
            <HomeScreen />
          </Route>
          <Route exact path="/home">
            <HomeScreen />
          </Route>
          <Route exact path="/course/detail/:id">
            <CourseDetailScreen />
          </Route>
          <Route exact path="/course">
            <CourseScreen />
          </Route>
          <Route path="/search">
            <SearchScreen />
          </Route>
          {/* jeong */}
          <Route path="/shop">
            <ShopScreen />
          </Route>
          {/* seo */}
          <Route exact path="/mychat">
            <MyChatScreen />
          </Route>
          <Route exact path="/chat/:id">
            <ChatScreen />
          </Route>
          <Route exact path="/user/:id">
            <UserScreen />
          </Route>
          <Route exact path="/redirect">
            <Redirect />
          </Route>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

const LoadingPage = () => {
  const loading = useRecoilValue(loadingState);
  return (
    <div>{loading ? <LinearProgress style={{ zIndex: 99 }} variant={"indeterminate"} color={"info"} /> : false}</div>
  );
};
export default App;
