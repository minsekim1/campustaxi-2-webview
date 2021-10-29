import { GRAY8 } from "./../style/index";

export const PathInfo = ({ data }) => {
  if (typeof data.distance != "number" || data.distance < 1) return <div></div>;
  return (
    <div style={{ width: "100%", height: 40, top: 10, position: "absolute", display: "flex", alignItems: "center" }}>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(222, 226, 230,0.8)",
          paddingTop: 4,
          paddingBottom: 4,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <div style={{ textAlign: "center", color: GRAY8, fontSize: 11 }}>택시 거리</div>
        <div style={{ textAlign: "center", color: GRAY8, fontSize: 15 }}>{data.distance}km</div>
      </div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(222, 226, 230,0.8)",
          paddingTop: 4,
          paddingBottom: 4,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <div style={{ textAlign: "center", color: GRAY8, fontSize: 11 }}>예상 시간</div>
        <div style={{ textAlign: "center", color: GRAY8, fontSize: 15 }}>{data.duration}분</div>
      </div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(222, 226, 230,0.8)",
          paddingTop: 4,
          paddingBottom: 4,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <div style={{ textAlign: "center", color: GRAY8, fontSize: 11 }}>택시 요금</div>
        <div style={{ textAlign: "center", color: GRAY8, fontSize: 15 }}>{data.taxiFare}원</div>
      </div>
    </div>
  );
};
