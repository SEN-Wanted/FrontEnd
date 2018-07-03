import React, {Component} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
	ScrollView,
	DeviceEventEmitter,
} from 'react-native'
import { observer, inject } from 'mobx-react/native'
import Moment from 'moment'
import Toast, {DURATION} from 'react-native-easy-toast'
import PasswordModal from './pay-password/PasswordModal'
import NavigationService from '../../common/NavigationService'
import screen from '../../common/screen'
import pxToDp from '../../common/pxToDp'
import SingleWord from '../../widget/SingleWord'
import SubmitFooter from './SubmitFooter'
import wantedFetch from '../../common/WantedFetch'
import WaitModal from '../../widget/WaitModal'

const { width, height, botBarHeight } = screen
const host = "http://2v0683857e.iask.in:22871"  //服务器地址
@inject(['listcar'])
@inject(['user'])
@observer
export default class SubmitOrderScene extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105', height: width * 0.15},
        headerTintColor:'white',
        headerTitle: '提交订单',
        headerTitleStyle:{
            color:'white',
            fontSize: pxToDp(20),
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
		this.state = {
			visible: false
		}
    }


	submitOnPress() {
        this.refs.modal.show();
	}

	passWordDone = (number) => {
		if(number.toString() === '123456') {
			this.setState({visible:true})
			if(this.props.user.isLogin) {
				this.postOrderData()
			} else {
				setTimeout(()=>{
					this.setState({visible:false})
					NavigationService.popToTop()
					this.refs.toast.show('下单成功，请稍等',DURATION.LENGTH_LONG)
				},2000)
			}
		} else {
			this.refs.toast.show('密码错误，请重新提交',DURATION.LENGTH_LONG)
		}
	}
	
	postOrderData = async() => {
		Moment.locale('zh-cn')
		let time = Moment()
		let date = time.format().substring(0,10)+ time.format(' HH:mm:ss') 
		let userID = this.props.user.userID
		let token = this.props.user.token
		let data = {
			storeID: this.props.navigation.state.params.info.storeID,
			storeName: this.props.listcar.storeName,
			foodList: this.props.listcar.states.listCar.slice(),
			mealFee: 3,
			serviceFee: 6,
			totalFee: this.props.listcar.states.totalPrice + 9,
			offer: 15,
			paymentMethod: 1,
			date: date
		}
		try{
			//const result = await wantedFetch('http://5afbc8babc1beb0014c29e31.mockapi.io/api/submitOrder','POST',data)
			const result = await wantedFetch('user/'+userID+'/orders','POST',data,10000,'application/json',token)
			if(result.res.status_code === '201') {
				this.setState({visible:false})
				DeviceEventEmitter.emit('submitOrder'); //发监听
				let info = {
					date:new Date().toLocaleString(),
					storeName:data.storeName
				}
				NavigationService.popToTop()
			} else if (result.res.status_code === '401') {
				console.log(result.res.error_message)
				this.setState({visible:false})
				this.refs.toast.show('出了点小问题，请重试',DURATION.LENGTH_LONG)
			}
		} catch (error) {
			this.setState({visible:false})
			//alert('error' + error)
		}
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
						<Text style={detailsStyle.fontSize11}>*{ listcar[i].number }</Text>
					</View>
					<View style={detailsStyle.priceStyle}>
						<Text style={detailsStyle.blackFont}>￥{ listcar[i].number * listcar[i].price} </Text>
					</View>
				</View>
			);
		}
		return(
	        <View style={{flex:1, padding: 15, paddingBottom: 0, backgroundColor:'white'}}>
				<Toast ref="toast" />
				<WaitModal visible={this.state.visible} />
	        	<ScrollView>
	        		<View style={{paddingHorizontal: 20}}> 

			        	<View style={[detailsStyle.displayColumn, detailsStyle.title]}>
			        		<View style={detailsStyle.displayColumn}>
							{/*require("../../img/payforbill/icon.png")*/}
			        			<Image source={{uri: host + this.props.navigation.state.params.info.storeIcon}} style={detailsStyle.iconImg}/>
				        		<Text style={{color: '#878787', marginLeft: 10}}>{storeName}</Text>
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
									<Text style={detailsStyle.fontSize11}>门店新客立减</Text>
								</View>
								<View style={{width: width * 0.15, justifyContent: 'flex-start'}}>
									<Text style={detailsStyle.blackFont}>-￥3</Text>
								</View>
							</View>
							<View style={detailsStyle.ListItem}>
								<SingleWord text={'返'} bgColor={'#FA2549'}/>
								<View style={[detailsStyle.offerMessage,{width: width * 0.45}]}>
									<Text style={detailsStyle.fontSize11}>满返商家代金券优惠</Text>
								</View>
								<View style={{width: width * 0.2}}>
									<Text style={detailsStyle.fontSize11}>返3元商家券</Text>
								</View>
							</View>
						</View>

						{this.lines}

						<View style={[detailsStyle.ListItem, {marginHorizontal: 10}]}>
							<Text style={{color:"#878787", fontSize: pxToDp(11)}}>总计 ￥{totalPrice} 优惠 ￥15 </Text>
							<Text style={{color:"#FA2549", fontSize: pxToDp(11)}}>实付 ￥{ActuallyPaid}</Text>
						</View>

                    	<View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        	<Text style={{color: '#555555', fontSize: pxToDp(12)}}>支付方式</Text>
                        	<Text style={{color: '#555555', fontSize: pxToDp(12)}}>在线支付</Text>
                    	</View>
					</View>

				</ScrollView>

				<SubmitFooter offerPrice={15} totalPrice={ActuallyPaid} onPress={() => { this.submitOnPress() }}/>
				<PasswordModal ref='modal' height={height*0.9} price={ActuallyPaid} backdrop={true} onDone={(data) => {this.passWordDone(data) }} />
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
        fontSize: pxToDp(10),
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
		color:"black",
		fontSize: pxToDp(11),
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
	orderMessageItem: {
		marginVertical: 5,
		height: height * 0.0468,
		flexDirection: 'row', 
		alignItems: 'center',
	},
	fontSize11: {
		fontSize: pxToDp(11),
		color: '#878787',
	}
});
