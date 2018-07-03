import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import screen from '../common/screen'
import pxToDp from '../common/pxToDp'
const {width,height} = screen

type Props = {
    text: number,
    bgColor?: Function,
}

export default class SingleWord extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { text, bgColor } = this.props
        return (
            <View style={
                {backgroundColor: bgColor ? bgColor:'#E51C23',width:22,height:16,
                justifyContent:'center',alignItems:'center'}}
            >
                <Text style={{color:'white',fontSize: pxToDp(9)}}>{text}</Text>
            </View>
        )
    }
}

