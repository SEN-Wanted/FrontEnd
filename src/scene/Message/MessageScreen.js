import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

import MessageItem from './MessageItem';

type Props = {

}

type State = {

};

export default class MessageScreen extends PureComponent<Props, State> {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor:'#140105'},
        headerTintColor: 'white',
        headerTitle: '消息中心',
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
        if(info.count > 0) {
            this.props.navigation.navigate('MessageDetailScreen', {info: info});
        }
        else {
            this.props.navigation.navigate('NoMessageScreen');
        }
    }

    renderItem = (rowData)=> {
        return (
            <MessageItem
                info={rowData.item}
                onPress={this.onListItemSelected}
            />
        )
    }

    render() {
        return(
            <View>
                <FlatList
                    data={[
                        {icon: require('../../img/message/notification.png'), count: 5, shop: '系统通知', time:'2018.5.3', detail: '全新优惠活动登场，这个“五一”给你不一样...'},
                        {icon: require('../../img/home/test.png'), count: 2, shop: '麦当劳(GOGO新天地店)', time:'2018.5.21', detail: '您的订单已配餐完成，请前往前台取餐'},
                        {icon: require('../../img/home/test.png'), count: 2, shop: '海底捞(珠影星光店)', time:'2018.4.11', detail: '后厨正在备餐，请稍等，一大波美食即将登场，敬请期待'},
                        {icon: require('../../img/message/coupon.png'), count: 1, shop: '商家优惠券', time:'2018.5.21', detail: '“麦当劳(GOGO新天地店)”送您一张“满80减10元”优惠券'},
                        {icon: require('../../img/message/service.png'), count: 0, shop: '客服消息', time:'', detail: ''}
                    ]}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backImage: {
        width: 40,
        height: 40,
    }
})