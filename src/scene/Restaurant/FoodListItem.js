import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, DeviceEventEmitter,} from 'react-native'
import screen from '../../common/screen'
import pxToDp from '../../common/pxToDp'
import Colors from '../../common/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = screen
type Props = {
    info: Object,
    onAddPress: Function,
   // onPressItem: Function,
}

type State = {

}
export default class FoodListItem extends PureComponent <Props, State>{
    /*_onPress = (e) => {
        let info = this.props.info
        DeviceEventEmitter.emit('add',e,info); //发监听
    }*/
    render() {
        let { info,onAddPress } = this.props
        //const temp = '../../img/restaurant/yuanyangguodi.jpeg'
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri:'http://p0.meituan.net/waimaipoi/6b28d0851586128b0f29cc74355257a798875.jpg'}} style={styles.icon} />
                </View>
                <View style={styles.midContainer}>
                    <Text style={{color:'#101010', fontSize: pxToDp(14)}}>{info.name}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text style={{fontSize: pxToDp(11), marginLeft:-8}}>月售{info.monthlySale}  </Text>
                        <Text style={{fontSize: pxToDp(11)}}>赞{info.like}</Text>
                    </View>
                    <Text style={{fontSize: pxToDp(16), color:'#E51C2A'}}>￥{info.price}</Text>
                </View>
                
                <View style={styles.rightContainer}>
                    <TouchableOpacity  
                        style={{width:width * 0.067, height:width * 0.067, justifyContent:'center', alignItems:'center'}} 
                        onPress={ (e) => onAddPress(e,info) }
                    > 
                        <Icon name="plus-circle" size={width * 0.067} color="#E51C2A"/>
                    </TouchableOpacity>
                </View>
            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width-80,
        height:110,
        flexDirection:'row',
        backgroundColor:'white',
        paddingVertical: 10,
        justifyContent:'center',

        borderBottomWidth: 1,
        borderColor: Colors.gray_E0E0E0,
    },
    leftContainer: {
        width: (width-80)*0.4,
        height: (width-80)*0.3,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
        width: (width-80)*0.3,
        height: (width-80)*0.3,
        borderRadius: 5,
    },
    midContainer: {
        width:(width-80)*0.4,
        alignItems:'center',
        justifyContent:'space-around',
        marginLeft: -10,
    },
    rightContainer: {
       // flex:1,
        width:(width-80)*0.2,
        height:(width-80)*0.3,
        justifyContent:'flex-end',
        marginBottom: 20,
        alignItems:'center',
    }
})

