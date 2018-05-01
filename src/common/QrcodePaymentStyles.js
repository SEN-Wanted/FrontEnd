import {StyleSheet} from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
    view_menu_container:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:16
    },
    view_menu_item_container:{
        justifyContent:'center',
        alignItems:'center',
    },
    image_bottom_menu_default:{
        height:45,
        width:45,
        marginBottom:5,
    },
    image_bottom_menu:{
        height:45,
        width:45,
        marginBottom:5,
    },
    text_menu_title_default:{
        color: '#03A9F4',
        fontSize: 14,
        fontFamily: 'italic',
        textAlign: "center",
    },
    text_menu_title:{
        color: '#CDD3DB',
        fontSize: 14,
        fontFamily: 'italic',
        textAlign: "center",
    },
})