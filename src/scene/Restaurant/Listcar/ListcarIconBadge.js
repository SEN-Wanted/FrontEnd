import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

import screen from '../../../common/screen'

const { width, height } = screen
type Props = {
    badgeSize?: number,
    badgeText?: number,
    badgeBackgroundColor?: string,
    badgeTextColor?: string,
}

type State = {

}
export default class ListcarIconBadge extends PureComponent<Props, State> {


    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let {badgeSize,badgeText,badgeBackgroundColor,badgeTextColor} = this.props
        if(badgeText && badgeText != 0 ) {
            return (         
                <View style={{
                    backgroundColor:'black' || badgeBackgroundColor,
                    width:badgeSize,
                    height:badgeSize,
                    borderRadius:badgeSize,
                    position:'absolute',
                    justifyContent:'center',
                    alignItems:'center',
                    top:badgeSize / 2,
                    left:width*0.11,
                    zIndex:20,
                    }}
                >
                    <Text style={{
                            color: 'white' || badgeTextColor,
                            textAlign: 'center',
                            fontSize: badgeSize * 0.8,
                            fontWeight: 'bold',
                        }} numberOfLines={1}
                    >
                            {this.props.badgeText}
                    </Text>            
                </View> 
            );
        } else {
            return <View />
        }
    }
}



