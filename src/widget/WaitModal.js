import React, {PureComponent} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'

type Props = {
    visible: boolean,
}


export default class WaitModal extends PureComponent {

    render() {
        return (
            <Modal 
                transparent={ true }
                visible={ this.props.visible }
                onRequestClose={ ()=>{console.log('LoginModal close！')} }
            >
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:50, height:50, borderRadius:40, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                        <Progress.CircleSnail size={30} color={['black']} />
                    </View>
                </View>
            </Modal>
        )
    }
}

