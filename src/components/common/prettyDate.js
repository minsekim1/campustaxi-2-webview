// 로컬 시간을 감안하여 toJSON으로 변환.
Date.prototype.toJSON = function () {
  var timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
  var sign = timezoneOffsetInHours >= 0 ? "+" : "-";
  var leadingZero = Math.abs(timezoneOffsetInHours) < 10 ? "0" : "";
  var correctedDate = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
  var iso = correctedDate.toISOString().replace("Z", "");
  return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ":00";
};

export const prettyDate = (dateString) => {
  const str = dateString;
  const list = str.split(".")[0].split("T");
  const YMD = list[0].split("-"); //[0]년[1]월[2]일
  const HMS = list[1].split(":"); //[0]시[1]분[2]초
  const day = ["일", "월", "화", "수", "목", "금", "토"][new Date(str).getDay()];

  const today = new Date().toJSON();
  const list_today = today.split(".")[0].split("T");
  const YMD_today = list_today[0].split("-"); //[0]년[1]월[2]일
  // const HMS_today = list_today[1].split(":"); //[0]시[1]분[2]초

  if (YMD[0] !== YMD_today[0] || YMD[1] !== YMD_today[1] || Number(YMD[2]) < Number(YMD_today[2]))
    return `${Number(YMD[0])}년${Number(YMD[1])}월${Number(YMD[2])}일`;
  else if (YMD[2] === YMD_today[2]) return `오늘 ${Number(HMS[0])}시${Number(HMS[1])}분`;
  else if (Number(YMD[2]) === Number(YMD_today[2]) + 1) return `내일 ${Number(HMS[0])}시${Number(HMS[1])}분`;
  else if (Number(YMD[2]) === Number(YMD_today[2]) + 2)
    return `모레 ${Number(YMD[2])}일 ${Number(HMS[0])}시${Number(HMS[1])}분`;
  else return `이번주 ${day}요일 ${Number(HMS[0])}시${Number(HMS[1])}분`;
};
