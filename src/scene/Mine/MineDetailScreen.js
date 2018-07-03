/*
 * 个人详情界面
 */
import React, {Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Image} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { observer, inject} from 'mobx-react/native'
import NavigationService from '../../common/NavigationService'
import InfoItem from "./InfoItem";
import DivideLine from "../../widget/DivideLine";

@inject(['user'])
@observer
export default class MineDetailScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor:'#FFFFFF'},
        headerTintColor: 'white',
        headerTitle: '我的账号',
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

    state = {
        visible: false,
        transparent: true,
        avatarSource: null,
    }

    
    

    onListItemSelected = (info) => {
        this.props.navigation.navigate('ModifyMineDetail', {info: info});
    }

    renderItem = (rowData)=> {
        return (
            <InfoItem
                onPress={this.onListItemSelected}
                info={rowData.item}
            />
        )
    }

    onSignoutButton = () => {
        this.props.user.setLoginStatus(false,0)
        NavigationService.popToTop()
    }

    render() {
        let phone = this.props.user.username? this.props.user.username.substring(0,3) + "****" + this.props.user.username.substring(7,11) : 'xxxxxxx'
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.item} onPress={()=>{this.setState({visible: true})}}>
                    <Text style={styles.text}>头像</Text>
                    <View style={styles.forward}>
                        <View style={styles.avatar}>
                            {this.state.avatarSource === null ? <Icon name="user-circle" size={20} color="#CDD3DB" /> : <Image style={styles.avatarImg} source={this.state.avatarSource} />}
                        </View>
                        <Icon name="angle-right" size={18} color="#B4AAAA" />
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={[
                        {title: '用户名', detail: this.props.user.userNickName},
                        {title: '账户密码', detail: '修改'},
                        {title: '绑定手机号', detail: phone},
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                />
                <TouchableOpacity onPress={this.onSignoutButton} style={styles.bottomItem}>
                    <Text style={[styles.bottomItemText, styles.quitText]}>退出当前账号</Text>
                </TouchableOpacity>
                <Modal 
                    visible={this.state.visible} 
                    transparent={this.state.transparent} 
                    onRequestClose={()=>{console.log("mineDetailModal close")}}
                >
                    <View style={[styles.modal, {backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.4)' : 'transparent'}]}>
                        <TouchableOpacity onPress={()=>{this.setState({visible: false})}} style={styles.bottomItem}>
                            <Text style={styles.bottomItemText}>拍照</Text>
                        </TouchableOpacity>
                        <DivideLine style={styles.divideMinor} />
                        <TouchableOpacity onPress={()=>{this.setState({visible: false})}} style={styles.bottomItem}>
                            <Text style={styles.bottomItemText}>从相册选择</Text>
                        </TouchableOpacity>
                        <DivideLine style={styles.divideMajor} />
                        <TouchableOpacity onPress={()=>{this.setState({visible: false})}} style={styles.bottomItem}>
                            <Text style={styles.bottomItemText}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 2,
        marginTop: 10,
    },
    text: {
        color: '#101010',
        fontFamily: 'Roboto',
        marginLeft: 5,
    },
    forward: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5,
    },
    avatar: {
        marginRight: 5,
    },
    avatarImg: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    bottomItem: {
        height: 45,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    bottomItemText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        textAlign: 'center',
    },
    quitText: {
        color: '#E51C23',
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    divideMajor: {
        backgroundColor: '#EAEAEA',
        height: 5,
    },
    divideMinor: {
        backgroundColor: '#EAEAEA',
        height: 2,
    },
})