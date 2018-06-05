import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation'
import {Provider} from 'mobx-react'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import SplashScreen from 'react-native-splash-screen'

import TabBarItem from './widget/TabBarItem'
import Colors from './common/Colors'

import HomeScene from './scene/Home/HomeScene'
import OrderScene from './scene/Order/OrderScene'
import MineScene from './scene/Mine/MineScene'

import MineDetail from './scene/Mine/MineDetailScreen'
import SearchScene from './scene/Search/SearchScreen'

import SearchResultScene from './scene/Search/SearchResultScreen'
import SignUpScene from './scene/SignUp/SignUpScene'
import LoginScene from './scene/Login/LoginScene'
import RestaurantScene from './scene/Restaurant/RestaurantScene'
import OrderItemScene from './scene/Order/OrderItemScene'

import SubmitOrderScene from './scene/Order/SubmitOrderScene'
import CodeScreen from './scene/Code/CodeScreen'

import MessageScreen from './scene/Message/MessageScreen'
import MessageDetailScreen from './scene/Message/MessageDetailScreen'
import NoMessageScreen from './scene/Message/NoMessageScreen'
import stores from './store/index'

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
      const { scene } = sceneProps;
      const { route } = scene;
      const params = route.params || {}
      const transition = params.transition || 'forHorizontal'
      return CardStackStyleInterpolator[transition](sceneProps)
    }
})


class RootScene extends PureComponent<{}> {

    componentDidMount() {
        SplashScreen.hide()
    }

    render() {
        console.log('root scene render');    
        return (
            <Provider {...stores}>
                <Navigator/>
            </Provider>
        );
    }
}

const Tab = TabNavigator({
    Home: {
        screen:HomeScene,
        navigationOptions:() => ({
            tabBarLabel: '首页',
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/tabbar_homepage.png')}
                    selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
                />
            )
        })
    },
    Order: {
        screen:OrderScene,
        navigationOptions:() => ({
            tabBarLabel: '订单',
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/tabbar_order.png')}
                    selectedImage={require('./img/tabbar/tabbar_order_selected.png')}
                />
            )
        })
    },
    Mine: {
        screen:MineScene,
        navigationOptions:() => ({
            tabBarLabel: '我的',
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/tabbar_mine.png')}
                    selectedImage={require('./img/tabbar/tabbar_mine_selected.png')}
                />
            )
        })
    }
} , 
    {
        tabBarComponent: TabBarBottom,   //Tab导航组件的模型
        swipeEnabled: false,         //是否可以滑动
        tabBarPosition: 'bottom',   //Tab导航栏规定位置
        lazy: true,              //点击导航按钮时，才加载对应的Scene
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#FC4C5B', // 文字和图片选中颜色
            inactiveTintColor: 'black', // 文字和图片未选中颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {
                height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            }, 
            style: {
                backgroundColor: '#fff', // TabBar 背景色
                height: 50
            },
            labelStyle: {
                fontSize: 11, // 文字大小
                fontFamily: 'Microsoft Yahei',  //文字字体风格
            },
            iconStyle: {
                height: 30,
            }
        }
    }
)

const Navigator = StackNavigator({
    Tab: {screen: Tab},
    //WebScene: {screen: WebScene},
    RestaurantScene: {screen: RestaurantScene},
    OrderItemScene: {screen: OrderItemScene},
    SubmitOrderScene: {screen: SubmitOrderScene},
    MineDetail: {screen: MineDetail},
    SearchScene: {screen: SearchScene},
    SearchResultScene: {screen: SearchResultScene},
    CodeScreen: {screen: CodeScreen},
    MessageScreen: {screen: MessageScreen},
    MessageDetailScreen: {screen: MessageDetailScreen},
    NoMessageScreen: {screen: NoMessageScreen},
    SignUpScene: {screen: SignUpScene},
    LoginScene: {screen: LoginScene}
}, {
        //设置界面跳转方式
        transitionConfig: TransitionConfiguration,
        
        navigationOptions:{           
            headerBackTitle: null,
            headerTintColor:'white',
            headerTitleStyle: {               
            }
        }   
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    wrapper: {
        height: 200,
        width: 200,
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
})

export default RootScene