import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";

const style = StyleSheet.create({
    container: {
        width: 348,
        height: 112,
        justifyContent: 'space-between',
        paddingVertical: '3%',
        paddingHorizontal: '6%'
    },
    svgbg: {
        position: 'absolute'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    voucherTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.color004CFF,
        fontFamily: fonts.rlw_bold,
        lineHeight: 21
    },
    validText: {
        fontSize: 11,
        fontFamily: fonts.rlw_medium,
        color: colors.black,
        padding: 3,
        borderRadius: 2,
        backgroundColor: colors.colorF9F9F9
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    firstPurchase: {
        fontFamily: fonts.rlw_bold,
        fontSize: 17,
        color: colors.color202020,
        marginLeft: 10
    },
    endow: {
        fontFamily: fonts.rlw_semibold,
        fontSize: 12,
        color: colors.black
    },
    bottomView: {
        paddingBottom: 5
    },
    buttonClaimContainer: {
        width: 79,
        height: 26, 
        borderRadius: 6,
        backgroundColor: colors.color004CFF,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonClaimText: {
        fontFamily: fonts.rlw_medium,
        fontSize:  14,
        color: 'white'
    },
    bgClaimed: {
        backgroundColor: colors.colorB7B7B7
    },
    textClaimed: {
        color: 'black'
    }


})


export default style;