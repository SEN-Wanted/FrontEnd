import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  NetInfo,
} from 'react-native';

import {observer, inject} from 'mobx-react'
import wantedFetch from '../../common/WantedFetch'
import Form, {form} from './LoginForm'
import screen from '../../common/screen'

const { width, height } = screen


@inject(['user'])
@observer
export default class LoginScene extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        NetInfo.addEventListener('connectionChange',
            (networkType) => {
                alert(networkType.type)
            }
        )
    }
    render() {
        return (
            <ImageBackground source={require('../../img/signAndLogin/login_bg.jpeg')} style={styles.imgBackground} >
                <StatusBar translucent={true} hidden={true}/>
                <View style={styles.container} >
                    <Image source={require('../../img/signAndLogin/magnifier.png')} style={styles.magnifier}/>

                    <Form form={form} />
                    <TouchableOpacity style={styles.navigate}>
                        <Text style={{fontSize: 15, color: 'white'}} >去注册</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.navigate,
                        {backgroundColor: 'transparent',top:height * 0.9,position:'absolute'}]}>
                        <Text style={{fontSize: 17, color: 'white'}} >忘记密码</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        width: null,
        height: null,
     // //不加这句，就是按照屏幕高度自适应
        // //加上这句，就是按照屏幕自适应
        // resizeMode:Image.resizeMode.contain,
        backgroundColor:'rgba(16,16,16,0.6)',
    },
    container: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(16,16,16,.6)',  
    },
    magnifier: {
        width: width * 0.278,
        height: width * 0.278,
        marginBottom: height * 0.01,
    },
    navigate: {
        width: width * 0.278,
        height: width * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(16,16,16,.7)',
        borderRadius: 25,
        marginTop: height * 0.032,
    },
});


