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
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';
import {observer, inject} from 'mobx-react'
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationService from '../../common/NavigationService'
import wantedFetch from '../../common/WantedFetch'
import Form, {form} from './LoginForm'
import screen from '../../common/screen'
import WaitModal from '../../widget/WaitModal'

const { width, height } = screen


@inject(['user'])
@observer
export default class LoginScene extends Component {
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
            const formData = new FormData()
            formData.append('username', String(form.$('phone').value))
            formData.append('password', String(form.$('password').value))
            try{
                this.setState({visible: true})
                const result = await wantedFetch('login','POST', formData,10000,'multipart/form-data')
                if(result.res.status_code == '201') {
                    //alert(result.res.user.phone+"   " +result.res.user.nickname)
                    alert(result.res.token)
                    this.props.user.setToken(result.res.token)
                    this.props.user.setUser(result.res.user.id, result.res.user.phone, result.res.user.nickname)
                    this.props.user.setLoginStatus(true)
                    this.setState({visible: false})
                    DeviceEventEmitter.emit('submitOrder'); //发监听
                    //alert(""+ this.props.user.userID + " "+this.props.user.token)
                    this.jumpHome()
                }else if(result.res.status_code == '401'){
                    this.setState({visible: false})
                    this.refs.toast.show('用户名或密码错误！')
                }
            } catch(error) {
                this.setState({visible: false})
                alert(error)
            }
        }
    }

    componentDidMount() {
        form.clear()
    }


    jumpHome = () => {
        NavigationService.popToTop()
    }

    jumpSignUp = () => {
        form.clear()
        this.props.navigation.navigate('SignUpScene')
    }

    jumpForget = () => {
        this.props.navigation.navigate('ForgetScene')
    }

    render() {
        return (
            <ImageBackground source={require('../../img/signAndLogin/login_bg.jpeg')} style={styles.imgBackground} >
                <StatusBar translucent={true} hidden={true}/>
                <WaitModal visible={this.state.visible} />
                <View style={styles.container} >
                    <Image source={require('../../img/signAndLogin/magnifier.png')} style={styles.magnifier}/>

                    <Form form={form} />
                    <TouchableOpacity style={styles.navigate} onPress={this.jumpSignUp}>
                        <Text style={{fontSize: 15, color: 'white'}} >去注册</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.navigate,{backgroundColor: 'transparent',top:height * 0.9,position:'absolute'}]}
                        onPress={this.jumpForget}
                    >
                        <Text style={{fontSize: 17, color: 'white'}} >忘记密码</Text>
                    </TouchableOpacity>
                </View>
                <Toast ref="toast" />
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


