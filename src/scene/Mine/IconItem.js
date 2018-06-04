/*
* 个人信息界面图标
*/
import React, {Component} from "react";
import {StyleSheet, Text, Image, TouchableOpacity} from "react-native";

export default class IconItem extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.item}>
                <Image
                    source={this.props.source}
                    style={styles.image}>
                </Image>
                <Text
                    style={styles.text}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 76,
        width: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 17,
    },
    image: {
        height: 25,
        width: 25,
        marginBottom: 7,
        opacity: 0.75,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 12,
    }
})