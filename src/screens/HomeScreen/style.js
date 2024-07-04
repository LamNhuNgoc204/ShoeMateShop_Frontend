import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";

const homeStyle = StyleSheet.create({
    container: {
        paddingHorizontal:  20,
        paddingTop: 20
    },
    bannerContainer: {
        width: '100%',
        height: 100,
        borderRadius: 16,
        marginTop:  24
    },
    banner: {
        width:  '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 16
    },
    indicatorDot: {
        width:  10,
        height:  10,
        borderRadius: 10,
        backgroundColor: colors.text_grayC4
    },
    indicatorActiveDot: {
        width:  10,
        height:  10,
        borderRadius: 10,
        backgroundColor: colors.text_black00
    },
    marginRight12: {
        marginRight: 12
    },
    indicator: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },
    categoryIconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: colors.light_blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryImage: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    categoryText: {
        marginTop: 4,
        fontSize: 10,
        fontFamily: fonts.rlw_regular,
        color: colors.text_black00
    },
    categoryItem: {
        alignSelf: 'baseline',
        alignItems: 'center'
    },
    marginRight40: {
        marginRight: 40
    },
    marginBottom15: {
        marginBottom: 15
    },
    marginTop15: {
        marginTop: 15
    },
    scrollContainer: {
        height: 200
    },
    pfyText: {
        fontFamily: fonts.rlw_medium,
        fontSize: 16,
        lineHeight: 20,
        color: colors.text_black00,
        marginBottom:  15
    },
    separator: {
        width: 20,
        height:  20
    }
})


export default homeStyle