/*
 * 个人信息界面
 */
import React, {Component} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BadgeView from "react-native-badge-view";

import IconItem from "./IconItem";
import DivideLine from "../../widget/DivideLine";
import Colors from "../../common/Colors";
import Images from "../../common/Images";
import Constants from "../../common/Constants";
import pxToDp from "../../common/pxToDp";

export default class MineScene extends Component {
    static navigationOptions = () => {
        return {
            header: null,         //将首页的导航栏取消
          
        }
    }

    jumpDetail = () => {
        this.props.navigation.navigate('MineDetail')
    }

    jumpLogin = () => {
        this.props.navigation.navigate('LoginScene')
    }

    render() {
        return (
            <View style={{backgroundColor: 'white',flex:1}}>
                <View style={styles.panel}>
                    <View style={styles.panel_header}>
                        <TouchableOpacity style={styles.panel_header_setting}>
                            <Icon name="cog" size={20} color={Colors.white_fff} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.panel_header_message}>
                                <BadgeView parentView={<Icon name="envelope" size={20} color={Colors.white_fff} />}
                                    badgeText={"38"} badgeTextColor={"red"} badgeBackgroundColor={"white"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.panel_body}>
                        <TouchableOpacity style={styles.panel_body_avatar}
                            onPress={this.jumpLogin}>
                            <Icon name="user-circle" size={40} color={Colors.white_fff} />
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.panel_body_text}>chenmy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.jumpDetail}>
                                <Text style={styles.panel_body_text}>个人信息&nbsp;&gt;</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.myInfo}>
                    <IconItem
                        source={Images.info_star}
                        text={Constants.info_star}
                    />
                    <IconItem
                        source={Images.info_footprint}
                        text={Constants.info_footprint}
                    />
                    <IconItem
                        source={Images.info_evaluate}
                        text={Constants.info_evaluate}
                    />
                    <IconItem
                        source={Images.info_thanks}
                        text={Constants.info_thanks}
                    />
                </View>
                <DivideLine style={styles.divideMajor} />
                <View>
                    <View>
                        <View style={styles.offerView}>
                            <Text style={styles.OfferText}>APP专享优惠</Text>
                        </View>
                        <DivideLine style={styles.divideMinor} />
                        <View style={styles.myInfo}>
                            <IconItem
                                source={Images.info_cash}
                                text={Constants.info_cash}
                            />
                            <IconItem
                                source={Images.info_redEnvelope}
                                text={Constants.info_redEnvelope}
                            />
                            <IconItem
                                source={Images.info_wallet}
                                text={Constants.info_wallet}
                            />
                            <IconItem
                                source={Images.info_money}
                                text={Constants.info_money}
                            />
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={[styles.item_title, styles.more]}>更多推荐</Text>
                        </View>
                        <DivideLine style={styles.divideMinor} />
                        <View style={styles.myInfo}>
                            <IconItem
                                source={Images.info_service}
                                text={Constants.info_service}
                            />
                            <IconItem
                                source={Images.info_shop}
                                text={Constants.info_shop}
                            />
                            <IconItem
                                source={Images.info_gift}
                                text={Constants.info_gift}
                            />
                            <IconItem
                                source={Images.info_bulb}
                                text={Constants.info_bulb}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#EC1C24',
        opacity: 0.8,
        height: 110,
    },
    panel_header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
    },
    panel_header_setting: {
        marginRight: 20,
        marginTop: 10,
    },
    panel_header_message: {
        marginRight: 20,
    },
    panel_body: {
        flexDirection: 'row',
    },
    panel_body_avatar: {
        marginLeft: 10,
        marginRight: 10,
    },
    panel_body_text: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
    },
    panel_body_text_noLogin: {
        color: '#CDD3DB',
        fontFamily: 'Roboto',
    },
    myInfo: {
        flexDirection: 'row',
        height: 88,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
    },
    divideMajor: {
        backgroundColor: '#EAEAEA',
        height: 5,
    },
    divideMinor: {
        backgroundColor: '#EAEAEA',
        height: 2,
    },
    item_title: {
        fontFamily: 'Roboto',
        fontSize: 10,
        height: 16,
        width: 70,
        marginLeft: 12,
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    app: {
        backgroundColor: '#EC1C24',
        color: '#FFFFFF',
    },
    more: {
        color: '#191919',
    },
    OfferText: {
        color: '#FFFFFF',
        fontSize: pxToDp(10),
    },
    offerView: {
        backgroundColor: '#E51C23', 
        width:70, 
        height:17,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10,
        marginVertical: 3,
    }
})
