import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, DeviceEventEmitter,} from 'react-native'
import screen from '../../common/screen'
import Colors from '../../common/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';


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
  
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={info.icon} style={styles.icon} />
                </View>
                <View style={styles.midContainer}>
                    <Text style={{color:'#101010',fontSize:20}}>{info.name}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text style={{fontSize:12,marginLeft:-8}}>月售{info.monthlySale}  </Text>
                        <Text style={{fontSize:12}}>赞{info.like}</Text>
                    </View>
                    <Text style={{fontSize:22,color:'#E51C2A'}}>￥{info.price}</Text>
                </View>
                
                <View style={styles.rightContainer}>
                    <TouchableOpacity  
                        style={{width:30,height:30,justifyContent:'center',alignItems:'center'}} 
                        //onPress={this._onPress}
                        onPress={ (e) => onAddPress(e,info) }
                    > 
                        <Icon name="plus-circle" size={30} color="#E51C2A"/>
                    </TouchableOpacity>
                </View>
            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:screen.width-80,
        height:110,
        flexDirection:'row',
        backgroundColor:'white',
        paddingVertical: 10,
        justifyContent:'center',

        borderBottomWidth: 1,
        borderColor: Colors.gray_E0E0E0,
    },
    leftContainer: {
        width: (screen.width-80)*0.4,
        height: (screen.width-80)*0.3,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
        width: (screen.width-80)*0.3,
        height: (screen.width-80)*0.3,
        borderRadius: 5,
    },

    midContainer: {
        width:(screen.width-80)*0.4,
        alignItems:'center',
        justifyContent:'space-around',
        marginLeft: -10,
    },
    rightContainer: {
       // flex:1,
        width:(screen.width-80)*0.2,
        height:(screen.width-80)*0.3,
        justifyContent:'flex-end',
        alignItems:'center',
    }
})

