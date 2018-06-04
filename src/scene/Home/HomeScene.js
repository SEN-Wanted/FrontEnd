import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, FlatList, NetInfo, StatusBar} from 'react-native'
import {observer, inject} from 'mobx-react'

import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome'
import FeaIcon from 'react-native-vector-icons/Feather'

import pxToDp from '../../common/pxToDp'
import color from '../../widget/color'
import HomeFloatTopbar from './HomeFloatTopbar'
import * as api from '../../api'
import screen from '../../common/screen'
import HomeMenuView from './HomeMenuView'
import RestaurantListItem from '../Restaurant/RestaurantListItem'
import RestaurantScene from '../Restaurant/RestaurantScene'

import NetWorkFail from '../../widget/NetWorkFail'
import wantedFetch from '../../common/WantedFetch'

const { width, height } = screen

@inject(['user'])
@observer
export default class HomeScene extends Component {
    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
          
        }
    }

    constructor(props:Object) {
        super(props)
        this.state={
            storeListdata:[],
            refreshing: false,
        }
    }

    componentWillMount() {
        NetInfo.addEventListener('connectionChange',
            (networkType) => {
                this.props.user.setNetworkType(networkType.type);
            }
        )
        /*NetInfo.getConnectionInfo().done((status) => {
            this.props.user.setNetworkType(status)
        })*/
    }

    componentDidMount() {
        //let data = await wantedFetch('/stores','GET')
        this.requestData()
        /*this.setState({
            storeListdata: data
        })*/
    }

    requestData = async() => {
        try{
            this.setState({refreshing: true})
            const json = await wantedFetch('/stores','GET')
            let dataList = json.res.listStoreData.map((info) => ({
                icon: info.icon,
                storeName: info.storeName,
                storeID: info.storeID,
                starRating: info.starRating,
                price: info.price,
                monthlySell: info.monthlySell,
                distance: info.distance,
                isDiscount: info.isDiscount,
                discountNumber: info.discountNumber,
                isAppOffer: info.isAppOffer,
            }))
            this.setState({
                storeListdata: dataList,
                refreshing: false,
            })
        } catch (error) {
            alert('error' + error)
            this.setState({refreshing:false})
        }

    }

    getCurrentNetConnection = () => {
        NetInfo.addEventListener('connectionChange',
            (networkType) => {
                this.props.user.setNetworkType(networkType.type);
            }
        )
    }


    onListItemSelected = (info) => {
        this.props.navigation.navigate('RestaurantScene',{info:info})
    }

    renderHeader=()=> {
        return (
            //flastList头部的容器
            <View style={styles.container}>           
                <HomeFloatTopbar onPress1={()=>{this.props.navigation.navigate('CodeScreen')}}
                    onPress2={()=>{this.props.navigation.navigate('SearchScene')}}
                    onPress3={()=>{this.props.navigation.navigate('MessageScreen')}} />

                <View style={styles.headerSwiper}>  
                    <Swiper style = {styles.wrapper} height={200} horizontal={true} 
                    autoplay={true} activeDotColor={color.gray}>
                        <View style={styles.slide3} onPress={() => {
                        alert('test')}}>
                            <Image resizeMode='stretch' style={styles.image} source={require('../../img/home/advertising_1.png')} />
                        </View>
                        <View style={styles.slide3} onPress={() => {
                        alert('test')}}>
                            <Image resizeMode='stretch' style={styles.image} source={require('../../img/home/advertising_2.png')} />
                        </View>
                        <View style={styles.slide3} onPress={() => {
                        alert('test')}}>
                            <Image resizeMode='stretch' style={styles.image} source={require('../../img/home/advertising_3.png')} />
                        </View>
                        <View style={styles.slide3} onPress={() => {
                        alert('test')}}>
                            <Image resizeMode='stretch' style={styles.image} source={require('../../img/home/advertising_4.png')} />
                        </View>
                    </Swiper>
                </View>
                <HomeMenuView                   
                    menuInfos={api.menuInfos}
                    onMenuSelected={(index)=>{
                        alert('test' + index)
                    }}
                />

                <View style={styles.spacing}/>
                
                <View style={styles.recommendContainer} >
                    <Text style={{color:'#E51C23',fontSize: pxToDp(17),
                    fontFamily: 'Roboto', fontWeight: 'bold', marginLeft:14}}>为你推荐</Text>
                    
                    <Swiper style = {styles.wrapper}  height={50} horizontal={false} 
                    autoplay={true} showsPagination={false}>
                        <View style={styles.slide3} >
                            <Text style={styles.recomText}>必胜客新品!四拼披萨，不一样的味道~</Text>
                        </View>
                        <View style={styles.slide3} >
                            <Text style={styles.recomText}>海底捞火锅APP专享优惠 餐饮新形势</Text>
                        </View>
                        <View style={styles.slide3} >
                            <Text style={styles.recomText}>碳纪烤肉：狂野的呼吸，就是这个味</Text>
                        </View>
                    </Swiper>
                   
                </View>
                
                <View style={styles.spacing2}/>
                <View style={styles.NearbyBusiness}>
                    <Text style={{color:'#101010',fontSize:pxToDp(15),fontFamily:'Roboto' }}>附近商家</Text>
                </View>
                <View style={styles.spacing2}/>
            </View>
        )
    } 

    renderItem = (rowData) => {
        return (
            <RestaurantListItem
                onPress={this.onListItemSelected}
                info={rowData.item}
            />
            
        )
    }

    render() {
        if(this.props.user.networkType === 'NONE' || this.props.user.networkType === 'none'){
            return (
                <View>
                    <StatusBar  hidden={this.props.user.isStatusbarHidden}/>
                    <NetWorkFail onPress={ this.getCurrentNetConnection }/>
                </View>
            )
        } else {
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <StatusBar  hidden={this.props.user.isStatusbarHidden}/>
                <FlatList
                    ListHeaderComponent={ () => this.renderHeader() }
                    /*data={[
                            {title: '海底捞(珠影星光店)'},
                            {title: '海底捞(珠影星光店)'},
                            {title: '海底捞(珠影星光店)'},
                            {title: '海底捞(珠影星光店)'},
                     ]}*/
                    data={this.state.storeListdata}
                    renderItem={this.renderItem}
                
                    keyExtractor={(item, index)=> index+""}   //如果列表顺序会调整，就换为item.title
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                />
            </View>
            
        )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },


    headerSwiper: {
        //position: 'absolute',
        width: width,
        height: pxToDp(200),
        //zIndex: 0,
    },
    
    wrapper: {

    },
    image: {
        width: width,
        height: pxToDp(200),
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    spacing: {
        marginHorizontal: 10,
        height: StyleSheet.hairlineWidth,
        backgroundColor:'#f3f3f3',
    },
    spacing2: {
        marginHorizontal: 10,
        height: 2,
        backgroundColor:'#f3f3f3',
    },
    recommendContainer: {
        width: width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    recomText: {
        color: '#5A5A5A',
        fontSize: pxToDp(17),
        fontFamily: 'Roboto',
    },

    NearbyBusiness: {
        height: 40,
        paddingVertical: 8,
        paddingLeft: 10,
        backgroundColor: 'white',
    },

})
