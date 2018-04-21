import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import {
	AppRegistry,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import MyScene from './myScene';

export default class AwesomeProject extends Component {

	render() {
		return (
			<Navigator 
				initialRoute={{title:'index'}}
				renderScene={(route, navigator) => {
					if (route.title == 'index')
						return (
							<View>
							<TouchableOpacity onPress={()=>{
								navigator.push({title:"billPages"});
							}}>
								<Text>pay for bill</Text>
							</TouchableOpacity>
							</View>
						)
					else
					return (
						<MyScene goback={()=>{
							navigator.pop();
						}} />
					)
				}}
			/>
		) // return

	}
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);