// import React, { Component, PropTypes } from 'react';
import React, { Component} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';
import { observer, inject, Observer } from 'mobx-react/native'
import BillPages from "./billPages"
import BillDetails from "./billDetails"
import wantedFetch from '../../common/WantedFetch'
import screen from '../../common/screen'
import pxToDp from '../../common/pxToDp'

const { width, height } = screen
@inject(['user'])
@observer
export default class OrderItemScene extends Component {
	static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105', height: width * 0.15},
        headerTintColor:'white',
        headerTitle: '我的订单',//navigation.state.params ? navigation.state.params.info.storeName : 'error',
        headerTitleStyle:{
            color:'white',
            fontSize: pxToDp(20),
        },

        headerLeft: (
            <TouchableOpacity style={infoStyle.backButton} onPress={()=>{
                navigation.goBack()
            }}>
                <Image source={require('../../img/payforbill/back_btn.png')}
                    style={infoStyle.backImage} />
            </TouchableOpacity>
        ),
  
        headerRight:<View />,
    })

	constructor(props) {
        super(props);
        this.state = {
            detail: {}
        }
    }

    componentDidMount() {
        this.requestData()
    }

    requestData = async() => {
        let userID = this.props.user.userID
        let token = this.props.user.token
        try {
            //const json = await wantedFetch('user/110/orders/1','GET',{},10000,'application/json',token)
            const json = await wantedFetch('http://5afbc8babc1beb0014c29e31.mockapi.io/api/order','GET')
            let data = json.res
            this.setState({detail: data})
        }catch (error) {
            alert('error' + error)
        }
    }
    
    
    
    _renderTitleIndicator() {
        return <PagerTitleIndicator 
                    titles={['订单状态', '订单详情']} 
                    style={infoStyle.pageTitle}
                    trackScroll={true}
                    itemStyle={infoStyle.pageTitleItem} 
                    itemTextStyle={{fontSize: pxToDp(14), color: '#969696'}}
                    selectedItemStyle={infoStyle.pageTitleItem} 
                    selectedItemTextStyle={{fontSize: pxToDp(14), color: '#101010'}}
                    selectedBorderStyle={{height: 3, backgroundColor: '#E51C23'}}
                />;
    }

	render() {
        let orderTime = this.props.navigation.state.params.info.date
		return(
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{flex:1, backgroundColor:'white',flexDirection: 'column-reverse'}}
                    indicator={this._renderTitleIndicator()}
                    horizontalScroll={false}
                >
                    <View>
                        <BillPages 
                            message = {orderTime.date}
                        />
                    </View>
                    <View>
                        <BillDetails
                            info = {this.state.detail}
                        />
                    </View>
                </IndicatorViewPager>
            </View>
		)
	}
}

const infoStyle = StyleSheet.create({
    backImage: {
	    width: 40,
	    height: 40,
    },
    backButton: {
        flex: 1,
        marginLeft: 10,
    },
    pageTitle: {
        backgroundColor: 'white', 
        height: width * 0.12, 
        marginHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#969696',
    },
    pageTitleItem: {
        width: (width - 30) / 4,
        //height: width * 0.3,
    }
});