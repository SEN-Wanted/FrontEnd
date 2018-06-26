/*
 * 修改个人详情界面
 */
import React, {PureComponent} from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import ModifyInfoItem from './ModifyInfoItem';

type Props = {
    info: Object
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

    modify() {
        const data = {
            title: info.title,
            detail: info.detail
        };
        try{
            const result = await wantedFetch('search','POST', data, 10000, 'application/json');
            if(result.res.status_code == '201') {
                this.props.navigation.navigate('SearchResultScene');
            }
        } catch(error) {
            alert(error);
        }
    }

    renderItem = (rowData)=> {
        return (
            <ModifyInfoItem
                info={rowData.item}
            />
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={info}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                />
                <TouchableOpacity style={styles.modify} onPress={this.modify.bind(this)}>
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