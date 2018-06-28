/*
 * 搜索结果界面
 */
import React, {Component} from "react";
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import wantedFetch, {RequestState} from '../../common/WantedFetch'
import WaitProgress from '../../widget/WaitProgress'
import NetWorkFail from '../../widget/NetWorkFail'
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
            hasReqOver: RequestState.Wait,
        }
    }

    componentDidMount() {
        this.paramsAnalysis()
    }

    paramsAnalysis = () => {
        let type = ''
        if(this.props.navigation.state.params.index) {
            let index = this.props.navigation.state.params.index
            switch(index){
                case 0:
                    type = '甜品'; break;
                case 1:
                    type = '西餐'; break;
                case 2:
                    type = '品牌餐饮'; break;
                case 3:
                    type = '自助餐'; break;
                case 4:
                    type = '小吃快餐'; break;
                case 5:
                    type = '咖啡酒吧'; break;
                case 6:
                    type = '生日聚会'; break;
                case 7:
                    type = '更多'; break;
            }
            this.requestData(type,0)
        } else if(this.props.navigation.state.params.keyword) {
            let keyword = this.props.navigation.state.params.keyword
            this.requestData(keyword,1)
        }
    }

    requestData = async(params,query) => {
        let way = "keyword="
        if(query === 0) {
            way = "type="
        }
        try{
            this.setState({hasReqOver: RequestState.Wait})
            const json = await wantedFetch('http://2v0683857e.iask.in:22871/search?'+way+params,'GET')

            let dataList = json.res.ListStoreData.map((info) => ({
                icon: info.icon,
                storeName: info.storeName,
                storeID: info.storeid,
                starRating: info.starRating,
                price: info.price,
                monthlySell: info.monthlySale,
                distance: info.distance,
                isDiscount: info.isDiscount,
                discountNumber: info.DiscountNumber,
                isAppOffer: info.isAppOffer,
            }))
            this.setState({
                storeListdata: dataList,
                hasReqOver: RequestState.Success,
            })
        } catch (error) {
            alert('error' + error)
            this.setState({hasReqOver: RequestState.Failue})
        }

    }
    
    onListItemSelected = (info) => {
        this.props.navigation.navigate('RestaurantScene', {info: info})
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
        if(this.state.hasReqOver === RequestState.Wait) {
            return <WaitProgress />
        } else if (this.state.hasReqOver === RequestState.Failue) {
            return <NetWorkFail onPress={ this.paramsAnalysis } />
        } else {
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
        )}
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