/*
 * 扫码页标题栏
 */
import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Header, Left, Right, Title} from "native-base";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Images from '../../common/Images';

export default class TitleBar extends Component {
    static propTypes = {
        backIconPress: PropTypes.func,
        imageIconPress: PropTypes.func,
        bulbIconPress: PropTypes.func,
        infoIconPress: PropTypes.func,
    };

    render() {
        return (
            <Header style={styles.header}>
                <Left>
                    <TouchableOpacity onPress={this.props.backIconPress} style={styles.image_header}>
                        <Icon name="chevron-circle-left" size={25} color="#FFF" />
                    </TouchableOpacity>
                </Left>
                <Right>
                    <TouchableOpacity onPress={this.props.imageIconPress} style={styles.image_header}>
                        <Icon name="image" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.bulbIconPress} style={styles.image_header}>
                        <MaterialIcon name="lightbulb-outline" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.infoIconPress} style={styles.image_header}>
                        <Icon name="info-circle" size={25} color="#FFF" />
                    </TouchableOpacity>
                </Right>
            </Header>
        )
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0D0A12',
        height: 45,
    },
    image_header: {
        height: 45,
        width: 45,
        marginLeft: 10,
        marginTop: 20,
    },
})