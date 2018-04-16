import React, { Component, PropTypes } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import BillPages from "./billPages";
import BillDetails from "./billDetails";

export default class NaviBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			statusPage: infoStyle.pageSelected,
			detailsPage: infoStyle.pageUnselected,
			content: <BillPages />,
		};
	}

	showDetails = () => {
		this.state.statusPage = infoStyle.pageUnselected;
		this.state.detailsPage = infoStyle.pageSelected;
		this.state.content = <BillDetails />;
		this.forceUpdate();
	}

	showStatus = () => {
		this.state.statusPage = infoStyle.pageSelected;
		this.state.detailsPage = infoStyle.pageUnselected;
		this.state.content = <BillPages />;
		this.forceUpdate();
	}

	render() {

		return(
			<View>
				<View style={[infoStyle.switchPage, infoStyle.center]}>
		          <TouchableOpacity onPress={this.showStatus }>
		            <Text style={[this.state.statusPage, infoStyle.pages]}>订单状态</Text>  
		          </TouchableOpacity>
		          <TouchableOpacity onPress={this.showDetails }>
		            <Text style={[this.state.detailsPage, infoStyle.pages]}>订单详情</Text> 
		          </TouchableOpacity>
		        </View>

		        <View>
		          <Text style={infoStyle.devideLine}></Text>
		        </View>

		        {this.state.content}
	        </View>
		)
	}
}

var infoStyle = StyleSheet.create({

    switchPage:{
      flexDirection:"row",
      marginTop:0
    },

    pages:{
      fontSize: 15,
      margin: 25,
      marginBottom: 0 
    },

    pageUnselected:{
      color:"#cccccc",
      borderBottomWidth: 0,
      borderBottomColor: "#ffffff"
    },

    pageSelected:{
      color:"black",
      borderBottomWidth: 5,
      borderBottomColor: "#ff3333"
    },

    devideLine:{
      borderWidth:1,
      height: 0,
      borderColor: "#cccccc",
      marginHorizontal:15,
    }
});