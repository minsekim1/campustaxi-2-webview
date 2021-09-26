import { RecoilRoot } from "recoil";
import HomeScreen from "./screen/HomeScreen";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";
import SearchScreen from './screen/SearchScreen';
import CourseCreateScreen from './screen/CourseCreateScreen';
import CourseDetailScreen from './screen/CourseDetailScreen';
import CourseScreen from './screen/CourseScreen';
import ShopScreen from './screen/ShopScreen';
import MyChatScreen from './screen/MyChatScreen';
import MyScreen from './screen/MyScreen';

const App = ()=> {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          {/* minsekim
           * 모든 .push 화면이동은 postMessage 로 Native 앱에 푸쉬를 보내야함. 아니면 화면 뒤로가기하면 사라짐.
           */}
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route exact path="/course/create">
            <CourseCreateScreen />
          </Route>
          <Route exact path="/course/detail">
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
          <Route exact path="/chat/my">
            <MyChatScreen />
          </Route>
          <Route exact path="/my">
            <MyScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
