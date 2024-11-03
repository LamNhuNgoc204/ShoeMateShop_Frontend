import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import toolBarStyle from "../../components/ToolBar/style";
import { fonts } from "../../constants/fonts";

const messageScreenStyle = StyleSheet.create({
    container: {
        backgroundColor: colors.colorF9F9F9
    },
    toolBarStyle: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    image40: {
        width:  40,
        height:  40,
        resizeMode: 'cover',
        borderRadius: 20
    },
    imageWrapper: {
        width:  44,
        height:  44,
        borderRadius: 22,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    toolBarContentCOntainer: {
        flex:  1,
        alignItems: 'center'
    },
    marginLeft15: {
        marginLeft: 15
    },
    name: {
        fontSize: 20,
        fontFamily: fonts.rlw_bold,
        lineHeight: 23,
        color: colors.blue004BFE
    },
    role: {
        fontFamily: fonts.rlw_medium,
        fontSize: 14,
        color: colors.text_black1A,
        lineHeight: 18
    },
    icon16:{
        width:  16,
        height:  16,
        resizeMode: 'contain'
    },
    messageItem: {
        backgroundColor: colors.blue004BFE,
        maxWidth:  220,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'baseline',
    },
    messageContent: {
        color: 'white',
        fontFamily: fonts.rlw_medium,
        fontSize: 12,
        lineHeight:  19,
        fontSize: 16
    },
    marginTop10:{
        marginTop:0,
        marginBottom: 10,
    },
    customerMessageItem: {
        backgroundColor: "#FFFFFF",
        alignSelf: 'flex-end'
        
    },
    customerMessageContent: {
        color: colors.text_black1A
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.colorE5EBFC,
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    input: {
        flex:  1,
        fontSize:  16, 
        lineHeight: 20
    },
    icon26: {
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
    hide: {
        display: 'none'
    }
})


export default messageScreenStyle;