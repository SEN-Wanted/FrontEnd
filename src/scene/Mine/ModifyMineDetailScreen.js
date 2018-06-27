/*
 * 修改个人详情界面
 */
import React, {PureComponent} from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {observer, inject} from 'mobx-react';

import Form, {form} from './ModifyForm';

type Props = {
    
}

type State = {

}

@inject(['user'])
@observer
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

    constructor(props) {
        super(props);
        form.$hooks.onSuccess = async (form) => {
            const data = {
                username: form.$('username').value,
                password: form.$('password').value,
                newPassword: form.$('newPassword').value,
            };
            try{
                const result = await wantedFetch('users/modify','POST', data, 10000, 'application/json');
                if(result.res.status_code == '201') {
                    this.props.user.setUserName(result.res.user.username);
                    this.props.user.setPassword(result.res.user.newPassword);
                    this.props.navigation.navigate('MineDetail');
                }
            } catch(error) {
                alert(error);
            }
        }
    }

    componentDidMount() {
        form.clear();
    }

    render() {
        return(
            <View style={styles.container}>
                <Form form={form} />
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