import React, {Component} from 'react'
import {
    StyleSheet, 
    View, 
    Image, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    Modal, 
    DeviceEventEmitter,
} from 'react-native'
import { observer, inject, Observer } from 'mobx-react/native'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import FeatIcon from 'react-native-vector-icons/Feather'
import Parabola from 'react-native-smart-parabola'
import * as Animatable from 'react-native-animatable'

import screen from '../../common/screen'
import colors from '../../common/Colors'
import * as api from '../../api'
import LeftFlatList from './LeftFlatList'
import RightSectionList from './RightSectionList'
import AnimateIcon from './AnimateIcon'

import ListcarPopover from './Listcar/ListcarPopover'
import ListcarIcon from './Listcar/ListcarIcon'
import ListcarIconBadge from './Listcar/ListcarIconBadge'
import MaskLayer from './Listcar/MaskLayer'
import ListcarBottom from './Listcar/ListcarBottom'


const { width, height, screenHeight, botBarHeight, listItemHeight } = screen


@inject(['listcar'])
@observer
export default class RestaurantScene extends Component{
    static navigationOptions = ({navigation}) => ({
        headerStyle: { backgroundColor: '#140105', height: width * 0.15},
        headerTintColor: 'white',
        headerTitle: navigation.state.params ? navigation.state.params.info.title : '没有数据',
        headerTitleStyle:{ color:'white', fontSize:22, },
        headerLeft: (
            <TouchableOpacity style={styles.backButton} onPress={()=>{
                navigation.goBack(null)
            }}>
                <Image source={require('../../img/restaurant/ic_chevron_left_white_48dp.png')}
                    style={styles.backImage} />
            </TouchableOpacity>
        ),
        headerRight:<View />,
    })

    constructor(props:Object) {
        super(props)
    }

    /*componentWillMount() {
        this.props.foodData.setData(api.haidilaoInfos)
    }*/

    componentDidMount() {
        this.props.listcar.setTriggerDown()
        let thisEnd =  {
            x: width * 0.06,
            y: screenHeight * 0.90 - width * 0.065 - width * 0.15,
        }
        this.props.listcar.setEndPosition(thisEnd)
       // this.requestData()
       // this.listener = DeviceEventEmitter.addListener('add', (e, info)=>this._onPressHandler(e, info));
    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
        this.listener && this.listener.remove()     
    }

    requestData = async() => {
        try {
            let response = await fetch('http://2v0683857e.iask.in:22871/foodData')
            let json = await response.json()
            alert('resonseData=' + JSON.stringify(json))
        } catch (error) {
            alert('error' + error)
        }
    }

    //添加按钮进行动画函数
    _onPressHandler=(e, info)=>{
        let { pageX, pageY } = e.nativeEvent
        let start =  {
            x: pageX - 5,
            y: pageY - width * 0.15 - 5, 
        }
        this.props.listcar.setStartPosition(start)
        this.listCarAddItem(info)
        //this.refs.listcarIcon.pulse(200)
        //this.listcarIcon.pulse(200)
        DeviceEventEmitter.emit('pulse')
    }

    //抛物线动画函数
    _renderParabola = ({index, translateX, translateY}) => {
        return (
            <View
                key={`'parabola-ball-'${index}`}
                style={[
                    {position: 'absolute',},    //Don't forget to set this
                    {width: 15, height: 15, borderRadius: 10, backgroundColor: 'red',},
                    {transform: [{translateX}, {translateY}]},
                ]}
            />
        )
    }

    //展示购物车
    showPopover = () => {
        this.props.listcar.setPopoverShow()
    }

    //隐藏购物车
    hidePopover = () => {
        this.props.listcar.setPopoverHide()
    }

    onRequestClose = () => {
        this.props.listcar.setPopoverHide()
    }

