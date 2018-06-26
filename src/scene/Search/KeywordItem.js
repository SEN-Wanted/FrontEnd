/*
 * 搜索关键词
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default class KeywordItem extends Component {
    render() {
        return(
            <TouchableOpacity style={styles.item}>
                <Text
                    style={styles.text}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        borderWidth: 1,
        borderColor: '#BBB',
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingHorizontal: 3,
    },
    text: {
        color: '#BBB',
        fontFamily: 'Roboto',
        opacity: 0.7,
    }
})