/*
 * 修改个人详细信息
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Image} from "react-native";

type Props = {
    field: Object,
}

type State = {

}

export default class ModifyInfoItem extends Component<Props, State> {
    render() {
        let {field} = this.props;

        return(
            <View style={styles.container}>
                <TextInput {...field.bind()} underlineColorAndroid="transparent" editable={false} style={styles.title}>{field.name}</TextInput>
                <View style={styles.content}>
                    <TextInput
                        {...field.bind()}
                        underlineColorAndroid="transparent"
                        maxLength={16}
                        keyboardType={'default'}
                        secureTextEntry={field.label.indexOf('密码')>-1?true:false}
                        style={styles.inputText}
                        value={field.value}
                        onChangeText={(text) => field.set(text)}>
                    </TextInput>
                    <Image source={require('../../img/mine/cancel.png')} style={styles.cancelIcon}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',
        width: 320,
        height: 35,
        marginHorizontal: 20,
        marginVertical: 12,
    },
    title: {
        alignItems: 'center',
        paddingVertical: 0,
        height: 35,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#bbb',
        height: 35,
    },
    inputText: {
        paddingVertical: 0,
    },
    cancelIcon: {
        opacity: 0.4,
        width: 15,
        height: 15,
        color: '#fff',
        marginRight: 10,
    }
})