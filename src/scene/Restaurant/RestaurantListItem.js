import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity,Dimensions} from 'react-native'
import screen from '../../common/screen'
import Colors from '../../common/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import pxToDp from '../../common/pxToDp'

type Props = {
    info: Object,
    onPress: Function,
}

type State = {

}
const { width, height } = screen
export default class RestaurantListItem extends PureComponent <Props, State>{

    render() {
        const host = "http://2v0683857e.iask.in:22871"
        let {info, onPress} = this.props
        //let imageUrl = info.imageUrl.replace('w.h', '160.0')
  
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{
                onPress(info)
            }}>
                <Image source={{uri:host+info.icon}} style={styles.icon} />
                <View style={styles.midContainer}>
                    <Text style={{fontSize:pxToDp(14),fontFamily:'Roboto',color:'#101010'}}>{info.storeName}</Text>
                    <View style={{width:140,height:27,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                        
                        <Icon name="star" color={info.starRating > 0 ? '#FFD21F':'#AAAAAA'} size={pxToDp(17)} />
                        <Icon name="star" color={info.starRating > 1 ? '#FFD21F':'#AAAAAA'} size={pxToDp(17)} />
                        <Icon name="star" color={info.starRating > 2 ? '#FFD21F':'#AAAAAA'} size={pxToDp(17)} />
                        <Icon name="star" color={info.starRating > 3 ? '#FFD21F':'#AAAAAA'} size={pxToDp(17)} />
                        <Icon name="star" color={info.starRating > 4 ? '#FFD21F':'#AAAAAA'} size={pxToDp(17)} />
                        <Text style={{fontSize:pxToDp(10),marginLeft:10}}>月售{info.monthlySell}单</Text>
                    </View>
                    <View style={{width:65,height:17,justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.textSize10}>人均￥{info.price}</Text>
                    </View>
                    
                    <View style={styles.discount}>
                        <View style={{backgroundColor: info.isDiscount?'#E51C23':'white', 
                                width:22,height:16,
                                justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:pxToDp(9)}}>折</Text>
                        </View>
                        <View style={{width:105, height:27,justifyContent:'center',alignItems:'center'}}>
                            <Text style={[styles.textSize10,{color: info.isDiscount?'#ADADAD':'white'}]}>折扣商品{info.discountNumber}折起</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <Text>{info.distance}km</Text>
                    <View style={{backgroundColor: info.isDiscount?'#E51C23':'white',width:70,height:17,
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
        borderColor: Colors.gray_E0E0E0,
        backgroundColor: 'white',
    },
    icon: {
        width: width * 0.203,
        height: width * 0.153,
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
        fontSize: pxToDp(10),
    },
    textSize10: {
        fontSize: 10,
    },
})
