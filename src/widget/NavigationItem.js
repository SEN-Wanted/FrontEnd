

import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes} from 'react-native'
import {TabNavigator, TabBarBottom} from 'react-navigation'

type Props = {
    title?:string,            // ?号表示可能传进该值，也可能不传入
    titleStyle?: ViewPropTypes.style,
    icon?: any,
    iconStyle?: ViewPropTypes.style,
    onPress?: Function, 
}

type State = {

}

class NavigationItem extends PureComponent<Props,State> {

    render() {
        let {title,titleStyle,icon,iconStyle, onPress} = this.props

        let titleElement = title && (  //当title不为空时，将括号内的语句赋给titleElement
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        )

        let iconElement = icon && (
            <Image source={icon} style={[styles.icon, iconStyle]} />
        )

        return (
            <TouchableOpacity onPress = {onPress} style={styles.container}>
                
                    {iconElement}
                    {titleElement}
                
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 35,
        maxHeight: 40, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 13,
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