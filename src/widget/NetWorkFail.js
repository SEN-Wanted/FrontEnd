import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  NetInfo,
  StatusBar,
} from 'react-native';

const {width,height} = Dimensions.get('window')

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
                <StatusBar translucent={true} hidden={false}/>
                <Image source={require('../img/other/networkFail.png')} style={{width:width*0.417,height:width*0.417}} />
                <Text style={{fontSize:20, color:'#101010',marginTop: height * 0.048}}>数据加载失败</Text>
                <Text style={{fontSize:17, color:'#AAAAAA',marginTop: height * 0.016}}>请检查你的手机是否联网</Text>

                <TouchableOpacity style={styles.reButton} onPress={this.props.onPress}>
                    <Text style={{fontSize:15,color:'#101010'}}>重新加载</Text>
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