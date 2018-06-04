import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {

}

type State = {

};

export default class NoMessageScreen extends PureComponent<Props, State> {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor:'#140105'},
        headerTintColor: 'white',
        headerTitle: '客服消息',
        headerTitleStyle: {
            color: 'white',
            fontSize: 22,
            flex: 1,
            textAlign: 'center',
        },
        headerLeft: (
            <TouchableOpacity style={styles.backButton} onPress={() => {
                navigation.goBack()
            }}>
                <Image source={require('../../img/restaurant/ic_chevron_left_white_48dp.png')}
                    style={styles.backImage} />
            </TouchableOpacity>
        ),
        headerRight: <View />,
    })
    
    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../../img/message/noMessage.png')} style={styles.img} />
                <Text style={styles.text1}>暂无消息</Text>
                <Text style={styles.text2}>目前没有消息噢</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backImage: {
        width: 40,
        height: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 300,
        height: 120
    },
    text1: {
        fontFamily: 'Roboto',
        fontSize: 20,
        color: '#101010',
        marginTop: 10,
    },
    text2: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#AAA',
        marginTop: 18
    }
})