import { BottomTabBar } from "../components/BottomTabBar";
import { BottomModal } from './../components/BottomModal';

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
    <>

      <BottomModal />
      <BottomTabBar />
    </>
  );
};



export default ShopScreen;

