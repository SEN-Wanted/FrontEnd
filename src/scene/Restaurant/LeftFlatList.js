import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, FlatList, DeviceEventEmitter, ScrollView, Dimensions} from 'react-native'
//import { observer, inject } from 'mobx-react'
import { Observer, observer, inject } from 'mobx-react/native'
import screen from '../../common/screen'
import pxToDp from '../../common/pxToDp'
const {width,height} = screen


type Props = {
    data: Array<Object>,
}

@inject(['listcar'])
@observer
class LeftFlatList extends Component {
 // 构造
    constructor(props) {
        super(props)
        /*this.state = {
            dataAry: this.props.data,
            cell:0,  //默认选中第一行
        };*/
    }

    componentWillUnMount() {
        this.props.listcar.setCell(0)    
    }

    render() {  
        return (
            <FlatList
                ref='FlatList'
                style={{width:80,height:height,backgroundColor:'#424242'}}
                data = {this.props.data} //数据源
                renderItem = {(item) => this.renderRow(item)} //每一行render
                getItemLayout = {(data, index) => ( {length: 40, offset: 40 * index, index} )}
                keyExtractor={(item,index) => item.title+''}  //使用json中的title动态绑定key
            />     
        );
    }

        //每一行render
    renderRow =(item) =>{
        return <Observer>{() => (
            <TouchableOpacity style={{
                backgroundColor: item.index === this.props.listcar.cell ? '#E51C23' : '#424242'
            }} onPress={()=>this.cellAction(item)}>
                <View style={styles.container} >      
                    <Text style={styles.textStyle}>{item.item.title}</Text>
                </View> 
            </TouchableOpacity>
        )}</Observer>
    }
    //点击某行
    cellAction =(item)=>{
        // alert(item.index)
        if(item.index < this.props.data.length){
            /*this.setState({
                cell:item.index
            })*/
            this.props.listcar.setCell(item.index)
            DeviceEventEmitter.emit('left',item.index); //发监听
        }
    }

    componentWillUnmount(){
        // 移除监听
        this.listener.remove();
    }

    _addListener = (e) => {
        this.refs.FlatList.scrollToIndex({animated: true, index: e-1})
        /*this.setState({
            cell:e-1
        })*/
        this.props.listcar.setCell(e-1)
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
        fontSize: pxToDp(14),
        fontFamily: 'Microsoft Yahei',
    },

})

export default LeftFlatList