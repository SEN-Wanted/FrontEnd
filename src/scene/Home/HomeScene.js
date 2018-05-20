import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import {TabNavigator, TabBarBottom} from 'react-navigation'
import color from '../../widget/color'
import HomeFloatTopbar from './HomeFloatTopbar'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome'
import FeaIcon from 'react-native-vector-icons/Feather'

import * as api from '../../api'
import screen from '../../common/screen'
import HomeMenuView from './HomeMenuView'
import RestaurantListItem from '../Restaurant/RestaurantListItem'
import RestaurantScene from '../Restaurant/RestaurantScene'



type Props = {

}

type State = {

}


class HomeScene extends PureComponent<Props, State> {
    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
          
        }
    }


    renderHeader=()=> {
        return (
            //flastList头部的容器
            <View style={styles.container}>   
                        
                <HomeFloatTopbar onPress1={()=>{this.props.navigation.navigate('QRScanner')}}
                    onPress2={()=>{this.props.navigation.navigate('SearchScene')}}
                    onPress3={()=>{alert('test')}} />
                
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
                    <Text style={{color:'#E51C23',fontSize: 17,
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
                    <Text style={{color:'#101010',fontSize:15,fontFamily:'Roboto' }}>附近商家</Text>
                </View>
                <View style={styles.spacing2}/>
            </View>
        )
    } 
    onListItemSelected = (info) => {
        this.props.navigation.navigate('RestaurantScene',{info:info})
    }

    renderItem = (rowData)=> {
        return (
            <RestaurantListItem
                onPress={this.onListItemSelected}
                info={rowData.item}
            />
            
        )
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <FlatList
                    ListHeaderComponent={() => this.renderHeader()}
                    
                   // data={this.state.dataList}
                    data={[
                            {title: '海底捞(珠影星光店)'},
                            {title: '海底捞(珠影星光店)'},
                            {title: '海底捞(珠影星光店)'},
                            {title: '海底捞(珠影星光店)'},
                     ]}
                    renderItem={this.renderItem}
                
                    keyExtractor={(item, index)=> index+""}   //如果列表顺序会调整，就换为item.title
                   // onRefresh={this.requestData}
                   // refreshing={this.state.refreshing}
                />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },


    headerSwiper: {
        //position: 'absolute',
        width: Dimensions.get('window').width,
        height: 200,
        //zIndex: 0,
    },
    
    wrapper: {

    },
    image: {
        width: Dimensions.get('window').width,
        height: 200,
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
        width: screen.width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    recomText: {
        color: '#5A5A5A',
        fontSize: 17,
        fontFamily: 'Roboto',
    },

    NearbyBusiness: {
        height: 40,
        paddingVertical: 8,
        paddingLeft: 10,
        backgroundColor: 'white',
    },

})

export default HomeScene