import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import ItemOfOrder from './ItemOfOrder'

type Props = {

};

type State = {

};

class OrderScene extends PureComponent<Props, State> {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105'},
        headerTintColor:'white',
        headerTitle: '我的订单',
        headerTitleStyle:{
            color:'white',
            fontSize:22,
        },

        headerLeft: <View></View>,
  
        headerRight:<View />,
    })

    render() {
        return (
            <View>
                <TouchableOpacity onPress={(info)=>{
                    this.props.navigation.navigate('ItemOfOrder',{info:info});
                }}>
                    <Text>pay for bill</Text>
                </TouchableOpacity>
            </View>
        ) // return

    }
}

export default OrderScene