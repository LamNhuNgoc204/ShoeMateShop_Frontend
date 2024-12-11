import {Dimensions, StyleSheet} from 'react-native';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';

const {width, height} = Dimensions.get('window');
const productWidth = (width - 60) / 2;

const productStyle = StyleSheet.create({
    container: {
        width: productWidth,
        borderRadius: 20,
        backgroundColor: colors.background_primary,
        elevation: 2,
        marginBottom: 20
    },
    container1: {
        width: productWidth,
        // borderRadius: 20,
        // backgroundColor: colors.background_primary,
        // elevation: 2,
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    text14: {
        fontFamily: fonts.pp_medium,
        fontSize: 14,
        color: colors.text_black00
    },
    icon14: {
        width: 14,
        height: 14
    },
    review: {
        fontFamily: fonts.pp_medium,
        fontSize: 12,
        color: colors.text_grayA1
    },
    dolar: {
        fontFamily: fonts.pp_medium,
        fontSize: 14,
        color: colors.light_pink
    },
    icon21: {
        width: 21,
        height: 21
    },
    contentContainer: {
        padding: 20
    },
    marginTop5: {
        marginTop: 5
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    maxWidth100:{
        maxWidth: "100%"
    },
    marginRight20: {
        marginRight: 20
    }
    
})

export default productStyle;
