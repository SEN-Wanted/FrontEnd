import React, { PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {IndicatorViewPager, PagerTabIndicator} from 'rn-viewpager';

import QRScanner from './QRScannerScreen';
import Payment from './PaymentScreen';

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

    render() {
        return(
            <View style={{flex: 1}}>
                <IndicatorViewPager
                    style={{flex: 1}}
                    indicator={this._renderTabIndicator()}
                    horizontalScroll={false}
                >
                   <View>
                        <QRScanner onPress={() => {this.props.navigation.goBack()}} />
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