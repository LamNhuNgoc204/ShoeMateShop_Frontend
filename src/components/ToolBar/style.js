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
    searchContainer: {
        flex: 1,
        backgroundColor: colors.background_primary,
        borderRadius: 14,
        flexDirection: 'row',
        height: 35,
        alignItems: "center",
        elevation: 2
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 12,
        fontFamily: fonts.rlw_medium,
        color: colors.text_black
    },
    icon15: {
        width: 15,
        height: 15,
        marginLeft: 20
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
        fontFamily: fonts.rlw_medium,
        fontSize: 16,
        lineHeight:20,
        color: colors.text_black1A
    }

})


export default toolBarStyle;