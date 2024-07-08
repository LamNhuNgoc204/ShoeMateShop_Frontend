import { StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

const categoryDetailStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    marginTop16: {
        marginTop: 16
    },
    textContainer: {
        flex: 1,
        fontFamily: fonts.pp_bold,
        fontSize: 30,
        lineHeight: 32,
        color: colors.text_black2B
    },
    subContent: {
        fontFamily: fonts.pp_regular,
        fontSize: 16
    },
    icon52: {
        width: 52,
        height: 52
    }
})


export default categoryDetailStyle;