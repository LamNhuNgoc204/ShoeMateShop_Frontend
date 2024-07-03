import { Dimensions, StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";


const { width, height } = Dimensions.get('window');

const onBoardStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    onboardBg: {
        width,
        height,
        resizeMode: 'cover'
    },

    contentContainer: {
        alignItems: 'center',
        position:'absolute',
        left: 20,
        right: 20,
        bottom: 20
    },
    indicator: {
        width: 118,
        height: 5,
        resizeMode: 'contain',
        marginBottom: 60
    },
    title: {
        fontFamily: fonts.rlw_bold,
        fontSize:  34,
        color: colors.white_EC,
        lineHeight: 44,
        marginBottom:  12,
        textAlign: 'center'
    },
    content: {
        fontFamily: fonts.pp_regular,
        fontSize: 16,
        lineHeight: 24,
        color: colors.white_D8,
        marginBottom:  30,
        textAlign: 'center'
    }
});

export default onBoardStyle;