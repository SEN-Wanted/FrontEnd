import {Dimensions} from 'react-native'

//输出手机屏幕的宽高
export default {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}