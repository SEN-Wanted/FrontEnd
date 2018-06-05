import React, {Component} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { PasswordModal } from 'react-native-pay-password'
import screen from '../../common/screen'
import pxToDp from '../../common/pxToDp'
import SingleWord from '../../widget/SingleWord'
import SubmitFooter from './SubmitFooter'

const { width, height, botBarHeight } = screen

@inject(['listcar'])
@observer
export default class SubmitOrderScene extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105', height: width * 0.15},
        headerTintColor:'white',
        headerTitle: '提交订单',
        headerTitleStyle:{
            color:'white',
            fontSize:22,
        },

        headerLeft: (
            <TouchableOpacity style={{flex: 1,marginLeft: 10}} onPress={()=>{
                navigation.goBack()
            }}>
                <Image source={require('../../img/payforbill/back_btn.png')}
                    style={{width: 40, height: 40}} />
            </TouchableOpacity>
        ),
  
        headerRight:<View />,
	})

	constructor(props:Object) {
        super(props)
    }
	
	componentDidMount() {

	}

	submitOnPress() {
        this.refs.modal.show();
    }

	render(){

		let dishesList=[];
		let storeName = this.props.listcar.storeName
		let length = this.props.listcar.states.listCount
		let listcar = this.props.listcar.states.listCar.slice()
		let totalPrice = this.props.listcar.states.totalPrice + 9
		let ActuallyPaid = totalPrice - 15
		for (let i = 0; i < length; i++) {
			dishesList.push(
				<View style={detailsStyle.ListItem} key={i}>
					<SingleWord text={'折'} />
					<View style={{width: width * 0.14, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={detailsStyle.blackFont}>{ listcar[i].name } </Text>
					</View>
					<View style={{width: width * 0.1, justifyContent: 'flex-start'}}>
						<Text>*{ listcar[i].number }</Text>
					</View>
					<View style={detailsStyle.priceStyle}>
						<Text style={detailsStyle.blackFont}>￥{ listcar[i].number * listcar[i].price} </Text>
					</View>
				</View>
			);
		}
		return(
	        <View style={{flex:1, padding: 15, paddingBottom: 0, backgroundColor:'white'}}>
	        	<ScrollView>
	        		<View style={{paddingHorizontal: 20}}> 

			        	<View style={[detailsStyle.displayColumn, detailsStyle.title]}>
			        		<View style={detailsStyle.displayColumn}>
			        			<Image source={require("../../img/payforbill/icon.png")} style={detailsStyle.iconImg}/>
				        		<Text style={{color: '#878787', marginLeft:10}}>{storeName}</Text>
				        	</View>
				        	<View style={{backgroundColor: '#E51C23',width:70,height:17,
                                	justifyContent:'center',alignItems:'center'}}
							>
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
							<Text>总计 ￥{totalPrice} 优惠 ￥15 </Text>
							<Text style={{color:"#FA2549", fontSize: 15}}>实付 ￥{ActuallyPaid}</Text>
						</View>

                    	<View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        	<Text style={{color: '#555555', fontSize: 15}}>支付方式</Text>
                        	<Text style={{color: '#555555', fontSize: 15}}>在线支付</Text>
                    	</View>
					</View>

				</ScrollView>

				<SubmitFooter offerPrice={15} totalPrice={ActuallyPaid} onPress={() => { this.submitOnPress() }}/>
				<PasswordModal ref='modal' height={height*0.9} price={ActuallyPaid} backdrop={true} onDone={(data) => { alert(data) }} />
	        </View>
		)
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
	},
});
