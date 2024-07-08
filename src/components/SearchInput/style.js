import { StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";

const searchInputStyle = StyleSheet.create({

    searchContainer: {
        width: '100%',
        backgroundColor: colors.background_primary,
        borderRadius: 14,
        flexDirection: 'row',
        height: 35,
        alignItems: "center",
        elevation: 2,
        paddingHorizontal: 20,
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
        height: 15
    },
    
})




export default searchInputStyle;