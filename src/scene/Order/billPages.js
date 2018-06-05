// import React, { Component } from 'react';
import React, { PureComponent} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import screen from '../../common/screen'
import Moment from 'moment'
// export default class BillPages extends Component{

type Props = {
	message: string
}

type State = {

}
const {width, height} = screen
export default class BillPages extends PureComponent<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			time:["10月30日 12:00","10月30日 12:01","10月30日 12:04","10月30日 12:10","10月30日 12:20"]	
		}
    }

	componentDidMount(){
		this.timeConversion(this.props.message)
	}

	timestampTotime(date){
        let M = (date.getMonth() + 1 < 10 ? ''+(date.getMonth()+1) : date.getMonth()+1)
        let D = date.getDate()
        let h = date.getHours() < 10 ?  '0'+date.getHours() + ':' : date.getHours() + ':'
        let m = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()
        return ""+ M + "月" + D + "日 " + h + m 
	}

	timeConversion(time){
		Moment.locale()
		let timeList = []
		let date = Moment(time)
		let time1 = new Date(Date.parse(date) + 1 * 60 * 1000)
		let time2 = new Date(Date.parse(date) + 4 * 60 * 1000)
		let time3 = new Date(Date.parse(date) + 10 * 60 * 1000)
		let time4 = new Date(Date.parse(date) + 20 * 60 * 1000)
		let time0 = "" + parseInt(time.substring(5,7)) + "月" + parseInt(time.substring(8,10)) + "日 " + time.substring(11,16)
		timeList.push(time0)
		alert(time1.getMonth())
		timeList.push(this.timestampTotime(time1))
		timeList.push(this.timestampTotime(time2))
		timeList.push(this.timestampTotime(time3))
		timeList.push(this.timestampTotime(time4))
		this.setState({
			time: timeList
		})
	}

	render(){
		
		let infoItems = [];
		let progressLine=statusStyle.progressBarLine;
		let lines = statusStyle.line;
		let circles = statusStyle.progressBarCircle;
		let picture = <View style= {circles} />
		for (let i = 0; i < 5; i++)
		{
			if (i >= 4) {
				progressLine=null;
				lines = null;
				circles = null;
				picture =  (<View style={statusStyle.background}><Icon name="food-fork-drink" size={20} color="white"/></View>)
			}
			
			infoItems.push(
				<View key={i}>
					<View style={statusStyle.items}>
						<View style={statusStyle.progressBar}>
							{ picture }
							<View style={progressLine} />
				  		</View>
				  		<View style={statusStyle.itemsPhase}>
				  			<Text style={statusStyle.itemsPhaseTitle}>{this.infoList.content[i]}</Text>
				  			<Text style={statusStyle.itemsPhaseTips}>{this.infoList.tips[i]}</Text>
				  		</View>
				  		<View style={statusStyle.itemsTime}>
				  			<Text>{this.state.time[i]}</Text>
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
		width: 30,
		flexDirection:"column",
		marginTop:13,
		alignItems:'center',
		justifyContent:'center',
	},
	line:{
		borderWidth:1,
		borderColor:"#666666",
		height:0,
		marginTop:5,
		marginHorizontal: 30,
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
		borderColor:"red",
	},
	background: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E51C23',
		width: width * 0.09,
		height: width * 0.09,
		borderRadius: width * 0.1,
		marginBottom: 22,
	}
});


