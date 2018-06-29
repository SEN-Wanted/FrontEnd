/*
 * 修改个人详细信息
 */
import React, {PureComponent} from "react";
import {StyleSheet, View, TextInput, Image, TouchableOpacity} from "react-native";
import screen from '../../common/screen'

const {width,height} = screen
type Props = {
    title: string,
    value: string,
    onChangeText: Function,
}

type State = {

}

export default class ModifyInfoItem extends PureComponent<Props, State> {
    render() {
        let {title,value,onChangeText} = this.props;

        return(
            <View style={styles.container}>
                <TextInput underlineColorAndroid="transparent" editable={false} style={styles.title}>{title}</TextInput>
                <View style={styles.content}>
                    <TextInput 
                        underlineColorAndroid="transparent" 
                        maxLength={16} 
                        editable={true}
                        //keyboardType={'default'} 
                        secureTextEntry={title.indexOf('密码')>-1?true:false} 
                        style={styles.inputText}
                        onChangeText={(text)=>onChangeText(text,title)}
                        value={value}
                    />
                    <TouchableOpacity style={{width: 15,height: 15,marginRight: 10}} onPress={()=>onChangeText("",title)}>
                        <Image source={require('../../img/mine/cancel.png')} style={styles.cancelIcon}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: width * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',
        width: width * 0.89,
        marginHorizontal: 20,
        marginVertical: 12,
    },
    title: {
        alignItems: 'center',
        paddingVertical: 0,
        height: width * 0.1,
        color:"black",
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#bbb',
        height: width * 0.1,
    },
    inputText: {
        height: width * 0.1,
        width: width * 0.5,
        paddingVertical: 0,
    },
    cancelIcon: {
        opacity: 0.4,
        width: 15,
        height: 15,
    }
})