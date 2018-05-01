import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import NavigationItem from '../../widget/NavigationItem'
import screen from '../../common/screen'

type Props = {
    onPress: Function,
    onPressofmessage?: Function,
}

type State = {

}

class HomeFloatTopbar extends PureComponent<Props,State> {
    render() {
        let {onPress} = this.props
        return (
            <View style={styles.container}>
                   
                    <NavigationItem 
                        title='扫一扫' 
                        titleStyle={styles.titleText} 
                        icon={require('../../img/home/saoyisao.png')}
                        onPress={onPress}
                    />
                  
                   
                    <TouchableOpacity style={styles.searchBar}>
                        <Image source={require('../../img/home/ic_search_white_36dp.png')} style={styles.searchIcon}/>
                        <Text style={{fontSize:15,color:'black'}}>海底捞(珠影星光店)</Text>
                    </TouchableOpacity>
                  
                    
                    <NavigationItem
                        title='消息'
                        titleStyle={styles.titleText} 
                        icon={require('../../img/home/message.png')}
                        //onPress={onPressofmessage}
                    />
                  
                </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        width: screen.width,
        height: 40,
        zIndex: 1,
        backgroundColor:"transparent",
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    searchBar:{
        flexDirection:'row',
        width: screen.width * 0.7,
        height:30,
        borderRadius: 19,
        flexDirection: 'row',
        paddingLeft: 10,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#ffffff99',
      //  alignSelf: 'center',
    },
    searchIcon: {
        width:20,
        height:20,
        margin:5,
    },
    titleText: {
        color:'#FEF5EA',
        fontSize:12, 
        fontFamily: 'Roboto',
        alignSelf:'center',
    },
})

export default HomeFloatTopbar