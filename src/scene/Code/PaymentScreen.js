/*
 * 付款码界面
 */
import React, { PureComponent } from "react";
import {StyleSheet, Text, Image, View, TouchableOpacity} from "react-native";
import {Header, Left, Body, Right, Title} from "native-base";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Images from "../../common/Images";

type Props = {
    onPress: Function,
}

type State = {

}

export default class PaymentScreen extends PureComponent<Props, State> {
    static propTypes = {
        backIconPress: PropTypes.func,
        refreshIconPress: PropTypes.func,
        changeIconPress: PropTypes.func,
    };

    static navigationOptions = ({navigation}) => {
        return {
            header: null,         //将首页的导航栏取消
          
        }
    }

    constructor(props) {
        super(props);
    }

    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
        }
    }

    render() {
        let {onPress} = this.props;

        return (
            <View style={styles.payment}>
                <View>
                    <Header style={styles.header}>
                        <Left>
                            <TouchableOpacity onPress={onPress}>
                                <Icon name="chevron-circle-left" size={25} color="#1C64C3" />
                            </TouchableOpacity>
                        </Left>
                        <Body style={styles.header_body}>
                            <Title style={styles.header_title}>付款码</Title>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={this.props.backIconPress}>
                                <Icon name="ellipsis-h" size={25} color="#555555" />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                </View>
                <View>
                    <Text style={styles.tip}>仅限当面向商家付款使用，勿泄露给他人</Text>
                </View>
                <View style={styles.code}>
                    <View>
                        <Image source={Images.ic_barcode}></Image>
                    </View>
                    <View>
                        <Text style={styles.barcode_number}>6255&nbsp;4438&nbsp;8614&nbsp;8176&nbsp;341</Text>
                    </View>
                    <View>
                        <Image source={Images.ic_qrcode}></Image>
                    </View>
                    <View style={styles.bind}>
                        <TouchableOpacity onPress={this.props.changeIconPress}>
                            <Text style={styles.bank}>招商银行（尾号4444）-信用卡</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.changeIconPress}>
                            <Text style={styles.change}>更换</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={this.props.refreshIconPress} style={styles.refresh}>
                        <MaterialIcon name="sync" size={20} color="#FFF" />
                        <Text style={styles.refreshTip}>点击手动刷新</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    payment: {
        backgroundColor: '#0D0A12',
    },
    header: {
        height: 50,
        backgroundColor: '#FFFFFF',
    },
    header_body: {
        alignItems: 'center',
        paddingLeft: 50,
    },
    header_title: {
        color: '#101010',
    },
    tip: {
        color: '#949494',
        fontFamily: 'Roboto',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 15,
    },
    code: {
        backgroundColor: '#FFFFFF',
        height: 350,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    barcode_number: {
        color: '#111111',
        fontFamily: 'Roboto',
        fontSize: 16,
        marginBottom: 10,
    },
    bind: {
        flexDirection: 'row',
        marginTop: 15,
    },
    bank: {
        color: '#03A9F4',
        fontFamily: 'Roboto',
        fontSize: 15,
        marginRight: 15,
    },
    change: {
        color: '#0D0A12',
        fontFamily: 'Roboto',
        fontSize: 15,
    },
    refresh: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 17,
    },
    refreshTip: {
        color: '#FFFFFF',
        fontFamily: 'Microsoft Yahei',
        fontSize: 17,
    }
})