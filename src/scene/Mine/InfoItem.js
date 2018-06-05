/*
 * 个人详细信息
 */
import React, {PureComponent} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
    info: Object,
    onPress: Function,
}

type State = {

}

export default class RecommendItem extends PureComponent<Props, State> {
    render() {
        let {info, onPress} = this.props;

        return(
            <TouchableOpacity style={styles.item} onPress={()=>{onPress(info)}}>
                <Text style={styles.text}>{info.title}</Text>
                <View style={styles.forward}>
                    <Text style={styles.detail}>{info.detail}</Text>
                    <Icon name="angle-right" size={18} color="#B4AAAA" />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 2,
    },
    text: {
        color: '#101010',
        fontFamily: 'Roboto',
        marginLeft: 5,
    },
    forward: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5,
    },
    detail: {
        marginRight: 5,
    },
})