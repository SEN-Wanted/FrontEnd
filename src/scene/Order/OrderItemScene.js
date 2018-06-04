// import React, { Component, PropTypes } from 'react';
import React, { PureComponent} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';
import BillPages from "./billPages"
import BillDetails from "./billDetails"
import pxToDp from '../../common/pxToDp'
import screen from '../../common/screen'
type Props = {

}

type State = {

};
const { width, height } = screen
export default class OrderItemScene extends PureComponent<Props, State> {
	static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105', height: width * 0.15},
        headerTintColor:'white',
        headerTitle: navigation.state.params.info.name ? navigation.state.params.info.name : 'error',
        headerTitleStyle:{
            color:'white',
            fontSize:22,
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

	}
    
    _renderTitleIndicator() {
        return <PagerTitleIndicator 
                    titles={['订单状态', '订单详情']} 
                    style={infoStyle.pageTitle}
                    trackScroll={true}
                    itemStyle={infoStyle.pageTitleItem} 
                    itemTextStyle={{fontSize: 17, color: '#969696'}}
                    selectedItemStyle={infoStyle.pageTitleItem} 
                    selectedItemTextStyle={{fontSize: 17, color: '#101010'}}
                    selectedBorderStyle={{height: 3, backgroundColor: '#E51C23'}}
                />;
    }

	render() {

		return(
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{flex:1, backgroundColor:'white',flexDirection: 'column-reverse'}}
                    indicator={this._renderTitleIndicator()}
                    horizontalScroll={false}
                >
                    <View>
                        <BillPages />
                    </View>
                    <View>
                        <BillDetails />
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
        //borderBottomWidth: 3,
        //borderColor: '#969696',
    },
    pageTitleItem: {
        width: (width - 30) / 4,
        //height: width * 0.3,
    }
});