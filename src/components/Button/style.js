import { StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

const buttonStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: colors.white_EC,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.rlw_bold,
        fontWeight: 'semibold',
        color:  colors.text_black
    }
})


export default buttonStyle;