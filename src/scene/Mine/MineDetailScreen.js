/*
 * 个人详情界面
 */
import React, {Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Image} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-picker';
import {observer, inject} from 'mobx-react';

import InfoItem from "./InfoItem";
import DivideLine from "../../widget/DivideLine";

@inject(['user'])
@observer
export default class MineDetailScreen extends Component {
    static propTypes = {
        quitPress: PropTypes.func,
    };

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

    selectFromCarema() {
        options = {

        }

        // Launch Camera:
        ImagePicker.launchCamera(options, (response)=>{
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    
    selectFromImageLibrary() {
        options = {

        }

        // Open Image Library:
        ImagePicker.launchImageLibrary(options, (response)=>{
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source
                });
            }
        });
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

    render() {
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
                        {title: '用户名', detail: this.props.user.getUserName()},
                        {title: '账户密码', detail: '修改'},
                        {title: '绑定手机号', detail: this.props.user.getUserPhone()},
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                />
                <TouchableOpacity onPress={this.props.quitPress} style={styles.quit}>
                    <Text style={styles.quitText}>退出当前账号</Text>
                </TouchableOpacity>
                <Modal visible={this.state.visible} transparent={this.state.transparent} onRequestClose={()=>{console.log('mineDetailModal close')}}>
                    <View style={[styles.modal, {backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.4)' : 'transparent'}]}>
                        <TouchableOpacity onPress={this.selectFromCarema.bind(this)} style={styles.bottomItem}>
                            <Text style={styles.bottomItemText}>拍照</Text>
                        </TouchableOpacity>
                        <DivideLine style={styles.divideMinor} />
                        <TouchableOpacity onPress={this.selectFromImageLibrary.bind(this)} style={styles.bottomItem}>
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
    quit: {
        height: 45,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    quitText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#E51C23',
        textAlign: 'center',
    }
})