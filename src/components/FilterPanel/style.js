import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";

const { width, height } = Dimensions.get('window')
const filterPanelStyle = StyleSheet.create({
    container: {
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.2
    },
    panel: {
        width: '70%',
        height: height,
        backgroundColor: colors.primary,
        position: 'absolute',
        right: 0,
        padding: 20
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.rlw_semibold,
        color: 'white',
        width: '100%',
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: fonts.rlw_medium,
        fontSize: 16,
        color: 'white',
        marginVertical: 16
    },
    icon34: {
        width: 38,
        height: 38,
        resizeMode: 'contain'
    },
    view44: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        marginRight: 10,
        marginBottom: 16
    },
    priceFilterConTainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    priceInput: {
        flex: 1,
        height: 35,
        borderRadius: 8,
        backgroundColor: "#F7F6F6",
        paddingHorizontal: 10
    },
    icon12: {
        width: 12,
        height: 12,
        resizeMode: 'contain'
    },
    minus: {
        fontFamily: fonts.rlw_medium,
        fontSize: 16,
        color: 'white',
    },
    wrapContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    viewStar: {
        height: 30,
        width: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        marginRight:  16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 12
    },
    star: {
        width: 12,
        height: 12,
        resizeMode: 'cover'
    },
    startText: {
        fontSize: 12,
        color: 'black',
        marginRight: 5,
        fontFamily: fonts.pp_medium
    },
    button: {
        backgroundColor: 'white',
        marginBottom:  20
    },
    textButton: {
        color: 'black'
    },
    spacer: {
        flex: 1
    },
    hide: {
        display: 'none'
    },
    selected: {
        backgroundColor: colors.blue66EDFF
    },
    icon24: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    closeBtn: {
        width: 24,
        height: 24,
        top: 20,
        right: 20,
        position:'absolute',
        backgroundColor: 'red'
    },
    buttonClose: {
        backgroundColor: 'red',
        marginBottom:  20
    },
    textButtonClose: {
        color: 'white'
    },
})


export default filterPanelStyle;