import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, SectionList, DeviceEventEmitter, Dimensions,} from 'react-native'

import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import screen from '../../common/screen'
import color from '../../widget/color'
import FoodListItem from './FoodListItem'
var {width,height} = Dimensions.get('window');

type Props = {
    data: Array<Object>,
}

type State = {

}
class RightSectionList extends PureComponent <Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            sectionData:this.props.data
        };

        this.getItemLayout = sectionListGetItemLayout({
            // The height of the row with rowData at the given sectionIndex and rowIndex
            getItemHeight: (rowData, sectionIndex, rowIndex) => 110,
      
            // These three properties are optional
           // getSeparatorHeight: () => 1,// / PixelRatio.get(), // The height of your separators
            getSectionHeaderHeight: () => 35, // The height of your section headers
           // getSectionFooterHeight: () => 10, // The height of your section footers
         //   listFooterHeight:200,
          })
    }

    renderItem = (item) => {
        return (
            <FoodListItem info={item.item} />
        )
    }
    //头
    sectionComp = (section) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{color:'black',fontSize:17,paddingLeft:10}}>{section.section.title}</Text>
            </View>
        )
    }

    render() {
  
        return (
            <SectionList
                ref='sectionList'
                style={{width:width-80}}
                renderSectionHeader={(section)=>this.sectionComp(section)} //头
                renderItem={(item)=>this.renderItem(item)} //行
              //  ItemSeparatorComponent = {()=>{return(<View style={{height:1,backgroundColor:'black'}}/>)}}//分隔线
                sections={this.state.sectionData} //数据
                onViewableItemsChanged = {(info)=>this.itemChange(info)}  //滑动时调用
             //   ListFooterComponent={() => (<Text style={styles.footerText}>没有更多啦</Text>)}
                getItemLayout={this.getItemLayout}
                keyExtractor={(item,index) => index+''}
            />
          
        );
    }

    componentDidMount() {
        //收到监听
        this.listener = DeviceEventEmitter.addListener('left',(e)=>{
            this.refs.sectionList.scrollToLocation({
                sectionIndex:e,
                itemIndex: 0,
                viewPosition: 0,
                viewOffset: 35,
            })
        });
    }

    componentWillUnmount(){
        // 移除监听
        this.listener.remove();
    }

    itemChange = (info)=>{

        let {title,id}= info.viewableItems[0].item
        var reg = new RegExp("^[0-9]*$");
        if (reg.test(id)) {
            DeviceEventEmitter.emit('right',id); //发监听
        }
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        height:35,
        flexDirection: 'row',
        backgroundColor:'white',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:10,
    },
    footerText: {
        flex:1,
        maxHeight:200,
        color:'black',
        fontSize: 20,
        backgroundColor:'white',
    },

});

export default RightSectionList