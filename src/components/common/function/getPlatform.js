export const getPlatform = () => {
  if (/Android/i.test(navigator.userAgent)) {
    // 안드로이드
    return "android";
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // iOS 아이폰, 아이패드, 아이팟
    return "ios";
  } else {
    // 그 외 디바이스
    return "other";
  }
};
