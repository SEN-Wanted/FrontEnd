import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import screen from '../../common/screen'
import pxToDp from '../../common/pxToDp'
const { width, height, botBarHeight } = screen

type Props = {
    onPress?: Function,
    offerPrice: number,
    totalPrice: number,
}

type State = {

}
export default class ListcarBottom extends PureComponent <Props, State>{
    constructor(props) {
        super(props);
    }

    render() {
        
        let { offerPrice, totalPrice, onPress } = this.props
        return (
            <View style={styles.container}>
				<View style={styles.leftView}>
					<Text style={{fontSize: pxToDp(15), color: '#555555'}}>待支付</Text>
					<Text style={{fontSize: pxToDp(15), color: '#E51C23'}}>￥{totalPrice}</Text> 
				</View>
				<View style={styles.midView}>
					<Text style={{fontSize: pxToDp(12), color: '#555555'}}>已优惠￥{offerPrice}</Text>
				</View>
				<TouchableOpacity 
                    style={styles.button} 
                    onPress={onPress? onPress : ()=>{alert("提交测试！")}}
            	>
                	<Text style={{color:'white', fontSize: pxToDp(14)}}>提交订单</Text>
                </TouchableOpacity>
			</View>  
        )      
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    leftView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: botBarHeight,
        width: width * 0.14,
    },
    midView: {
        width: width * 0.28,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: botBarHeight,
    },
    button: {
        backgroundColor: '#E51C23',
        borderRadius: 10,
        width: width * 0.283,
        height: botBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
})