import { BottomTabBar } from "../components/BottomTabBar";
import { BottomModal } from './../components/BottomModal';
import "./ShopScreen.css"
import { FaFilter, FaSearch } from "react-icons/fa";

var counts = 0;
const ShopScreen = () => {
  // const [data, setData] = useState([]);
  
  // // useEffect(()=>{},[]) 샵 들어올때 1번 실행
  // useEffect(() => {
  //   // 데이터 가져오기
  //   getfetch("/users").then((d) => setData(d));
  //   // getfetch("/chat-rooms").then((d) => setData(d));

  //   //데이터 저장하기
  //   // postfetch("/chat-rooms", {저장할 값들})
  //   // alert(data);
  // }, []);

  // // alert('re-render!')
  return (
    <body>
      <div className="shopScreenTop">
        <div className="top">
          SHOP
        </div>
        <div className="count">
          총 {counts}개의 제품
        </div>
        <div className="shopSearch">
          <div>원하시는 상품을 검색해 보세요! <FaSearch style={{marginTop: 2, marginLeft: 5}}/></div>
          <div className="searchIcon"></div>
        </div>
        <div className="shopFilter">
          최신순 <FaFilter style={{marginTop: 2, marginLeft: 5}}/>
        </div>
        <div className="itemViews">
          
        </div>
        </div>
      <BottomModal />
      <BottomTabBar />
    </body>
  );
};
/*
- 프로필 추가
- 돋보기 아이콘 추가
- 'n개'의 제품 font-weight bold
- 필터 아이콘 추가
- 필터 옵션 추가 (가격 낮은 순 / 가격 높은 순)
- 상품 사진&이름 추가
- 아이템 추가 시 바뀔 수 있게
*/


export default ShopScreen;

