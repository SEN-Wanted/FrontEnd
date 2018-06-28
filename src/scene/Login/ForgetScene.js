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
import NavigationService from '../../common/NavigationService'
import wantedFetch from '../../common/WantedFetch'
import Form, {form} from './ForgetForm'
import screen from '../../common/screen'
import WaitModal from '../../widget/WaitModal'

const { width, height } = screen


@inject(['user'])
@observer
export default class ForgetScene extends Component {
    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
          
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        form.$hooks.onSuccess = async (form) => {
            const data = {
                phone: form.$('phone').value,
                password: form.$('password').value,
            }
            try{
                this.setState({visible: true})
                const result = await wantedFetch('sign_up','POST', data,10000,'multipart/form-data')
                if(result.res.status_code == '201') {
                    this.props.user.setToken(result.res.token)
                    this.props.user.setUser(result.res.user.ID, result.res.user.username)
                    this.props.user.setLoginStatus(true)
                    this.setState({visible: false})
                    this.jumpHome()
                }else if(result.res.status_code == '401'){
                    this.setState({visible: false})
                    alert('该手机号已注册，请直接登录！')
                }
            } catch(error) {
                this.setState({visible: false})
                alert(error)
            }
        }
    }

    componentDidMount() {
        form.clear()
        NetInfo.addEventListener('connectionChange',
            (networkType) => {
                //alert(networkType.type)
                this.props.user.setNetworkType(networkType.type);
            }
        )
    }


    jumpHome = () => {
        NavigationService.popToTop()
    }

    jumpLogin = () => {
        form.clear()
        this.props.navigation.goBack()
    }
    render() {
        return (
            <ImageBackground source={require('../../img/signAndLogin/login_bg.jpeg')} style={styles.imgBackground} >
                <StatusBar translucent={true} hidden={true}/>
                <WaitModal visible={this.state.visible} />
                <View style={styles.container} >
                    <Image source={require('../../img/signAndLogin/magnifier.png')} style={styles.magnifier}/>

                    <Form form={form} onPress={() => {alert('test!')}}/>
                     
                    <TouchableOpacity style={styles.navigate} onPress={this.jumpLogin}>
                        <Text style={{fontSize: 15, color: 'white'}} >返回</Text>
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


