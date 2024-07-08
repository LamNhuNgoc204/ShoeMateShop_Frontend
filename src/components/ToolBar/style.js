import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";

const toolBarStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    marginRight20: {
        marginRight: 20
    },
    icon35: {
        width: 35,
        height: 35,
        elevation: 2,
        backgroundColor: "#fff",
        borderRadius: 35
    },
    marginLeft20: {
        marginLeft: 20
    },
    hide: {
        display: 'none'
    },
    title: {
        fontFamily: fonts.rlw_semibold,
        fontSize: 20,
        lineHeight: 20,
        color: colors.text_black2B
    },
    view35: { width: 35, height: 35 }

})


export default toolBarStyle;