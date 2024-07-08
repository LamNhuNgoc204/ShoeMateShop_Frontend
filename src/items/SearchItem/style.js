import { StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

const searchItemStyle = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon16: {
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    icon14: {
        width: 14,
        height: 14,
        resizeMode: 'contain'
    },
    searchContent: {
        fontFamily: fonts.rlw_medium,
        fontSize: 14,
        lineHeight: 16,
        color: colors.text_black2B,
        marginLeft: 20,
        flex: 1

    }
})


export default searchItemStyle;