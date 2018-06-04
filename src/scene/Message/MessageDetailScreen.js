import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

import MessageDetailItem from './MessageDetailItem';

type Props = {
    info: Object
}

type State = {

};

export default class MessageDetailScreen extends PureComponent<Props, State> {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor:'#140105'},
        headerTintColor: 'white',
        headerTitle: navigation.state.params.info.shop,
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

    renderItem = (rowData)=> {
        return (
            <MessageDetailItem
                info={rowData.item}
            />
        )
    }

    render() {
        let {info} = this.props;
        
        return (
        <View>
            <FlatList
                data={[
                    {shop: '海底捞(珠影星光店)', time:'2018.4.11', detail: '订单已收到，正在为你处理'},
                    {shop: '海底捞(珠影星光店)', time:'2018.4.11', detail: '后厨正在备餐，请稍等，一大波美食即将登场，敬请期待'}
                ]}
                renderItem={this.renderItem}
                keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
            />
        </View>
        )
    };
}

const styles = StyleSheet.create({
    backImage: {
        width: 40,
        height: 40,
    }
})