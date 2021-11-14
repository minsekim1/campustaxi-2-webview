import { BottomTabBar } from "../components/BottomTabBar";
import { NMAP } from '../components/NMap';
import './MyScreen.css';
import { FaChevronLeft, FaHeadset, FaPenAlt } from "react-icons/fa";


var points = 0, following = 0, follower = 0, courseNum = 0;
var address="서울시 강남구", name="캠퍼스택시"
const MyScreen = () => {
  return (
    <header>
      <div className="myScreenTop">
        <div className="topMenu">
        <FaChevronLeft style={{margin: 10, width: 30, height: 30, color: '#343A40'}}/>
        </div>
        <div className="profilePhoto">
          <img className="photo" src="https://pbs.twimg.com/profile_images/763061332702736385/KoK6gHzp_400x400.jpg"></img>
        </div>
        <div className="profileName">
          <div>
            <p className="name">{name}</p><FaPenAlt style={{color: '343A40', marginLeft: 5, height: 15}}/>
            <div className="points">{points} 보유중</div>
          </div>
          <p className="address">{address}</p>
          <p className="followInfor">팔로잉 {following} 팔로워 {follower} 코스제작 {courseNum}</p>
        </div>
      </div>
      <div className="myScreenBottom">
        <div className="buttons">
          <button>이용 내역</button>
          <button>경로 제작</button>
        </div>
      </div>
    </header>
  );
};

export default MyScreen;


/* 
<To-Do-List>
- 팔로잉 한 줄 두 개 style, 
- 가로 스크롤뷰,  
- 버튼 이용내역 디폴트로 클릭 된 상태로 만들기
- Menu 부분 (이전페이지, 고개센터, 옵션),
- 보유 포인트
- 이름 편집 아이콘
*/