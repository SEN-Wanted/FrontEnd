import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import DivideLine from '../../widget/DivideLine';

type Props = {
    info: Object
}

type State = {

}

export default class MessageDetailItem extends PureComponent<Props, State> {
    render() {
        let {info} = this.props;

        return(
            <View style={styles.container}>
                <View style={styles.primary}>
                    <Text style={styles.shop}>{info.shop}</Text>
                    <Text style={styles.time}>{info.time}</Text>
                </View>
                <Text style={styles.detail}>{info.detail}</Text>
                <DivideLine style={styles.divide} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    primary: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    shop: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#101010'
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