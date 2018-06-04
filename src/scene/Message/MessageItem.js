import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import BadgeView from "react-native-badge-view";

import DivideLine from '../../widget/DivideLine';

type Props = {
    info: Object,
    onPress: Function
}

type State = {

}

export default class MessageItem extends PureComponent<Props, State> {
    render() {
        let {info, onPress} = this.props;

        return(
            <View>
                <TouchableOpacity style={styles.container} onPress={()=> {onPress(info)}}>
                    <BadgeView parentView={<Image source={info.icon} style={[styles.icon, info.count == 0 ? styles.icon_only : {}]} />}
                        badgeText={info.count} badgeTextColor={"white"} badgeBackgroundColor={"#E51C23"} />
                    <View style={styles.main}>
                        <View style={[info.count == 0 ? styles.primary_only : styles.primary]}>
                            <Text style={[styles.shop, info.count == 0 ? styles.shop_only : {}]}>{info.shop}</Text>
                            <Text style={styles.time}>{info.time}</Text>
                        </View>
                        <Text style={styles.detail} numberOfLines={1}>{info.detail}</Text>
                    </View>
                </TouchableOpacity>
                <DivideLine style={styles.divide} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    icon: {
        width: 50,
        height: 50
    },
    icon_only: {
        marginVertical: 10
    },
    main: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    primary: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    primary_only: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    shop: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#101010'
    },
    shop_only: {
        marginTop: 15,
        marginBottom: -5
    },
    time: {
        fontFamily: 'Roboto',
        color: '#101010',
        opacity: 0.5
    },
    detail: {
        fontFamily: 'Roboto',
        color: '#101010',
        opacity: 0.5,
        marginTop: 7,
        marginBottom: 10
    },
    divide: {
        backgroundColor: '#EAEAEA',
        height: 2
    }
})