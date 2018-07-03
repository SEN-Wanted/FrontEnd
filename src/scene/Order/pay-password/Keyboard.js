import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable'

class Keyboard extends Component {

  static defaultProps = {
    onPress: () => { },
    onDelete: () => { },
    rerender: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!nextProps.rerender;
  }

  renderItem(text) {
    return (
      <TouchableHighlight style={styles.item} onPress={() => { this.props.onPress(text) }} underlayColor={'#F5F5F5'}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    )
  }

  renderItemFirst(text) {
    return (
      <TouchableHighlight style={styles.itemFirst} onPress={() => { this.props.onPress(text) }} underlayColor={'#F5F5F5'}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    )
  }

  renderDelete() {
    return (
      <TouchableHighlight style={styles.item} onPress={() => { this.props.onDelete() }} underlayColor={'#F5F5F5'}>
        <Image source={require('../../../img/payforbill/delete.png')} resizeMode={'contain'} style={{ height: 35 }} />
      </TouchableHighlight>
    )
  }

  render() {
    console.log('Keyboard rerender')
    const { style } = this.props;
    return (
      <Animatable.View 
        style={[styles.keyboardView, style]}
        animation= {"slideInUp"}
        duration = {600}
      >
        <View style={styles.itemView}>
          {this.renderItemFirst('1')}
          {this.renderItem('2')}
          {this.renderItem('3')}
        </View>
        <View style={styles.itemView}>
          {this.renderItemFirst('4')}
          {this.renderItem('5')}
          {this.renderItem('6')}
        </View>
        <View style={styles.itemView}>
          {this.renderItemFirst('7')}
          {this.renderItem('8')}
          {this.renderItem('9')}
        </View>
        <View style={styles.itemView}>
          <View style={styles.itemFirst} />
          {this.renderItem('0')}
          {this.renderDelete()}
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  keyboardView: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderColor: '#C7C7C7',
    marginBottom: 1,
  },
  itemView: {
    height: 45,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#C7C7C7'
  },
  itemFirst: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: '#C7C7C7'
  },
  text: {
    fontSize: 25,
    color: '#333333'
  }
})

export default Keyboard;