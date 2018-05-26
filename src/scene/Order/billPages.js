// import React, { Component } from 'react';
import React, { PureComponent} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

// export default class BillPages extends Component{

type Props = {

}

type State = {

}

export default class BillPages extends PureComponent<Props, State> {

	render(){

		let infoItems = [];
		progressLine=statusStyle.progressBarLine;
		lines = statusStyle.line;
		circles = statusStyle.progressBarCircle;
		for (i = 0; i < 5; i++)
		{
			if (i >= 4) {
				progressLine=null;
				lines = null;
			}
			
			infoItems.push(
				<View key={i}>
					<View style={statusStyle.items}>
						<View style={statusStyle.progressBar}>
							<View style= {circles} />
							<View style={progressLine} />
				  		</View>
				  		<View style={statusStyle.itemsPhase}>
				  			<Text style={statusStyle.itemsPhaseTitle}>{this.infoList.content[i]}</Text>
				  			<Text style={statusStyle.itemsPhaseTips}>{this.infoList.tips[i]}</Text>
				  		</View>
				  		<View style={statusStyle.itemsTime}>
				  			<Text>{this.infoList.time[i]}</Text>
				  		</View>
					</View>
					<View style={lines} />
				</View>
			);
		}
		
		return(
			<View style={statusStyle.layout}>
				{infoItems}
			</View>
		)
	}

 	infoList={
 		content:["订单已提交","支付成功","商家已处理","菜品准备中","订单完成"],
 		tips:["请耐心等待商家处理","","商家准备中，请稍后","请等待上菜",""],
		time:["10月30日 12:00","10月30日 12:01","10月30日 12:04","10月30日 12:10","10月30日 12:20"]	
 	}
}


const statusStyle = StyleSheet.create({
	centerStyle:{
		alignItems:"center"
	},
	layout:{
		paddingHorizontal: 25,
		paddingTop: 10
	},

	items:{
		flexDirection:"row",
		height:50,
	},

	itemsPhase:{
		marginHorizontal:10,
		marginTop:5,
		width: 135
	},

	itemsPhaseTitle:{
		fontSize:18,
		color:"black"
	},

	itemsPhaseTips:{
		fontSize:13,
		color: "#666666"
	},

	itemsTime:{
		marginTop: 10,
		height:80
	},

	progressBar:{
		
		flexDirection:"column",
		marginTop:13
	},

	line:{
		borderWidth:1,
		borderColor:"#666666",
		height:0,
		marginTop:5,
		marginHorizontal: 10
	},

	progressBarCircle:{
		borderWidth:1,
		width:10,
		height:10,
		borderRadius:50,
		backgroundColor: "black"
	},

	progressBarLine:{
		borderWidth:1,
		height: 45,
		width:1,
		marginLeft:4,
		borderColor:"red"
	},
});


