import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

import screen from '../../../common/screen'
import ListcarIconBadge from './ListcarIconBadge'

const { width, height, screenHeight, titleHeight, listItemHeight } = screen
const maxPlacedListCount = 5

type Props = {
    isVisible: boolean,
    containerStyle: Object,
    currentListCount?: number,
    currentTotalCount?: number,
    onPress: Function,
}

type State = {

}
export default class ListcarIcon extends PureComponent <Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        let {containerStyle, onPress,isVisible,currentTotalCount} = this.props

        let listCount = this.props.currentListCount    
        let currentHeight = listCount > maxPlacedListCount ? (listItemHeight * maxPlacedListCount) : (listItemHeight * listCount)
        let sumHeight = currentHeight + titleHeight

        let animata = this.props.isVisible ? "slideInUp" : 'fadeOutDownBig'
   
        return (
            <Animatable.View style={[containerStyle, { height:width * 0.16, width:width * 0.16,
                marginTop: screenHeight*0.9 - sumHeight - width * 0.065,
                marginLeft: width * 0.1,}]}
                animation={animata}
                duration = {300}
            >
                <ListcarIconBadge 
                        badgeSize={width*0.04}
                        badgeText={currentTotalCount}
                />
                <TouchableOpacity 
                    style={[
                        containerStyle,
                        {
                            backgroundColor:'#E51C23',
                            marginTop: screenHeight*0.9 - sumHeight - width * 0.065,
                            marginLeft: width * 0.11,
                        },
                    
                    ]}
                    onPress={ onPress }
                >
                    <FontIcon name="cart-plus" size={30} color='white' />
                </TouchableOpacity>
            </Animatable.View>
        )
    }
}

