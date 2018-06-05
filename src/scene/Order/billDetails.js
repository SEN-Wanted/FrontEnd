// import React, { Component } from 'react';
import React, { PureComponent} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
} from 'react-native'
import screen from '../../common/screen'
import pxToDp from '../../common/pxToDp'
import SingleWord from '../../widget/SingleWord'
//export default class BillDetails extends Component {
type Props = {
	info?: object 
}

type State = {

}
const { width, height } = screen
export default class BillDetails extends PureComponent<Props, State> {

	constructor(props:Object) {
        super(props)
	}
	

	render(){

		let dishesList=[];
		for (i = 0; i < 3; i++) {
			dishesList.push(
				<View style={detailsStyle.ListItem} key={i}>
					<SingleWord text={'折'} />
					<View style={{width: width * 0.14, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={detailsStyle.blackFont}>{this.billInfo.dish[i]} </Text>
					</View>
					<View style={{width: width * 0.1, justifyContent: 'flex-start'}}>
						<Text>*{this.billInfo.dishNumber[i]} </Text>
					</View>
					<View style={detailsStyle.priceStyle}>
						<Text style={detailsStyle.blackFont}>￥{this.billInfo.priceFinal[i]} </Text>
					</View>
				</View>
			);
		}
		return(
	        <View style={{padding: 15}}>
	        <ScrollView>
	        	<View style={{paddingHorizontal: 20}}> 

			        <View style={[detailsStyle.displayColumn, detailsStyle.title]}>
			        	<View style={detailsStyle.displayColumn}>
			        		<Image source={require("../../img/payforbill/icon.png")} style={detailsStyle.iconImg}/>
				        	<Text style={{color: '#878787', marginLeft:10}}>海底捞(珠影星光店)</Text>
				        </View>
				        <View style={{backgroundColor: '#E51C23',width:70,height:17,
                                justifyContent:'center',alignItems:'center'}}>
                        	<Text style={detailsStyle.OfferText}>APP专享优惠</Text>
                    	</View>
			        </View>

			        {this.lines}

			        <View style={detailsStyle.displayRow}>
			        	{dishesList}
					</View>

					{this.lines}

			        <View style={detailsStyle.displayRow}>
			        	<View style={detailsStyle.ListItem}>
							<Text style={detailsStyle.blackFont}>餐位费</Text>
							<View style={detailsStyle.priceStyle}>
								<Text style={detailsStyle.blackFont}>￥3</Text>
							</View>
						</View>

						<View style={detailsStyle.ListItem}>
							<Text style={detailsStyle.blackFont}>服务费</Text>
							<View style={detailsStyle.priceStyle}>
								<Text style={detailsStyle.blackFont}>￥6</Text>
							</View>
						</View>
					</View>

					{this.lines}

					<View style={detailsStyle.displayRow}>
						<View style={detailsStyle.ListItem}>
							<SingleWord text={'新'} bgColor={'#3F51B5'}/>
							<View style={detailsStyle.offerMessage}>
								<Text>门店新客立减</Text>
							</View>
							<View style={{width: width * 0.15, justifyContent: 'flex-start'}}>
								<Text style={detailsStyle.blackFont}>-￥3</Text>
							</View>
						</View>
						<View style={detailsStyle.ListItem}>
							<SingleWord text={'返'} bgColor={'#FA2549'}/>
							<View style={[detailsStyle.offerMessage,{width: width * 0.45}]}>
								<Text>满返商家代金券优惠 </Text>
							</View>
							<View style={{width: width * 0.2}}>
								<Text>返3元商家券 </Text>
							</View>
						</View>
					</View>

					{this.lines}

					<View style={detailsStyle.ListItem}>
						<Text>总计 ￥126 优惠 ￥15 </Text>
						<Text style={{color:"#FA2549"}}>实付 ￥111</Text>
					</View>
				</View>

				{this.lines}

				<View>
					<Text style={detailsStyle.billInfoTitle}>订单信息</Text>
					{this.lines}
					<View style={detailsStyle.orderMessageItem}>
						<Text style={detailsStyle.greyFont}>支付方式</Text>
						<Text style={detailsStyle.blackFont}> {this.billInfo.payMethod}</Text>
					</View>
					{this.lines}
					<View style={detailsStyle.orderMessageItem}>
						<Text style={detailsStyle.greyFont}>订单号码</Text>
						<Text style={detailsStyle.blackFont}> {this.billInfo.billID}</Text>
					</View>
					{this.lines}
					<View style={detailsStyle.orderMessageItem}>
						<Text style={detailsStyle.greyFont}>订单时间</Text>
						<Text style={detailsStyle.blackFont}> {this.billInfo.billTime}</Text>
					</View>
				</View>
			</ScrollView>
	        </View>
		)
	}

	billInfo = {
		dish : ["鸳鸯锅底", "招牌滑虾", "鱼豆腐"],
		dishNumber : [1, 12, 13],
		priceBeforeCutoff : [38, 56, 23],
		priceFinal : [34, 520, 19.3],
		amount : 111,
		payMethod : "在线支付",
		billID : "1829e763476993829",
		billTime : "2017-02-08 13:23:23",
	}

	lines = 
		<View style={detailsStyle.devideLine} />
}

const detailsStyle = StyleSheet.create({
	ListItem: {
		height: height * 0.0468, 
		flexDirection: 'row', 
		alignItems: 'center',
		justifyContent: "space-between",
	},
	displayColumn:{
		flexDirection: "row",
		alignItems: 'center',
	},
	displayRow:{
		flexDirection: "column",
	},
	priceStyle: {
		width: width * 0.14, 
		justifyContent: 'flex-start',
	},
	OfferText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
	title:{
		height: 35,
		justifyContent: "space-between"
	},
	iconImg:{
		width:pxToDp(25),
		height:pxToDp(19)
	},
	greyFont:{
		color:"#878787",
		marginHorizontal: 10,
	},
	blackFont:{
		color:"black"
	},
	devideLine:{
		borderWidth:1,
		height: 1,
		borderColor: "#cccccc",
		marginVertical: 0,
	},
	offerMessage: {
		width: width * 0.5,
		justifyContent: 'flex-start',
		alignItems: 'flex-start', 
	},
	billInfoTitle:{
		marginVertical: 5,
		backgroundColor:"#FEF5EA",
		padding: 10,
		fontSize: 15,
		color: '#878787',
	},
	orderMessageItem: {
		marginVertical: 5,
		height: height * 0.0468,
		flexDirection: 'row', 
		alignItems: 'center',
	}
});
