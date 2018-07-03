import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import screen from '../common/screen'
import pxToDp from '../common/pxToDp'
const {width,height} = screen

type Props = {
    size?: number,
    onPress?: Function,
}

export default class NetWorkFail extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../img/other/networkFail.png')} style={{width:width*0.417,height:width*0.417,opacity: 0.7}} />
                <Text style={{fontSize:pxToDp(20), color:'#101010',marginTop: height * 0.048}}>数据加载失败</Text>
                <Text style={{fontSize:pxToDp(17), color:'#AAAAAA',marginTop: height * 0.016}}>请检查你的手机是否联网</Text>

                <TouchableOpacity style={styles.reButton} onPress={this.props.onPress}>
                    <Text style={{fontSize:pxToDp(15),color:'#101010',opacity: 0.71}}>重新加载</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    reButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.278,
        height: width * 0.083,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#101010',
        borderWidth: 2,
        marginTop: height * 0.048,
    }
 
});