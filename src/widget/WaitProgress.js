import React, {PureComponent} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'

type Props = {

}


export default class WaitProgress extends PureComponent {

    render() {
        return (
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Progress.CircleSnail size={50} color={['black']} />
            </View>
        )
    }
}

