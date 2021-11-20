import { BottomTabBar } from "../components/BottomTabBar";
import { BottomModal } from './../components/BottomModal';
import { FaFilter, FaSearch } from "react-icons/fa";
import useWindowDimensions from "../hook/useWindowDimensions";
import { GRAY1, GRAY2, GRAY8, GRAY9 } from "../style";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { TitleHeader } from "../components/TitleHeader";

var counts = 0;
const ShopScreen = () => {
  return (
    <>
      <div style={{position:'sticky', height:56 , top:0, background:GRAY2, zIndex:2}}>
        <TitleHeader title="SHOP" />
      </div>
      <ShopCard />
      <BottomTabBar />
    </>
  );
};
const ShopCard = () => {
  const { height, width } = useWindowDimensions();
  return (
    <>
      <div
        style={{
          backgroundColor: GRAY1,
          height: height,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          position: 'relative',
          top:-30
        }}
        onClick={() =>
          open(
            "https://www.11st.co.kr/products/3215920069?NaPm=ct=kw7sstow|ci=f6c1f183068b064c15b5d369abf32a9b0ee6384d|tr=slct|sn=17703|hk=9535048eb4706134446bcf47e1fec54a957453b6&utm_term=&utm_campaign=%B3%D7%C0%CC%B9%F6pc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B3%D7%C0%CC%B9%F6_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3"
          )
        }
        // onClick={() => open("https://smartstore.naver.com/campustaxi/products/5976589929")}
      >
        <Card sx={{ borderRadius: 12, marginBottom: 8 }}>
          <CardActionArea sx={{ width: 345, height: 600, display: "flex", flexDirection: "column" }}>
            <CardMedia component="img" height="440" image="/images/shopItem.png" alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <span style={{ fontSize: 21 }}>진공 스테인리스 LED 온도표시 스마트 터치 텀블러</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <s>15,000원</s> <span style={{ fontSize: 25, color: GRAY9 }}>10,000원</span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}
export default ShopScreen;
