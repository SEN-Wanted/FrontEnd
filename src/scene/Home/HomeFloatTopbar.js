
import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import NavigationItem from '../../widget/NavigationItem'
import screen from '../../common/screen'

type Props = {
    onPress1?: Function,
    onPress2?: Function,
    onPress3?: Function,
    messageCount?:string,
}

type State = {

}
const { width, height } = screen
export default class HomeFloatTopbar extends PureComponent<Props,State> {
    render() {
        let {onPress1, onPress2, onPress3, messageCount} = this.props
        return (
            <View style={styles.container}>
                   
                    <NavigationItem 
                        title='扫一扫' 
                        titleStyle={styles.titleText} 
                        icon={require('../../img/home/saoyisao.png')}
                        onPress={onPress1}
                    />
                  
                   
                    <TouchableOpacity style={styles.searchBar} onPress={onPress2}>
                        <Image source={require('../../img/home/ic_search_white_36dp.png')} style={styles.searchIcon}/>
                        <Text style={{fontSize:14,color:'#191919'}}>海底捞(珠影星光店)</Text>
                    </TouchableOpacity>
                  
                    
                    <NavigationItem
                        title='消息'
                        titleStyle={styles.titleText} 
                        icon={require('../../img/home/message.png')}
                        onPress={onPress3}
                        badge={messageCount}
                    />
                  
                </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        width: width,
        height: width * 0.139,
        zIndex: 1,
        backgroundColor:"transparent",
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    searchBar:{
        flexDirection:'row',
        width: width * 0.7,
        height: width * 0.083,
        borderRadius: 19,
        flexDirection: 'row',
        //paddingLeft: 10,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#ffffff99',
      //  alignSelf: 'center',
    },
    searchIcon: {
        width:25,
        height:25,
        margin:5,
    },
    titleText: {
        color:'#FEF5EA',
        fontSize:12, 
        fontFamily: 'Roboto',
        alignSelf:'center',
    },
})

