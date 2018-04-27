import {Dimensions, StatusBar} from 'react-native'

//输出手机屏幕的宽高

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    statusBarHeight: StatusBar.currentHeight,
    screenHeight: Dimensions.get('window').height - StatusBar.currentHeight,
    botBarHeight: (Dimensions.get('window').height - StatusBar.currentHeight) * 0.1,
    titleHeight: (Dimensions.get('window').height - StatusBar.currentHeight) * 0.07,
    listItemHeight: (Dimensions.get('window').height - StatusBar.currentHeight) * 0.08,
}