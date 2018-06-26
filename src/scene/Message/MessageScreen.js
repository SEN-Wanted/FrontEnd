import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

import MessageItem from './MessageItem';
import WaitProgress from '../../widget/WaitProgress';
import NetWorkFail from '../../widget/NetWorkFail';
import wantedFetch, {RequestState} from '../../common/WantedFetch';

type Props = {

}

type State = {

};

@inject(['user'])
@observer
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

    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            hasReqOver: RequestState.Wait,
        }
    }

    componentDidMount(){
        if(this.props.user.isLogin) {
            this.requestData()
        }
    }

    requestData = async() => {
        let userID = this.props.user.userID;
        let token = this.props.user.token;
        try {
            this.setState({hasReqOver: RequestState.Wait});
            const response = await wantedFetch('index/message?storeId=', 'GET', {}, 10000, 'application/json', token);
            if(response.res.status_code === '201') {
                let messageList = response.res.messageList.map((info) => ({
                    icon: info.icon,
                    count: info.count,
                    shop: info.shop,
                    time: info.time,
                    detail: info.detail
                }));
                this.setState({ 
                    messageList: messageList,
                    hasReqOver: RequestState.Success
                });
            }
        } catch (error) {
            alert('' + error);
            this.setState({ hasReqOver: RequestState.Failue });
        }
    }

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
        if(this.props.user.isLogin) {
            if(this.state.hasReqOver === RequestState.Wait) {
                return <WaitProgress />
            }
            else if(this.state.hasReqOver === RequestState.Failue) {
                return <NetWorkFail onPress = {this.requestData} />
            }
            else {
                return (
                    <View>
                        <FlatList
                            data={this.state.messageList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index)=> index + ""} // 如果列表顺序会调整，就换为item.title
                        />
                    </View>
                ) 
            }
        }
        else {
            return(
                <View>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('LoginScene')}} ></TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    backImage: {
        width: 40,
        height: 40,
    }
})