import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableOpacity, TextInput,Image} from 'react-native';
import screen from '../common/screen'

const { width, height } = screen


function getKeyboardType(label) {
    if (label.indexOf('手机') !== -1) {
        return 'phone-pad';
    } 
    if (label.indexOf('密码') !== -1) {
        return 'default';
    } 
    return 'default';
}

function getSecure(label) {
    if (label.indexOf('密码') !== -1) {
        return true;
    }
    return false;
}

type Props = {
    container?: Object,
    Icon: any,
    field: Object,
}

export default class LoginTextInput extends Component<Props, State> {
    constructor(props) {
      super(props);

    }
    render() {
        const { field,  placeholder = null, type = 'text', addTextInputRef, Icon, container } = this.props;
        return (
            <View>
            <View style={[styles.sectionStyle, container]} >
                <Image source={Icon}  style={styles.leftImage}/>
                <TextInput 
                    {...field.bind()}
                    style={styles.textInputStyle}
                    keyboardType={getKeyboardType(field.label)}
                    secureTextEntry={getSecure(field.label)}
                    //placeholder={placeholderText}
                    placeholderTextColor='white'
                    maxLength={20}
                    value={field.value}
                    clearButtonMode='while-editing' //android无效
                    selectionColor='white'          //android无法改变光标颜色，只能在android工程下改
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => field.set(text)}
                    
                >
                </TextInput>
                {this.props.children}
            </View>
            {field.error === null ? null : <Text style={{ backgroundColor: 'rgba(0,0,0,0)', marginTop: 8, color: 'red' }}>{field.error}</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(16,16,16,.6)',
        borderRadius: 20,
        height: height * 0.083,
        width: width * 0.833,
        marginTop: height * 0.032,
    },
    leftImage: {
        padding: 10,
        paddingRight: 0,
        margin: 5,
        width: width * 0.083,
        height: width * 0.083,
        resizeMode : 'stretch',
        alignItems: 'center'
    },
    textInputStyle: {
        flex: 1,
        alignItems: 'center',
        fontSize: width * 0.056,
        color: 'white',
    },
})