/*
 * 推荐店铺
 */
import React, {PureComponent} from "react";
import {StyleSheet, Text, Image, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import DivideLine from './DivideLine';

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
            <View>
                <TouchableOpacity style={styles.item} onPress={()=>{onPress(info)}}>
                    <Image source={require('../img/payforbill/icon.png')} style={styles.image_icon} />
                    <Text style={styles.text}>{info.title}</Text>
                    <View style={styles.forward}>
                        <Icon name="angle-right" size={18} color="#B4AAAA" />
                    </View>
                </TouchableOpacity>
                <DivideLine style={styles.divideMinor} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        paddingVertical: 10,
    },
    image_icon: {
        borderWidth: 1,
        borderColor: '#CDD3DB',
        borderRadius: 20,
        width: 20,
        height: 20,
        marginRight: 10,
    },
    text: {
        color: '#222222',
        fontFamily: 'Roboto',
    },
    forward: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5,
    },
    divideMinor: {
        height: 2,
        marginHorizontal: 10,
    },
})