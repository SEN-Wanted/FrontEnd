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
import colors from '../../../common/Colors'
import pxToDp from '../../../common/pxToDp'
const { width, height, screenHeight, titleHeight, listItemHeight } = screen
const maxPlacedListCount = 5


type Props = {
    isVisible:boolean,
    currentListCount: number,
    clearListCar: Function,
}

type State = {

}
export default class ListcarPopover extends PureComponent <Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }



    render() {
        let listCount = this.props.currentListCount
        let currentHeight = listCount > maxPlacedListCount ? (listItemHeight * maxPlacedListCount) : (listItemHeight * listCount)
        let sumHeight = currentHeight + titleHeight
        
        let animata = this.props.isVisible ? "slideInUp" : 'fadeOutDownBig'
      //  if (this.props.isVisible) {
            return (
                <Animatable.View style={[
                        styles.container,
                        {
                            height: sumHeight,
                            marginTop: screenHeight * 0.90 - sumHeight,
                        }
                    ]}
                    animation= {animata}
                    duration = {300}
                    //onAnimationEnd={onAnimationEnd}
                >
                    <View style={styles.titleView}>
                        <TouchableOpacity style={styles.clearCarTouchable} onPress={this.props.clearListCar}>
                            <FontIcon name='trash' size={18} color={colors.gray_969696} />
                            <Text style={{fontSize: pxToDp(12)}}>清空购物车</Text>
                        </TouchableOpacity>
                    </View>
                    {this.props.children}
                    {this.props.actions}
                </Animatable.View>
            )
         
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: titleHeight,
        maxHeight: listItemHeight * maxPlacedListCount + titleHeight,
        backgroundColor:'white',
        marginTop: screenHeight * 0.90 - (listItemHeight * maxPlacedListCount + titleHeight),
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#F5F5F5',
        width: width,
        height: titleHeight,
    },
    clearCarTouchable: {
        width: width * 0.22,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: width * 0.125,
    }
});

