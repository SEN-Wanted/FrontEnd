import {Dimensions, StatusBar} from 'react-native'

//输出手机屏幕的宽高

export default { 
    width: Dimensions.get('window').width,       //手机屏幕宽度
    height: Dimensions.get('window').height,      //手机屏幕高度
    statusBarHeight: StatusBar.currentHeight,     //状态栏高度
    screenHeight: Dimensions.get('window').height - StatusBar.currentHeight,     //手机屏幕高度减去状态栏高度
    botBarHeight: (Dimensions.get('window').height - StatusBar.currentHeight) * 0.1,   //购物车底部栏高度
    titleHeight: (Dimensions.get('window').height - StatusBar.currentHeight) * 0.07,    //购物车标题高度
    listItemHeight: (Dimensions.get('window').height - StatusBar.currentHeight) * 0.08,  //购物车列表项高度
}