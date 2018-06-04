/*
 * 扫码界面
 */
import React, {PureComponent} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

import Images from '../../common/Images';
import Colors from '../../common/Colors';
import TitleBar from './TitleBar';
import QRScannerView from './QRScannerView';

type Props = {
    onPress: Function,
}

type State = {

}

export default class QRScannerScreen extends PureComponent<Props, State> {
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
            <QRScannerView
                bottomMenuStyle={{height: 20, backgroundColor: '#000', opacity: 1}}
                isShowScanBar={true}
                scanBarImage={Images.ic_scan_bar}
                cornerColor={Colors.blue_scanner}
                cornerOffsetSize={0}
                borderWidth={0}
                hintText={'放入框内，自动扫描'}
                hintTextStyle={{color: '#969CA5', fontSize: 17, fontFamily: 'italic',}}
                hintTextPosition={100}
                maskColor={Colors.black_000}
                onScanResultReceived={this.barcodeReceived.bind(this)}
                bottomMenuHeight={20}

                renderTopBarView={() => {
                    return (
                        <TitleBar
                            backIconPress={onPress}
                        />
                    )
                }}

                renderBottomMenuView={() => this._renderMenu()}
            />
        );
    }

    _renderMenu() {
        
    }

    barcodeReceived(e) {
        alert(e.type + ' ' + e.data);
    }
}