import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    DeviceEventEmitter
} from 'react-native'
import { observer, inject, Observer } from 'mobx-react/native'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating'
import Toast, {DURATION} from 'react-native-easy-toast'

import wantedFetch,{RequestState} from '../../common/WantedFetch'
import WaitProgress from '../../widget/WaitProgress'
import WaitModal from '../../widget/WaitModal'
import OrderNotLogin from './OrderNotLogin'
import NetWorkFail from '../../widget/NetWorkFail'
import pxToDp from '../../common/pxToDp';
import screen from '../../common/screen'

const { width, height } = screen   //界面的尺度获取
const host = "http://2v0683857e.iask.in:22871"  //服务器地址
@inject(['user'])
@observer
export default class OrderScene extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105'},
        headerTitleAllowFontScaling: false,
        headerTintColor:'white',
        headerTitle: '我的订单',
        headerTitleStyle:{
            color:'white',
            fontSize: pxToDp(20),
        },

        headerLeft: <View></View>,
  
        headerRight:<View />,
    });

    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            hasReqOver: RequestState.Wait,
            visible: false,
        }
    }

    componentDidMount(){
        if(this.props.user.isLogin) {
            this.requestData()
        }
        this.listener = DeviceEventEmitter.addListener('submitOrder',(e)=>{
            this.requestData()
        });
    }
    componentWillUnmount(){
        // 移除监听
        this.listener.remove();
    }

    requestData = async() => {
        let userID = this.props.user.userID
        let token = this.props.user.token
        try {
            this.setState({hasReqOver: RequestState.Wait})
            const response = await wantedFetch('user/'+userID+'/orders','GET',{},10000,'application/json',token)
            if(response.res.status_code === '200') {
                let orderList = response.res.orderList.map((info) => ({
                    orderID: info.orderID,
                    storeName: info.storeName,
                    icon: info.storeIcon,
                    rating: info.rating,
                    date: info.date,
                    cost: info.cost
                }))
                alert(orderList[0].icon)
                this.setState({ 
                    orderList: orderList,
                    hasReqOver: RequestState.Success
                })
            }else if(response.res.status_code === '401'){
                alert(response.res.status_code)
                this.setState({ 
                    hasReqOver: RequestState.Failue
                })
            }
        } catch (error) {
            alert('' + error)
            this.setState({ hasReqOver: RequestState.Failue })
        }
    }

    onStarRatingPress(rating, id) {
        this.props.user.evaluateOrder(id,rating)
    }

    postRatingStar = async(rating,id) => {
        let token = this.props.user.token
        let userID = this.props.user.userID
        let data = {
            rating: rating
        }
        this.refs.toast.show('test',DURATION.LENGTH_LONG)
        try {
            this.setState({visible: true})
            const response = await wantedFetch('user/'+userID+'/orders/'+id,'POST',data,10000,'application/json',token)
            if(response.res.status_code === '201') {
                this.setState({visible: false})
                this.requestData()
            }else {
                this.setState({visible: false})
                this.refs.toast.show('出了点小差错，请重试',DURATION.LENGTH_LONG)
            }
        } catch (error) {
            alert('' + error)
            this.setState({visible: false})
        }
    }


    renderItem = (rowData) => {
        return  (
            <View style={orderSceneStyle.scene}>
                <View style={orderSceneStyle.itemTitle}>
                    <Text style={{color:'#101010', fontSize: pxToDp(14)}}> 
                        {rowData.item.storeName} 
                    </Text>
                    <Text style={orderSceneStyle.isScored}>{rowData.item.rating? '已评价':'待评价'}</Text>
                </View>

                <View style={orderSceneStyle.devideLine} />
                 {/*require("../../img/payforbill/icon.png")*/}
                <View style={orderSceneStyle.mainView}>
                    <Image source={{uri: host+rowData.item.icon}} style={orderSceneStyle.iconImg}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#E51C23', marginTop: 5, fontSize: pxToDp(15)}}>￥{ rowData.item.cost }</Text>
                        <Text style={{color: '#050505',marginLeft: 10, marginTop: 5, fontSize: pxToDp(11)}}>{ rowData.item.date }</Text>
                        <StarRating
                            starStyle={orderSceneStyle.stars}
                            starSize={24}
                            emptyStarColor={"#AAAAAA"}
                            fullStarColor={"gold"}
                            disabled={rowData.item.rating? true:false}
                            maxStars={5}
                            rating={rowData.item.rating}
                            selectedStar={(rating) => this.postRatingStar(rating, rowData.item.orderID)}
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
        )
    }

    render() {
        if(this.props.user.isLogin){
            if(this.state.hasReqOver === RequestState.Wait) {
                return <WaitProgress />
            }else if (this.state.hasReqOver === RequestState.Failue) {
                return <NetWorkFail onPress = {this.requestData} />
            } else {
                return (
                    <View style={{backgroundColor: 'white', flex: 1}}>
                        <WaitModal visible={this.state.visible} />
                        <FlatList
                            data={this.state.orderList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index)=> index+""}   //如果列表顺序会调整，就换为item.title
                            ListEmptyComponent={()=>(
                                <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                                    <Text>暂无数据</Text>
                                </View>
                            )}
                        />
                        <Toast ref="toast" />
                    </View>
                ) 
            }
        } else {
            return (
                <OrderNotLogin onPress={() => {this.props.navigation.navigate('LoginScene')}} />
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
        fontSize: pxToDp(12),
        marginRight: 20,
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
