/*
 * 分隔线
 */
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

export default class DivideLine extends Component {
    render() {
        return (
            <View style={this.props.style}></View>
        );
    }
}

const styles = StyleSheet.create({
    divide: {
        backgroundColor: '#EAEAEA',
    }
})