import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'


type Props = {
    normalImage: any,
    selectedImage: any,
    focused: boolean,
    tintColor: any,
}

type State = {

}

class TabBarItem extends PureComponent<Props,State> {
    render() {
        let {normalImage, selectedImage, focused, tintColor} = this.props
        return (
            <Image
                source={focused? selectedImage : normalImage}
                style={{width:25, height:25, tintColor: tintColor}}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
})

export default TabBarItem