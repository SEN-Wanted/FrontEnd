/*
 * 搜索界面
 */
import React, {Component} from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList, TextInput} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import DivideLine from '../../widget/DivideLine';
import KeywordItem from './KeywordItem';
import RecommendItem from './RecommendItem';
import Constants from '../../common/Constants';
import wantedFetch from '../../common/WantedFetch';

export default class SearchScreen extends Component {
    static propTypes = {
        searchIconPress: PropTypes.func,
        deleteIconPress: PropTypes.func,
        refreshIconPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    keyword = '';

    search() {
        const data = {
            keyword: keyword
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

    static navigationOptions = ({navigation}) => ({
        headerTintColor: 'white',
        headerLeft: (
            <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
                <Icon name="angle-left" size={28} color="#101010" />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={this.search.bind(this)}>
                <Text style={styles.search}>搜索</Text>
            </TouchableOpacity>
        ),
        headerTitle: (
            <View style={styles.input}>
                <Image source={require('../../img/home/ic_search_white_36dp.png')} style={styles.searchIcon}/>
                <TextInput placeholder="海底捞(珠影星光店)" placeholderTextColor="#FFF" underlineColorAndroid="transparent" style={styles.inputText} value={keyword}></TextInput>
            </View>
        ),
    })

    onListItemSelected = (info) => {
        this.props.navigation.navigate('RestaurantScene', {info: info})
    }

    renderItem = (rowData)=> {
        return (
            <RecommendItem
                onPress={this.onListItemSelected}
                info={rowData.item}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.hint}>
                        <Text style={styles.hintTitle}>热门搜索</Text>
                    </View>
                    <DivideLine style={styles.divideMinor} />
                    <View style={styles.keyword}>
                        <KeywordItem text={Constants.search_keyword_1} />
                        <KeywordItem text={Constants.search_keyword_2} />
                        <KeywordItem text={Constants.search_keyword_3} />
                        <KeywordItem text={Constants.search_keyword_4} />
                        <KeywordItem text={Constants.search_keyword_5} />
                        <KeywordItem text={Constants.search_keyword_6} />
                        <KeywordItem text={Constants.search_keyword_7} />
                        <KeywordItem text={Constants.search_keyword_8} />
                        <KeywordItem text={Constants.search_keyword_9} />
                        <KeywordItem text={Constants.search_keyword_10} />
                    </View>
                </View>
                <DivideLine style={styles.divideMajor} />
                <View>
                    <View style={styles.hint}>
                        <Text style={styles.hintTitle}>历史搜索</Text>
                        <TouchableOpacity onPress={this.props.deleteIconPress} style={styles.hintIcon}>
                            <MaterialIcon name="delete" size={18} color="#B4AAAA" />
                        </TouchableOpacity>
                    </View>
                    <DivideLine style={styles.divideMinor} />
                    <View style={styles.keyword}>
                        <KeywordItem text={Constants.search_keyword_1} />
                        <KeywordItem text={Constants.search_keyword_2} />
                        <KeywordItem text={Constants.search_keyword_3} />
                        <KeywordItem text={Constants.search_keyword_4} />
                        <KeywordItem text={Constants.search_keyword_5} />
                        <KeywordItem text={Constants.search_keyword_6} />
                        <KeywordItem text={Constants.search_keyword_7} />
                        <KeywordItem text={Constants.search_keyword_8} />
                        <KeywordItem text={Constants.search_keyword_9} />
                        <KeywordItem text={Constants.search_keyword_10} />
                    </View>
                </View>
                <DivideLine style={styles.divideMajor} />
                <View>
                    <View style={styles.hint}>
                        <Text style={styles.hintTitle}>猜你喜欢</Text>
                        <TouchableOpacity onPress={this.props.refreshIconPress} style={styles.hintIcon}>
                            <Text>换一换</Text>
                            <MaterialIcon name="sync" size={18} color="#B4AAAA" />
                        </TouchableOpacity>
                    </View>
                    <DivideLine style={styles.divideMinor} />
                    <FlatList
                        data={[
                            {title: '海底捞(珠影星光店)'},
                            {title: '麦当劳(中二横路店)'},
                            {title: '时令果汁冰(大学城店)'},
                            {title: '海底捞(珠影星光店)'},
                            {title: '海底捞(珠影星光店)'},
                        ]}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 10,
    },
    input: {
        width: 280,
        height: 30,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#BBB',
        opacity: 0.7,
        borderRadius: 30,
    },
    inputText: {
        width: 250,
        height: 40,
        marginTop: -5,
    },
    searchIcon: {
        width:20,
        height:20,
        margin:5,
    },
    search: {
        marginRight: 10,
    },
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    divideMajor: {
        height: 5,
    },
    divideMinor: {
        height: 2,
        marginHorizontal: 10,
    },
    hint: {
        marginTop: 8,
        marginBottom: 2,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    hintTitle: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#101010',
    },
    hintIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    keyword: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    }
})