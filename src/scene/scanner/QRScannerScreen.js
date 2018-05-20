/*
 * 扫码界面
 */
import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

import Images from '../../common/Images';
import Colors from '../../common/Colors';
import TitleBar from '../../widget/TitleBar';
import QRScannerView from '../../widget/QRScannerView';
import Styles from '../../common/QrcodePaymentStyles';

export default class QRScannerScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
        }
    }

    render() {
        return (
            <QRScannerView
                bottomMenuStyle={{height: 120, backgroundColor: '#000', opacity: 1}}
                isShowScanBar={true}
                scanBarImage={Images.ic_scan_bar}
                cornerColor={Colors.blue_scanner}
                cornerOffsetSize={0}
                borderWidth={0}
                hintText={'放入框内，自动扫描'}
                hintTextStyle={{color: '#969CA5', fontSize: 17, fontFamily: 'italic',}}
                hintTextPosition={50}
                maskColor={Colors.black_000}
                onScanResultReceived={this.barcodeReceived.bind(this)}
                bottomMenuHeight={120}

                renderTopBarView={() => {
                    return (
                        <TitleBar
                            backIconPress={() => this.props.navigation.goBack()}
                        />
                    )
                }}

                renderBottomMenuView={() => this._renderMenu()}
            />
        );
    }

    _renderMenu() {
        return (
            <View style={Styles.view_menu_container}>
                <View style={Styles.view_menu_item_container}>
                    <TouchableOpacity>
                        <Icon name="qrcode" size={45} color="#03A9F4" />
                        <Text style={Styles.text_menu_title_default}>扫码</Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.view_menu_item_container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Payment')}>
                        <Icon name="barcode" size={45} color="#CDD3DB" />
                        <Text style={Styles.text_menu_title}>付款码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    barcodeReceived(e) {
        console.log(e);
    }
}