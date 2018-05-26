import { Dimensions, Platform } from "react-native";

// app 只有竖屏模式，所以可以只获取一次 width
//const deviceWidthDp = Dimensions.get("window").width;

// UI 默认给图是 750
//const uiWidthPx = 360;

/*function pxToDp(uiElementPx) {
  const transferNumb = uiElementPx * deviceWidthDp / uiWidthPx;

  if (transferNumb >= 1) {
    // 避免出现循环小数
    return Math.ceil(transferNumb);
  } else if (Platform.OS === "android") {
    // 如果是安卓，最小为1，避免边框出现锯齿
    return 1;
  }
  return 0.5;
}*/

const screenW = Dimensions.get('window').width
const screenH = Dimensions.get('window').height
const DEFAULT_DENSITY = 2
const w2 = 360 / DEFAULT_DENSITY
const h2 = 640 / DEFAULT_DENSITY

function pxToDp(size:number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

export default pxToDp;