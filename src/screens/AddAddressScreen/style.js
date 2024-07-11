import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { sizes, spacing } from '../../constants'
import { fonts } from '../../constants/fonts'
import { colors } from '../../constants/colors'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: spacing.lg,
      },
      viewBody: {
        marginTop: sizes.size26,
      },
      title: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: colors.text_black2B,
        fontFamily: fonts.rlw_medium,
      },
      pickerContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: spacing.xl,
      },
      label: {
        fontSize: sizes.size16,
        fontFamily: fonts.rlw_medium,
        color: colors.text_black,
        marginBottom: spacing.sm,
      },
      press: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: colors.primary,
       
      },
      textPress: {
        color: colors.background_primary,
        textAlign: 'center',
        fontSize: sizes.size16,
        fontFamily: fonts.rlw_bold,
        paddingVertical: spacing.md,
      },
  });
  