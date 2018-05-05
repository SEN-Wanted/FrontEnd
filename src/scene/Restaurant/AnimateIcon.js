import React, {PureComponent} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
} from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import screen from '../../common/screen'
import ListcarIconBadge from './Listcar/ListcarIconBadge'

const { width, height } = screen
const maxPlacedListCount = 5

type Props = {
    containerStyle: Object,
    viewSize: number,
    viewColor: any,
    onPress: Function,
    badgeText: number,
}

type State = {

}
export default class AnimateIcon extends PureComponent <Props, State>{
    constructor(props) {
        super(props);

    }

    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('pulse',()=>{
            this.listcarIcon.pulse(200)
        })
    }

    componentWillUnmount(){
        // 移除监听
        this.listener.remove();
    }

    render() {
        let { containerStyle, viewSize, viewColor, onPress, badgeText } = this.props
        return (
            <Animatable.View 
                ref={ (el) => this.listcarIcon = el }
                style={ [containerStyle, { height: viewSize, width: viewSize }] }
            >
                <ListcarIconBadge        
                    badgeSize={ width*0.04 }
                    badgeText={ badgeText }
                />
                <TouchableOpacity style={ [{ backgroundColor: viewColor }, containerStyle] }
                    onPress={ onPress }>
                    <FontIcon name="cart-plus" size={ 25 } color='white' />
                </TouchableOpacity>
            </Animatable.View>
        )
    }
}

