import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  NetInfo,
  StatusBar,
} from 'react-native';

import {observer, inject} from 'mobx-react'
import wantedFetch from '../../common/WantedFetch'
import Form, {form} from './SignUpForm'
import screen from '../../common/screen'

const { width, height } = screen


@inject(['user'])
@observer
export default class SignUpScene extends Component {
    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
          
        }
    }
    constructor(props) {
        super(props);
        form.$hooks.onSuccess = async (form) => {
            alert(form.$('phone').value+'  '+form.$('password').value)
            let formData = new FormData()
            formData.append('phone', String(form.$('phone').value))
            formData.append('password', String(form.$('password').value))
            //http://2v0683857e.iask.in:22871/sign_up http://5afbc8babc1beb0014c29e31.mockapi.io/api/user/
            const data = {
                phone: form.$('phone').value,
                password: form.$('password').value,
            }
            const result = await wantedFetch('sign_up','POST', data)
            if(result.status_code == 201) {
                alert('ok')
            }else {
                alert(result+'')
            }
        }
    }

    componentDidMount() {
        this.props.user.setStatusbarHidden(true)
        NetInfo.addEventListener('connectionChange',
            (networkType) => {
                //alert(networkType.type)
                this.props.user.setNetworkType(networkType.type);
            }
        )
    }

    componentWillUnmount() {
        this.props.user.setStatusbarHidden(false)
    }

    jumpLogin = () => {
        this.props.navigation.navigate('LoginScene')
    }
    render() {
        return (
            <ImageBackground source={require('../../img/signAndLogin/login_bg.jpeg')} style={styles.imgBackground} >
                <StatusBar translucent={true} hidden={this.props.user.isStatusbarHidden}/>
                <View style={styles.container} >
                    <Image source={require('../../img/signAndLogin/magnifier.png')} style={styles.magnifier}/>

                    <Form form={form} />
                     
                    <TouchableOpacity style={styles.navigate} onPress={this.jumpLogin}>
                        <Text style={{fontSize: 15, color: 'white'}} >已注册登陆</Text>
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


