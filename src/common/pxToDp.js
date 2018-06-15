/*import { Dimensions, Platform, PixelRatio } from "react-native";

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const fontScale = PixelRatio.getFontScale()            //返回字体大小缩放比例
const pixelRatio = PixelRatio.get()       //当前设备的像素密度
const defaultPixel = 3            //设计机是华为荣耀P9,像素密度是424ppi,所以密度为3
const w2 = 1080 / defaultPixel
const h2 = 1920 / defaultPixel
const scale = Math.min(deviceWidth / w2, deviceHeight / h2)   //获取缩放比例

function pxToDp(size:number) {
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size / defaultPixel;
}
*/
import { Dimensions, PixelRatio } from 'react-native';

// 设备宽度，单位 dp
const deviceWidthDp = Dimensions.get('window').width;

const fontSizeScaler =  PixelRatio.getFontScale()
// 设计稿宽度（这里为360px），单位 px
const uiWidthPx = 360;

// px 转 dp（设计稿中的 px 转 rn 中的 dp）
function pxToDp(size:number) {
  return size * deviceWidthDp / uiWidthPx 
}

export default pxToDp;