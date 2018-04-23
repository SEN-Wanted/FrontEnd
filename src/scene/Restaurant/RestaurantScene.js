import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity,FlatList} from 'react-native'
import screen from '../../common/screen'
import color from '../../widget/color'
import * as api from '../../api'
import LeftFlatList from './LeftFlatList'
import RightSectionList from './RightSectionList'



type Props = {
   

}

type State = {

}
class RestaurantScene extends PureComponent <Props, State>{
    static navigationOptions = ({navigation}) => ({
        headerStyle:{backgroundColor:'#140105'},
        headerTintColor:'white',
        headerTitle: navigation.state.params?navigation.state.params.info.title:'没有数据',
        headerTitleStyle:{
            color:'white',
            fontSize:22,
        },
        /*headerBackImage:(
            require('../../img/restaurant/ic_chevron_left_white_48dp.png')
           // style={{color:'white',width:25,height:25}},
        ),*/
        headerLeft: (
            <TouchableOpacity style={styles.backButton} onPress={()=>{
                navigation.goBack()
            }}>
                <Image source={require('../../img/restaurant/ic_chevron_left_white_48dp.png')}
                    style={styles.backImage} />
            </TouchableOpacity>
        ),
  
        headerRight:<View />,
    })

    constructor(props:Object) {
        super(props)


    }

    componentDidMount() {
        this.requestData()
    }

    requestData = async() => {
        try {
            let response = await fetch('http://2v0683857e.iask.in:22871/foodData')
            let json = await response.json()
            alert('resonseData  ' + JSON.stringify(json))
        } catch (error) {
            alert('error' + error)
        }
    }

    render() {
  
        return (
                <View style={styles.container}>
                    <LeftFlatList data={api.haidilaoInfos} />
                    <RightSectionList data={api.haidilaoInfos} />
                </View>        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    backButton: {
        flex:1,
        marginLeft:10,
    },
    backImage: {
        width: 40,
        height: 40,
    },
    tabBar: {
        backgroundColor:'white',
        height:45,
    },
})

export default RestaurantScene