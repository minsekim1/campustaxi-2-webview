import { RecoilRoot, useRecoilState } from "recoil";
import HomeScreen from "./screen/HomeScreen";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import SearchScreen from "./screen/SearchScreen";
import CourseDetailScreen from "./screen/CourseDetailScreen";
import CourseScreen from "./screen/CourseScreen";
import ShopScreen from "./screen/ShopScreen";
import MyChatScreen from "./screen/MyChatScreen";
import MyScreen from "./screen/MyScreen";
import { resetServerContext } from "react-beautiful-dnd";
import { Button } from "@mui/material/Button";
import { CircularProgress, Collapse, LinearProgress } from "@mui/material";
import { loadingState } from "./components/recoil";
import ChatScreen from "./screen/ChatScreen";

/* eslint-disable */

resetServerContext();

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <LoadingPage />
        <Switch>
          {/* minsekim
           * 모든 .push 화면이동은 postMessage 로 Native 앱에 푸쉬를 보내야함. 아니면 화면 뒤로가기하면 사라짐.
           */}
          <Route exact path="/">
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
          <Route exact path="/my">
            <MyScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

const LoadingPage = () => {
  const [loading] = useRecoilState(loadingState);
  return <div>{loading ? <LinearProgress variant={"indeterminate"} color={"info"} /> : false}</div>;
};
export default App;
