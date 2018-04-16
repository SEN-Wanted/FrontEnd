import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {TabNavigator, TabBarBottom} from 'react-navigation'

type Props = {

}

type State = {

}


class OrderScene extends PureComponent<Props, State> {
    render() {
        return (
            <View style={styles.container}>
                <Text>OrderScene</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
})

export default OrderScene