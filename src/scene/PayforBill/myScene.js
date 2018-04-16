import React, { Component, PropTypes } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import NaviBar from "./naviBar";

export default class MyScene extends Component {

    render() {
        return (
            <View>
                <View style={[titleStyle.topTitleBar, titleStyle.center]}>
                    <View style={titleStyle.backButton}>
                      <TouchableOpacity onPress={this.props.goback}>
                        <Image source={require('./src/img/payforbill/back_btn.png')} style={titleStyle.backButtonImg}/>
                      </TouchableOpacity>
                    </View>

                    <View style={titleStyle.topTitle}>
                      <Text style={titleStyle.fontStyle}> 海底捞(珠影星光店) </Text>
                    </View>
                    <View style={titleStyle.backButton}></View>
                </View>

                <NaviBar />

            </View>
        )
    }
}

var titleStyle = StyleSheet.create({

    center:{
      alignItems:'center',
    },

    topTitleBar:{
      flexDirection:"row",
      justifyContent:"space-between",
      backgroundColor:'black',
      borderWidth:2,
      height: 50
    },

    backButton:{
      width:50,
      height:50
    },

    backButtonImg:{
      width:50,
      height:50
    },

    fontStyle:{
        fontSize:20,
        color:'white',
    }
});

