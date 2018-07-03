import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import PageControl from 'react-native-page-control'
import HomeMenuItem from './HomeMenuItem'
import screen from '../../common/screen'

type Props = {
    menuInfos: Array<Object>,
    onMenuSelected: Function,
}

type State = {
    
}
class HomeMenuView extends PureComponent <Props, State>{
    constructor(props:Object) {
        super(props)
    }

    render() {
        let {menuInfos, onMenuSelected} = this.props
        let menuElements = menuInfos.map((info,index)=>(
            <HomeMenuItem
                key={index}
                title={info.title}
                icon={info.icon}
                color={info.color}
                onPress={()=>{
                    onMenuSelected(index)
                }}
            />
        ))

        let menuView = (
            <View style={styles.itemsView}>
                {menuElements}
            </View>
        )

        return (
            <View style={styles.container}>
                {menuView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width,
       // paddingHorizontal: 10,
    },
    container: {
        backgroundColor: 'white',
    },
    pageControl: {
        margin:10,
    },
})

export default HomeMenuView;