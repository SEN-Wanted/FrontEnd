/*
 * 个人详情界面
 */
import React, {Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

import InfoItem from "../../widget/InfoItem";

export default class MineDetailScreen extends Component {
    static propTypes = {
        avatarPress: PropTypes.func,
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

    onListItemSelected = (info) => {
        //this.props.navigation.navigate('RestaurantScene', {info: info})
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
                <TouchableOpacity style={styles.item} onPress={this.props.avatarPress}>
                    <Text style={styles.text}>头像</Text>
                    <View style={styles.forward}>
                        <View style={styles.avatar}>
                            <Icon name="user-circle" size={20} color="#CDD3DB" />
                        </View>
                        <Icon name="angle-right" size={18} color="#B4AAAA" />
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={[
                        {title: '用户名', detail: 'chenmy'},
                        {title: '账户密码', detail: '修改'},
                        {title: '绑定手机号', detail: '137****3146'},
                        {title: '微信账户', detail: '解除绑定'},
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                />
                <TouchableOpacity onPress={this.props.quitPress} style={styles.quit}>
                    <Text style={styles.quitText}>退出当前账号</Text>
                </TouchableOpacity>
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