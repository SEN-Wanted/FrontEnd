import React, { Component, PropTypes } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

export default class BillDetails extends Component {


	render(){

		let dishesList=[];
		for (i = 0; i < 3; i++) {
			dishesList.push(
				<View style={detailsStyle.tableStyle} key={i}>
					<Text style={detailsStyle.blackFont}>{this.billInfo.dish[i]} </Text>
					<View style={detailsStyle.tableStyle}>
						<Text>*{this.billInfo.dishNumber[i]} </Text>
						<Text style={detailsStyle.blackFont}>￥{this.billInfo.priceFinal[i]} </Text>
					</View>
				</View>
			);
		}
		return(
	        <View style={detailsStyle.layout}>
	        	<View style={detailsStyle.upperLayout}>

			        <View style={[detailsStyle.displayColumn, detailsStyle.title]}>
			        	<View style={detailsStyle.displayColumn}>
			        	<Image source={require("./src/img/payforbill/icon.png")} style={detailsStyle.iconImg}/>
				        <Text style={detailsStyle.greyFont}>海底捞(珠影星光店)</Text>
				        </View>
				        <View>
				        <Text style={detailsStyle.appDiscount}>APP专享优惠</Text>
				        </View>
			        </View>

			        {this.lines}

			        <View style={detailsStyle.displayRow}>
			        	{dishesList}
					</View>

					{this.lines}

			        <View style={detailsStyle.displayRow}>
			        	<View style={detailsStyle.tableStyle}>
						<Text>餐位费</Text>
						<Text style={detailsStyle.blackFont}> ￥3 </Text>
						</View>

						<View style={detailsStyle.tableStyle}>
						<Text>服务费</Text>
						<Text style={detailsStyle.blackFont}> ￥6 </Text>
						</View>
					</View>

					{this.lines}

					<View style={detailsStyle.displayRow}>
						<View style={detailsStyle.tableStyle}>
							<Text>门店新客立减</Text>
							<Text style={detailsStyle.blackFont}>-￥3</Text>
						</View>
						<View style={detailsStyle.tableStyle}>
							<Text>满返商家代金券优惠 </Text>
							<Text>返3元商家券 </Text>
						</View>
					</View>

					{this.lines}

					<View style={detailsStyle.tableStyle}>
						<Text>总计 ￥126 优惠 ￥15 </Text>
						<Text style={{color:"red"}}>实付 ￥111</Text>
					</View>
				</View>

				{this.lines}

				<View>
					<Text style={detailsStyle.billInfoTitle}>订单信息</Text>
					{this.lines}
					<Text style={detailsStyle.greyFont}>支付方式
						<Text style={detailsStyle.blackFont}> {this.billInfo.payMethod}</Text></Text>
						{this.lines}
					<Text style={detailsStyle.greyFont}>订单号码
						<Text style={detailsStyle.blackFont}> {this.billInfo.billID}</Text></Text>
						{this.lines}
					<Text style={detailsStyle.greyFont}>订单时间
						<Text style={detailsStyle.blackFont}> {this.billInfo.billTime}</Text></Text>
				</View>
	        </View>
		)
	}

	billInfo = {
		dish : ["鸳鸯锅底", "招牌滑虾", "鱼豆腐"],
		dishNumber : [1, 1, 1],
		priceBeforeCutoff : [38, 56, 23],
		priceFinal : [34, 52, 19],
		amount : 111,
		payMethod : "在线支付",
		billID : "1829e763476993829",
		billTime : "2017-02-08 13:23:23",
	}

	lines = 
		<Text style={detailsStyle.devideLine}></Text>;
}

var detailsStyle = StyleSheet.create({

	displayColumn:{
		flexDirection: "row",
	},

	displayRow:{
		flexDirection: "column",
	},

	layout:{
		padding: 15,
	},

	title:{
		height: 30,
		justifyContent: "space-between"
	},

	iconImg:{
		width:25,
		height:25
	},

	greyFont:{
		color:"#aaaaaa"
	},

	blackFont:{
		color:"black"
	},

	appDiscount:{

		backgroundColor:"red",
		color: "white",
		alignItems:"center",
	},

	spaceBetween:{
		justifyContent:"space-between",
	},

	tableStyle:{
		justifyContent:"space-between",
		flexDirection:"row"
	},

	devideLine:{
		borderWidth:1,
		height: 1,
		borderColor: "#cccccc",
		marginVertical: 5
	},

	upperLayout:{
		paddingHorizontal: 20
	},

	billInfoTitle:{
		backgroundColor:"#fff0dd",
		padding: 10
	}
});
