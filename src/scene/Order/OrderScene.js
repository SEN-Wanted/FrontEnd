import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ScrollView
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
        let orderList = [];
        for (i = 0; i < 4; i++) {
            (this.orderinfo.status == 0) ? 
                tobeScored = (<Text style={orderSceneStyle.isScored}>待评价</Text>) :
                tobeScored = (<Text style={orderSceneStyle.isScored}>已评价</Text>);
            orderList.push(
                <View key={i} style={orderSceneStyle.scene}>
                    <TouchableOpacity onPress={(info)=>{
                        this.props.navigation.navigate('ItemOfOrder',{info:info});
                    }}>
                        <View style={orderSceneStyle.itemTitle}>
                            <Text> {this.orderinfo.name} </Text>
                            {tobeScored}
                        </View>
                        {this.lines}
                        <View style={orderSceneStyle.mainView}>
                            <Image source={require("../../img/payforbill/icon.png")} style={orderSceneStyle.iconImg}/>
                            <View>
                                <Text>{ this.orderinfo.cost }</Text>
                                <Text>{ this.orderinfo.time }</Text>
                                <Text>stars</Text>
                            </View>
                            <View style={orderSceneStyle.arrow}>
                                <Text> > </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View>
            <ScrollView>
                { orderList }
            </ScrollView>
            </View>
        ) // return
    }
    orderinfo = {
        name: "海底捞火锅(珠影广场)",
        cost: "￥331.0",
        time: "2017-01-08 17:05:24",
        status: 0
    }

    lines = 
        <Text style={orderSceneStyle.devideLine}></Text>;
}

var orderSceneStyle = StyleSheet.create({

    scene: {
        margin: 10,
        padding:5
    },
    isScored: {
        color: "red",
        fontSize: 12
    },
    devideLine: {
        borderWidth:1,
        height: 1,
        borderColor: "#cccccc",
        marginVertical: 5
    },
    itemTitle: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    iconImg: {
        width: 60,
        height: 60
    },
    mainView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    arrow: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default OrderScene