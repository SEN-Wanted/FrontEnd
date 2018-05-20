/*
 * 搜索结果界面
 */
import React, {Component} from "react";
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import DivideLine from '../../widget/DivideLine';
import RestaurantListItem from '../Restaurant/RestaurantListItem';

export default class SearchResultScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor:'#140105'},
        headerTintColor: 'white',
        headerTitle: '搜索结果',
        headerTitleStyle: {
            color: 'white',
            fontSize: 22,
            flex: 1,
            textAlign: 'center',
        },
        headerLeft: (
            <TouchableOpacity style={styles.backButton} onPress={() => {
                navigation.goBack()
            }}>
                <Image source={require('../../img/restaurant/ic_chevron_left_white_48dp.png')}
                    style={styles.backImage} />
            </TouchableOpacity>
        ),
        headerRight: <View />,
    })

    onListItemSelected = (info) => {
        //this.props.navigation.navigate('RestaurantScene', {info: info})
    }

    renderItem = (rowData)=> {
        return (
            <RestaurantListItem
                onPress={this.onListItemSelected}
                info={rowData.item}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rank}>
                    <TouchableOpacity style={styles.rankType}>
                        <Text style={styles.rankText}>按距离排序</Text>
                        <Icon name="angle-down" size={20} color="#878787" />
                    </TouchableOpacity>
                    <DivideLine style={styles.divideVertical} />
                    <TouchableOpacity style={styles.rankType}>
                        <Text style={styles.rankText}>按销量排序</Text>
                        <Icon name="angle-down" size={20} color="#878787" />
                    </TouchableOpacity>
                    <DivideLine style={styles.divideVertical} />
                    <TouchableOpacity style={styles.rankType}>
                        <Text style={styles.rankText}>综合排序</Text>
                    </TouchableOpacity>
                </View>
                <DivideLine style={styles.divideHorizontal} />
                <FlatList
                    data={[
                        {title: '海底捞(珠影星光店)'},
                        {title: '海底捞(珠影星光店)'},
                        {title: '海底捞(珠影星光店)'},
                        {title: '海底捞(珠影星光店)'},
                        {title: '海底捞(珠影星光店)'},
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backButton: {
        flex:1,
        marginLeft:10,
    },
    backImage: {
        width: 40,
        height: 40,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    divideVertical: {
        width: 2,
        marginVertical: 3,
    },
    divideHorizontal: {
        height: 2,
        marginHorizontal: 10,
    },
    rank: {
        flexDirection: 'row',
        height: 30,
    },
    rankType: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#878787',
    }
})