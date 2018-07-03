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