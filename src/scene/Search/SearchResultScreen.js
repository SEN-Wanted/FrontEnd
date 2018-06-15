/*
 * 搜索结果界面
 */
import React, {Component} from "react";
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from "react-native";
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import Icon from "react-native-vector-icons/FontAwesome";
import wantedFetch from '../../common/WantedFetch'
import pxToDp from '../../common/pxToDp'
import DivideLine from '../../widget/DivideLine';
import RestaurantListItem from '../Restaurant/RestaurantListItem';


export default class SearchResultScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor:'#140105'},
        headerTintColor: 'white',
        headerTitle: '搜索结果',
        headerTitleStyle: {
            color: 'white',
            fontSize: pxToDp(20),
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

    constructor(props:Object) {
        super(props)
        this.state={
            storeListdata:[],
            refreshing: RefreshState.HeaderRefreshing,
        }
    }

    componentDidMount() {
        let type = ''
        if(this.props.navigation.state.params) {
            let index = this.props.navigation.state.params.index
            switch(index){
                case 0:
                    type = 'dessert'; break;
                case 1:
                    type = 'okokokok'; break;
            }
        }
        this.requestData(type)
    }

    requestData = async(type) => {
        try{
            this.setState({refreshing: RefreshState.HeaderRefreshing})
            const json = await wantedFetch('http://2v0683857e.iask.in:22871/search?type='+type,'GET')
            let dataList = json.res.ListStoreData.map((info) => ({
                icon: info.icon,
                storeName: info.storeName,
                storeID: info.storeid,
                starRating: info.starRating,
                price: info.price,
                monthlySell: info.monthlySell,
                distance: info.distance,
                isDiscount: info.isDiscount,
                discountNumber: info.DiscountNumber,
                isAppOffer: info.isAppOffer,
            }))
            this.setState({
                storeListdata: dataList,
                refreshing: dataList.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
            })
        } catch (error) {
            alert('error' + error)
            this.setState({refreshing: RefreshState.Idle})
        }

    }
    
    onListItemSelected = (info) => {
        //this.props.navigation.navigate('RestaurantScene', {info: info})
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
            <View style={styles.container}>
                <View style={styles.rank}>
                    <TouchableOpacity style={styles.rankType}>
                        <Text style={styles.rankText}>按距离排序</Text>
                        <Icon name="angle-down" size={20} color="#878787" />
                    </TouchableOpacity>
                    <DivideLine style={styles.divideVertical} />
                    <TouchableOpacity style={styles.rankType}>
                        <Text style={styles.rankText}>按销量排序</Text>
                        <Icon name="angle-down" size={20} color="#878787" />
                    </TouchableOpacity>
                    <DivideLine style={styles.divideVertical} />
                    <TouchableOpacity style={styles.rankType}>
                        <Text style={styles.rankText}>综合排序</Text>
                    </TouchableOpacity>
                </View>
                <DivideLine style={styles.divideHorizontal} />
                <FlatList
                    data={this.state.storeListdata}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backButton: {
        flex:1,
        marginLeft:10,
    },
    backImage: {
        width: 40,
        height: 40,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    divideVertical: {
        width: 2,
        marginVertical: 3,
    },
    divideHorizontal: {
        height: 2,
        marginHorizontal: 10,
    },
    rank: {
        flexDirection: 'row',
        height: 30,
    },
    rankType: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#878787',
    }
})