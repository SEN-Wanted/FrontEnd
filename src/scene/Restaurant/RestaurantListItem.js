import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity,Dimensions} from 'react-native'
import screen from '../../common/screen'
import color from '../../widget/color'
import Icon from 'react-native-vector-icons/FontAwesome';


type Props = {
    info: Object,
    onPress: Function,
}

type State = {

}
class RestaurantListItem extends PureComponent <Props, State>{

    render() {
        let {info, onPress} = this.props
        //let imageUrl = info.imageUrl.replace('w.h', '160.0')
  
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{
                onPress(info)
            }}>
                <Image source={require('../../img/home/test.png')} style={styles.icon} />
                <View style={styles.midContainer}>
                    <Text style={{fontSize:15,fontFamily:'Roboto',color:'#101010'}}>海底捞火锅 (珠影星光店)</Text>
                    <View style={{width:140,height:27,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                        
                        <Icon name="star" color='#FFD21F' size={16} />
                        <Icon name="star" color='#FFD21F' size={16} />
                        <Icon name="star" color='#FFD21F' size={16} />
                        <Icon name="star" color='#FFD21F' size={16} />
                        <Icon name="star" color='#FFD21F' size={16} />
                        <Text style={{fontSize:14,marginLeft:10}}>月售487单</Text>
                    </View>
                    <View style={{width:65,height:17,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.textSize11}>人均￥80</Text>
                    </View>
                    
                    <View style={styles.discount}>
                        <View style={{backgroundColor: '#E51C23',width:22,height:16,
                                justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:12}}>折</Text>
                        </View>
                        <View style={{width:105, height:27,justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.textSize11}>折扣商品6.22折起</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Text>2.0km</Text>
                    <View style={{backgroundColor: '#E51C23',width:70,height:17,
                                justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.OfferText}>APP专享优惠</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: 70,
        height: 53,
        borderRadius: 5,
    },
    midContainer: {
       
        paddingLeft: 10,
    },
    discount: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    OfferText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    textSize11: {
        fontSize: 11,
    },
})

export default RestaurantListItem