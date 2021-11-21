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
function getOperatingSystem(window) {
  let operatingSystem = "Not known";
  if (window.navigator.appVersion.indexOf("Win") !== -1) {
    operatingSystem = "Windows OS";
  }
  if (window.navigator.appVersion.indexOf("Mac") !== -1) {
    operatingSystem = "MacOS";
  }
  if (window.navigator.appVersion.indexOf("X11") !== -1) {
    operatingSystem = "UNIX OS";
  }
  if (window.navigator.appVersion.indexOf("Linux") !== -1) {
    operatingSystem = "Linux OS";
  }

  return operatingSystem;
}
function getBrowser(window) {
  let currentBrowser = "Not known";
  if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
    currentBrowser = "Google Chrome";
  } else if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
    currentBrowser = "Mozilla Firefox";
  } else if (window.navigator.userAgent.indexOf("MSIE") !== -1) {
    currentBrowser = "Internet Exployer";
  } else if (window.navigator.userAgent.indexOf("Edge") !== -1) {
    currentBrowser = "Edge";
  } else if (window.navigator.userAgent.indexOf("Safari") !== -1) {
    currentBrowser = "Safari";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "Opera";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "YaBrowser";
  } else {
    currentBrowser = "Others";
  }

  return currentBrowser;
}

export const OS = () => {
  return getOperatingSystem(window);
};
export const Browser = () => {
  return getBrowser(window);
};