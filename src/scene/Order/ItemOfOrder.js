import React, { PureComponent } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import NaviBar from "./naviBar"

type Props = {

};

type State = {

};

export default class extends PureComponent<Props, State> {
	static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105'},
        headerTintColor:'white',
        headerTitle: '海底捞(珠影星光城)',
        headerTitleStyle:{
            color:'white',
            fontSize:22,
        },

        headerLeft: (
            <TouchableOpacity style={styles.backButton} onPress={()=>{
                navigation.goBack()
            }}>
                <Image source={require('../../img/payforbill/back_btn.png')}
                    style={styles.backImage} />
            </TouchableOpacity>
        ),
  
        headerRight:<View />,
    })
	render() {
		return (
			<View>
				<NaviBar />
			</View>
		)
	}

}

const styles=StyleSheet.create({

	backImage: {
	    width: 40,
	    height: 40,
    },
    title: {
    	color: "white"
    }
})
	