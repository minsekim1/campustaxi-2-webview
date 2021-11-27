import { BottomTabBar } from "../components/BottomTabBar";
import { BottomModal } from "./../components/BottomModal";
import { FaFilter, FaSearch } from "react-icons/fa";
import useWindowDimensions from "../hook/useWindowDimensions";
import { GRAY1, GRAY2, GRAY8, GRAY9 } from "../style";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useEffect } from "react";
import { loadingState } from "../components/recoil";
import { useRecoilState } from "recoil";
import { BottomHeader } from "../components/BottomHeader";

const ShopScreen = () => {
  // #region 스크롤 닫기
  const [, setLoading] = useRecoilState(loadingState); //loading
  const body = document.getElementsByTagName("body")[0];
  useEffect(() => {
    body.removeAttribute("style");
    return () => setLoading(false);
  }, [body]);
  // #endregion
  return (
    <>
      <div style={{ position: "sticky", height: 64 + 8, top: 0, background: GRAY2, zIndex: 2 }}>
        <BottomHeader title="SHOP" noProfile />
      </div>
      <ShopCard />
      <BottomTabBar />
    </>
  );
};;
const ShopCard = () => {
  const { height, width } = useWindowDimensions();
  return (
    <>
      <div
        style={{
          backgroundColor: GRAY1,
          height: height - 56,
          width: width,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        
        onClick={() => open("https://smartstore.naver.com/campustaxi/products/5976589929")}
      >
        <Card sx={{ borderRadius: 12, marginBottom: 8 }}>
          <CardActionArea sx={{ width: 300, height: 540, display: "flex", flexDirection: "column" }}>
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
};
export default ShopScreen;
