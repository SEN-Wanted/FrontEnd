import React, {PureComponent} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';

import * as Animatable from 'react-native-animatable';


type Props = {
    maskStyle: Object,
    onPress: Function,
    visible: boolean,
}

type State = {

}
export default class MaskLayer extends PureComponent<Props, State> {
    constructor(props) {
      super(props);
      this.state = {

      };
  }
    render() {
        let { maskStyle, onPress, visible } = this.props
        if(visible){
            return (
                <TouchableWithoutFeedback onPress={ onPress }>
                    <Animatable.View  style={maskStyle} duration={300}/>
                </TouchableWithoutFeedback>
            );
        } else {
            return <Animatable.View duration={300}/>
        }
    }
}

