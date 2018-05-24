import React, {PureComponent} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import screen from '../common/screen'

const { width, height } = screen

type Props = {
    container?: Object,
    text: string,
    onPress?: Function,
}

export default class LoginButton extends PureComponent<Props, State> {
    constructor(props) {
      super(props);

    }
    render() {
        let {text, container, onPress} = this.props
        return (
            <TouchableOpacity style={[styles.button, container]} onPress={onPress}>
                <Text style={{fontSize: width*0.061, color: 'white'}} >{text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: width * 0.56,
        height: width * 0.139,
        backgroundColor: 'rgba(255,255,255,.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: height * 0.032 * 2,
    },
})