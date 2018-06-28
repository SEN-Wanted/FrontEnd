/*
 * 修改个人详情界面
 */
import React, {PureComponent} from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import ModifyInfoItem from './ModifyInfoItem';

type Props = {

}

type State = {

}

export default class ModifyMineDetailScreen extends PureComponent<Props, State> {
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

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.form}>
                    <ModifyInfoItem style={styles.item} id="username" info={{title: '用户名', detail: 'chenmy'}} />
                    <ModifyInfoItem style={styles.item} id="oldPassword" info={{title: '旧密码', detail: ''}} />
                    <ModifyInfoItem style={styles.item} id="newPassword" info={{title: '新密码', detail: ''}} />
                </View>
                <TouchableOpacity style={styles.modify}>
                    <Text style={styles.modifyText}>确认修改</Text>
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
    form: {
        flex: 1,
    },
    item: {
        height: 50,
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