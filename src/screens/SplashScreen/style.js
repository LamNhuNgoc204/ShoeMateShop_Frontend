import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const splashStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background_blue
    },
    logo: {
        width: 208,
        height: 130,
        resizeMode: 'contain'
    }
})

export default splashStyle;