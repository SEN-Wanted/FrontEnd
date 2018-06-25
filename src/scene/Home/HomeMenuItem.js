import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity,Dimensions} from 'react-native'
import screen from '../../common/screen'
import FeaIcon from 'react-native-vector-icons/Feather'
import pxToDp from '../../common/pxToDp';

type Props = {
    title:string,
    icon:any,
    color:any,
    onPress:Function,
}

type State = {

}
export default class HomeMenuItem extends PureComponent <Props, State>{

    render() {
        let {title, icon, color, onPress} = this.props

        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={styles.childContainer} >
                    <Image source={color} style={styles.colorIcon} />
                    <Image source={icon} style={styles.icon}/>
                </View>
                <Text style={styles.title}>{title}</Text>               
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 4.5,
    },
    childContainer: {
        width: 50,//screen.width / 9,
        height: 50,//screen.width / 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'white',
    },
    icon: {
        width: screen.width / 17,
        height: screen.width / 17,
        margin: 5,
        position: 'absolute',
    },
    colorIcon: {
        width: screen.width / 8,
        height: screen.width / 8,
        margin: 5,
        position: 'absolute',
    },
    title: {
        color: '#A6A6A6',
        fontSize: pxToDp(13),
    }
})