    //listcar列表生成函数
    renderRow = (item) => {     
        return <Observer>{ () => (
            <View style={styles.itemView}>
                <View style={{ width: width*0.33, alignItems: 'center' }}>
                    <Text style={{ color: colors.gray_524D52, fontSize: width*0.045 }}>{ item.item.name }</Text>
                    <Text style={{ color: colors.gray_969696, fontSize: width*0.035 }}>原价商品</Text>
                </View>
                <View style={{ width: width*0.1 }}/>
                <Text style={{ color: colors.gray_524D52, fontSize: width*0.045 }}>￥{ item.item.price }</Text>
                <View style={{ 
                    width: width*0.25, 
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    alignItems: 'center' }}
                >
                    <TouchableOpacity onPress={ () => this.listCarSubItem(item.item) }>
                        <FeatIcon name='minus-circle' size={ width*0.067 } color={ colors.black_101010 }/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: width*0.045, color: colors.gray_524D52}}>{ item.item.number }</Text>
                    <TouchableOpacity onPress={ () => this.listCarAddItem(item.item) }>
                        <FontIcon name="plus-circle" size={ width*0.067 } color={ colors.red_E51C23 }/>
                    </TouchableOpacity>
                </View>
            </View>
        )}</Observer>
    }

    //判断购物车是否已有该项
    findElem = (array, attr, val) => {
        for(let i = 0; i < array.length; i++) {
            if(array[i][attr] == val){
                return i
            }
        }
        return -1
    }


    //添加购物车数据
    listCarAddItem = (info) => {
        let {name,price} = info
        let indexOfInfo = this.findElem(this.props.listcar.states.listCar, 'name', name)
        let addItem = {key: name+"", name: name, price: price, number: 1}
        this.props.listcar.addListCar(addItem,indexOfInfo)
    }

    //减少购物车数据
    listCarSubItem = (info) => {
        let {name,price,number} = info   
        let indexOfInfo = this.findElem(this.props.listcar.states.listCar, 'name', name)
        this.props.listcar.subListCar(indexOfInfo)
    }

    //清空购物车
    clearListCarItems = () => {
        this.props.listcar.clearListCar()
    }


    render() {
        let lightColor =  this.props.listcar.states.listCount == 0 ? colors.gray_AAAAAA : colors.red_E51C23
        let listIconSize = this.props.listcar.states.modalVisible ? 0 : width * 0.16
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={ styles.listContainer }>
                    <LeftFlatList data={ api.haidilaoInfos } />
                    <RightSectionList data={ api.haidilaoInfos } itemAddPress={ this._onPressHandler }/>
                </View>    

                <Modal
                  animationType={ "slide" }
                  transparent={ true }
                  visible={ this.props.listcar.states.modalVisible }
                  onRequestClose={ this.onRequestClose }
                >                 
                    <MaskLayer 
                        visible={ this.props.listcar.states.isVisible }
                        onPress={ this.hidePopover }
                        maskStyle={ styles.MaskLayerStyle }
                    />                                                    
                    <ListcarIcon 
                        isVisible={ this.props.listcar.states.isVisible }
                        containerStyle={ styles.listCarView }
                        currentListCount={ this.props.listcar.states.listCount }
                        currentTotalCount={ this.props.listcar.states.totalCount }
                        onPress={ this.hidePopover }
                    />
                    <ListcarPopover 
                        isVisible={ this.props.listcar.states.isVisible }
                        currentListCount={ this.props.listcar.states.listCount }
                        clearListCar={ this.clearListCarItems }
                    >
                        <FlatList
                            data={ this.props.listcar.states.listCar.slice()}
                            //data={ this.listcarData }
                            renderItem={ (item) => this.renderRow(item) }
                        />
                    </ListcarPopover>
                    <ListcarBottom 
                        containerStyle={ styles.bottomContainer }
                        lightColor={ lightColor }
                        totalPrice={ this.props.listcar.states.totalPrice }
                    />
                </Modal>

                <AnimateIcon 
                    viewSize={ listIconSize }
                    viewColor= { lightColor }
                    onPress= { this.showPopover }
                    containerStyle = { styles.listCarView }
                    badgeText = { this.props.listcar.states.totalCount } 
                />

                <ListcarBottom 
                    containerStyle={ styles.bottomContainer }
                    lightColor={ lightColor }
                    totalPrice={ this.props.listcar.states.totalPrice }
                />
        
                <Parabola
                    isTrigger={ this.props.listcar.states.isTrigger }
                    rate={ 0.9 }
                    duration={ 300 }
                    start={ this.props.listcar.states.start }
                    end={ this.props.listcar.states.end }
                    renderParabola={ this._renderParabola }
                />
            </View>   
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    backButton: {
        flex: 1,
        marginLeft: 10,
    },
    backImage: {
        width: 40,
        height: 40,
    },
    listCarView: {
        width: width * 0.13,
        height: width * 0.13,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.065,
        position: 'absolute',
        zIndex: 10,
        marginTop: screenHeight * 0.90 - width * 0.065 - width * 0.15,
    },
    itemView: {
        width: width,
        height: listItemHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    MaskLayerStyle: {
        position: 'absolute',
        width: width,
        height: screenHeight-botBarHeight,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.5)',  
    },
    bottomContainer: {
        width: width,
        height: botBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    settleButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        width: width * 0.283,
        height: botBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

