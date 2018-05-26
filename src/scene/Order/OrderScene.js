import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native'
import { observer, inject, Observer } from 'mobx-react/native'

import FontIcon from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating'
import pxToDp from '../../common/pxToDp';
import screen from '../../common/screen'

const { width, height } = screen

@inject(['user'])
@observer
export default class OrderScene extends Component {
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
    });

    constructor(props) {
        super(props);
    }

    onStarRatingPress(rating, index) {
        this.props.user.evaluateOrder(index,rating)
    }


    renderItem = (rowData) => {
        return <Observer>{ () => (
            <View style={orderSceneStyle.scene}>
                <View style={orderSceneStyle.itemTitle}>
                    <Text style={{color:'#101010', fontSize: pxToDp(17)}}> 
                        {rowData.item.name} 
                    </Text>
                    <Text style={orderSceneStyle.isScored}>{rowData.item.status? '已评价':'未评价'}</Text>
                </View>

                <View style={orderSceneStyle.devideLine} />

                <View style={orderSceneStyle.mainView}>
                    <Image source={require("../../img/payforbill/icon.png")} style={orderSceneStyle.iconImg}/>
                    <View style={{marginLeft: pxToDp(10)}}>
                        <Text style={{color: '#E51C23', marginTop: pxToDp(5), fontSize: pxToDp(20)}}>￥{ rowData.item.cost }</Text>
                        <Text style={{color: '#050505',marginLeft: 10, marginTop: pxToDp(5)}}>{ rowData.item.time }</Text>
                        <StarRating
                            starStyle={orderSceneStyle.stars}
                            starSize={24}
                            emptyStarColor={"#AAAAAA"}
                            fullStarColor={"gold"}
                            disabled={rowData.item.status? true:false}
                            maxStars={5}
                            rating={rowData.item.rating}
                            selectedStar={(rating) => this.onStarRatingPress(rating, rowData.index)}
                        />
                    </View> 
                    <TouchableOpacity 
                        style={orderSceneStyle.arrow} 
                        onPress={() => {this.props.navigation.navigate('OrderItemScene',{info: rowData.item})}}
                    >
                        <FontIcon name="angle-right" size={pxToDp(30)} color='#878787' />
                    </TouchableOpacity>
                </View>
            </View>
        )}</Observer>
    }

    render() {
        if(this.props.user.isLogin){
            return (
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <FlatList
                        data={this.props.user.orderList.slice()}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index)=> index+""}   //如果列表顺序会调整，就换为item.title
                    />
                </View>
            ) 
        } else {
            return (
                <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'black', fontSize: 30}}>
                        您还未登陆，请登陆后查看
                    </Text>
                </View>
            )
        }
    }

}

const orderSceneStyle = StyleSheet.create({

    scene: {
        margin: 10,
        marginTop: 0,
        padding:5,
        backgroundColor: 'white',
    },
    isScored: {
        color: '#FC4C5B',
        fontSize: pxToDp(14),
        marginRight: pxToDp(15),
    },
    devideLine: {
        borderWidth:1,
        height: 1,
        borderColor: "#cccccc",
        marginVertical: 2
    },
    itemTitle: {
        height: width * 0.07,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    iconImg: {
        width: width * 0.203,
        height: width * 0.153,
    },
    mainView: {
        marginTop: pxToDp(10),
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    stars:{
        justifyContent: "flex-start",
        marginTop: pxToDp(5),
    },
    arrow: {
        marginLeft: width * 0.21,
        width: width * 0.125,
        height: width * 0.125,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    }
})
