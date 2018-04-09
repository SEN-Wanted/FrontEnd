import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, FlatList, DeviceEventEmitter, ScrollView, Dimensions} from 'react-native'
import screen from '../../common/screen'
import color from '../../widget/color'
var {width,height} = Dimensions.get('window');


type Props = {
    data: Array<Object>,
}

type State = {

}
class LeftFlatList extends PureComponent <Props, State>{
 // 构造
    constructor(props) {
        super(props)
        this.state = {
            dataAry: this.props.data,
            cell:0,  //默认选中第一行
        };
    }

    render() {  
        return (
            <FlatList
                ref='FlatList'
                style={{width:80,height:height,backgroundColor:'#101010'}}
                data = {this.state.dataAry} //数据源
                renderItem = {(item) => this.renderRow(item)} //每一行render
                getItemLayout = {(data, index) => ( {length: 40, offset: 40 * index, index} )}
                keyExtractor={(item,index) => item.title+''}  //使用json中的title动态绑定key
            />     
        );
    }

        //每一行render
    renderRow =(item) =>{
        return(
            <TouchableOpacity style={{
                backgroundColor: item.index == this.state.cell ? '#E51C23' : '#101010'
            }} onPress={()=>this.cellAction(item)}>
                <View style={styles.container} >      
                    <Text style={styles.textStyle}>{item.item.title}</Text>
                </View> 
            </TouchableOpacity>
        )
    }
    //点击某行
    cellAction =(item)=>{
        // alert(item.index)
        if(item.index < this.state.dataAry.length){
            this.setState({
                cell:item.index
            })
            DeviceEventEmitter.emit('left',item.index); //发监听
        }
    }

    componentWillUnmount(){
        // 移除监听
        this.listener.remove();
    }

    _addListener = (e) => {
        this.refs.FlatList.scrollToIndex({animated: true, index: e-1})
        this.setState({
            cell:e-1
        })
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('right',(e)=>this._addListener(e));
    }
 

}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Microsoft Yahei',
    },

})

export default LeftFlatList