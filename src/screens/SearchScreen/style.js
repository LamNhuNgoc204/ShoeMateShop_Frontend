import { StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

const searchStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    marginTop16: {
        marginTop: 16
    },
    searchTitle: {
        fontFamily: fonts.rlw_medium,
        fontSize:18,
        color: colors.text_black2B,
        lineHeight: 22
    }
})

export default searchStyle;