/*
 * 修改个人详情界面
 */
import React, {Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { observer, inject} from 'mobx-react/native'
import Toast, {DURATION} from 'react-native-easy-toast'
import wantedFetch from '../../common/WantedFetch'
import ModifyInfoItem from './ModifyInfoItem';
import WaitModal from '../../widget/WaitModal'


@inject(['user'])
@observer
export default class ModifyMineDetailScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor:'#FFFFFF'},
        headerTintColor: 'white',
        headerTitle: '修改信息',
        headerTitleStyle: {
            color: '#101010',
            fontSize: 22,
            flex: 1,
            textAlign: 'center',
        },
        headerLeft: (
            <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
                <Icon name="angle-left" size={28} color="#101010" />
            </TouchableOpacity>
        ),
        headerRight: <View />,
    })

    constructor(props) {
        super(props);
        this.state = {
            nickName: this.props.user.userNickName,
            oldPassword: "",
            newPassword: "",
            visible: false,
        }
    }

    changeText = (text,title) => {
        switch(title) {
            case "用户名" :
                this.setState({nickName:text});break;
            case "旧密码" :
                this.setState({oldPassword:text});break;
            case "新密码" :
                this.setState({newPassword:text});break;
        }
    }

    PostData = async() => {
        let userID = this.props.user.userID
        let token = this.props.user.token
        let data = {
            nickName: this.state.nickName,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
        }
        const formData = new FormData()
        formData.append('username', this.state.nickName)
        formData.append('phone_num', this.props.user.username)
        formData.append('old_password', this.state.oldPassword)
        formData.append('new_password', this.state.newPassword)
        try {
            this.setState({visible: true})
            const json = await wantedFetch('users/modify',"POST",formData,10000,'multipart/form-data',token)
            if(json.res.status_code === '201'){
                this.setState({visible: false})
                this.props.user.setNickName(this.state.nickName)
                this.refs.toast.show('修改成功！', DURATION.LENGTH_LONG)
            }else {
                this.setState({visible: false})
                alert(json.res.status_code)
            }
        }catch(error) {
            alert(""+error)
            this.setState({visible: false})
            this.refs.toast.show('出现了错误，请重试', DURATION.LENGTH_LONG)
        }
    }


    render() {
        return(
            <View style={styles.container}>
                <WaitModal visible={this.state.visible} />
                <View style={styles.form}>
                    <ModifyInfoItem title="用户名" onChangeText={this.changeText} value={this.state.nickName} />
                    <ModifyInfoItem title="旧密码" onChangeText={this.changeText} value={this.state.oldPassword} />
                    <ModifyInfoItem title="新密码" onChangeText={this.changeText} value={this.state.newPassword} />
                </View>
                <TouchableOpacity style={styles.modify} onPress={this.PostData}>
                    <Text style={styles.modifyText}>确认修改</Text>
                </TouchableOpacity>
                <Toast ref="toast" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backButton: {
        flex: 1,
        marginLeft: 10,
    },
    container: {
        backgroundColor: '#F0F0F0',
        flex: 1,
    },
    form: {
        flex: 1,
    },
    modify: {
        height: 45,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    modifyText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#E51C23',
        textAlign: 'center',
    }
})