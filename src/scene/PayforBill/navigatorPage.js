import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import Details from './details';

export default class NavigatorPage extends Component {
  render() {
    return(
      <Navigator 
        initialRoute={{name:'Main'}}
        renderScene={this.renderScene}

        renderScene(route, navigator) {
          
          if (route.name === 'details') {
            return <Details navigator={navigator} />
          }

          return (<View> <Text>hello</Text> </View>)
        }
      />
    );
  }
}