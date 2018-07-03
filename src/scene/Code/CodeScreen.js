import React, { PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {IndicatorViewPager, PagerTabIndicator} from 'rn-viewpager';

import QRScanner from './QRScannerScreen';
import Payment from './PaymentScreen';
import WaitModal from '../../widget/WaitModal'

type Props = {

}

type State = {

};

export default class CodeScreen extends PureComponent<Props, State> {
    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            waiting: false, //防止多次扫描
            visible: false, //菊花图是否显示
        }
    }

    _renderTabIndicator() {
        let tabs = [{
            text: '扫码',
            iconSource: require('../../img/code/qrcode_icon.png'),
            selectedIconSource: require('../../img/code/qrcode_icon.png')
        }, {
            text: '付款码',
            iconSource: require('../../img/code/barcode_icon.png'),
            selectedIconSource: require('../../img/code/barcode_icon.png')
        }];
        return (
            <PagerTabIndicator
                style={styles.indicator}
                iconStyle={styles.tabIcon}
                selectedIconStyle={styles.selectedTabIcon}
                textStyle={styles.tabText}
                selectedTextStyle={styles.selectedTabText}
                tabs={tabs}
            />
        )
    }

    barcodeReceived = (e) => {
        this.setState({waiting: true, visible: true})  //设为true，防止下一次扫描
        let storeInfo = e.data.split(":")
        setTimeout(() => {
            this.setState({waiting: false,visible: false})
        },3000)   //3S后恢复正常
        if(storeInfo.length > 1) {
            let info = {
                storeID: storeInfo[0],
                storeName: storeInfo[1]
            }
            this.setState({visible: false})
            this.props.navigation.navigate('RestaurantScene',{info:info})
        }
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <WaitModal visible={this.state.visible} />
                <IndicatorViewPager
                    style={{flex: 1}}
                    indicator={this._renderTabIndicator()}
                    horizontalScroll={false}
                >
                   <View>
                        <QRScanner scanJump={this.state.waiting ? null : this.barcodeReceived} onPress={() => {this.props.navigation.goBack()}} />
                    </View>
                    <View>
                        <Payment onPress={() => {this.props.navigation.goBack()}} />
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: '#0D0A12',
        borderTopWidth: 0
    },
    tabIcon: {
        width: 45,
        height: 45,
        tintColor: '#FFF',
        resizeMode: 'contain'
    },
    selectedTabIcon: {
        width: 45,
        height: 45,
        tintColor: '#03A9F4',
        resizeMode: 'contain'
    },
    tabText: {
        color: '#CDD3DB',
        fontSize: 14,
        fontFamily: 'italic',
    },
    selectedTabText: {
        color: '#03A9F4',
        fontSize: 14,
        fontFamily: 'italic',
    }
})