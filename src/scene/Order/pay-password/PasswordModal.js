import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import InputView from './InputView';
import Keyboard from './Keyboard';
import pxToDp from '../../../common/pxToDp'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
class PasswordModal extends PureComponent {

  static defaultProps = {
    length: 6,
    clear: true,
    backdrop: false,
    title: '请输入支付密码'
  }

  state = { visible: false, password: '' }
  timer = null;

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  show() {
    if (this.props.clear && this.state.password) {
      this.setState({ password: '' });
    }
    this.setState({ visible: true })
  }

  hide() {
    this.setState({ visible: false })
  }

  conectText(text) {
    let nextPassword = this.state.password + text;
    if (nextPassword.length > this.props.length) return null;
    this.setState({ password: nextPassword });
    if (nextPassword.length === this.props.length) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.onDone && this.props.onDone(nextPassword);
        this.hide();
      }, 50);
    };
  }

  onDelete() {
    let password = this.state.password;
    this.setState({ password: password.substring(0, password.length - 1) });
  }

  render() {
    const { backdrop, height, title, onDone, price, ...rest } = this.props;
    return (
      <Modal animationType={'slide'} visible={this.state.visible} onRequestClose={() => { this.hide() }} transparent>
        <View style={[styles.container, { backgroundColor: backdrop ? 'rgba(0,0,0,0.4)' : 'transparent' }]}>
          <View style={{ height: height || 400, backgroundColor: 'transparent', alignItems: 'center',justifyContent:'flex-end' }}>
            <View style={styles.center}>
              <View style={styles.header}>
                <TouchableOpacity style={styles.close} onPress={() => { this.hide() }}>
                  <Image source={require('../../../img/payforbill/close.png')} style={{ height: 25, width: 25 }} resizeMode={'stretch'} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.close}/>
              </View>
              <View style={styles.priceView}>
                <Text style={{fontSize: pxToDp(36), color:'#050505'}}>￥{price}</Text>
              </View>
              <View style={styles.cardView}>
                <Text style={{fontSize: pxToDp(15), color: '#9C9C9C'}}>中信银行信用卡（7281）</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <InputView index={this.state.password.length} style={styles.inputBox} {...rest} />
              </View>
            </View>
            <Keyboard onPress={(text) => { this.conectText(text) }} onDelete={() => { this.onDelete() }} />
          </View>
        </View>
      </Modal >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  header: {
    width: screenWidth * 0.64,
    height: screenWidth * 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C7C7C7',
  },
  priceView: {
    height: screenWidth * 0.22, 
    width: screenWidth * 0.64,
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C7C7C7',
  },
  cardView: {
    height: screenWidth * 0.12,
    width: screenWidth * 0.64,
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#C7C7C7',
  },
  inputBox: {
    width: screenWidth * 0.56,
    height: screenWidth * 0.1,
  },
  close: {
    width: screenWidth * 0.1333,
    height: screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#101010',
    fontWeight: 'bold',
    fontSize: pxToDp(15),
  },
  center: {
    width: screenWidth * 0.64,
    height: screenWidth * 0.64,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: screenHeight * 0.12,
    //justifyContent: 'center'
  }
})

export default PasswordModal;