

import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes} from 'react-native'
import pxToDp from '../common/pxToDp'
import BadgeView from "react-native-badge-view";
type Props = {
    title?:string,            // ?号表示可能传进该值，也可能不传入
    titleStyle?: ViewPropTypes.style,
    icon?: any,
    iconStyle?: ViewPropTypes.style,
    onPress?: Function, 
    badge?:string,
}

type State = {

}

class NavigationItem extends PureComponent<Props,State> {

    render() {
        let {title, titleStyle, icon, iconStyle, onPress, badge} = this.props

        let titleElement = title && (  //当title不为空时，将括号内的语句赋给titleElement
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        )

        let iconElement = icon && (
            badge ? <BadgeView parentView={<Image source={icon} style={[styles.icon, iconStyle]} />}
            badgeText={badge} badgeTextColor={"red"} badgeBackgroundColor={"white"} 
            autoSize={false} badgeSize={18}/> :
            <Image source={icon} style={[styles.icon, iconStyle]} />
        )


        return (
            <TouchableOpacity onPress = { onPress } style={styles.container}>
                
                    {iconElement}
                    {titleElement}
                
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: 10,
        //maxWidth: 40,
        //maxHeight: 50, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: pxToDp(11),
        color: '#333333',
        alignSelf:'center',
    },
    icon: {
        width: 25,
        height: 25,
        //color: '#FEF5EA',
    },
})

export default NavigationItem