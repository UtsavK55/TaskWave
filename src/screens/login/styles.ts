import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const loginStyles = createThemedStyles(
  (theme, scalingMetrics, scale, value, translateY, fadeAnim) => {
    const {hp, wp, scaleSize, moderateScale, isLandscape} = scalingMetrics;
    const {layout, colors} = theme;
    return StyleSheet.create({
      image: {
        width: wp(33),
        height: wp(33),
        borderRadius: scaleSize(70),
        backgroundColor: colors.white,
        paddingVertical: scaleSize(12),
      },
      container: {...layout.flex_1, ...layout.col},
      topContainer: {
        flex: 6,
        backgroundColor: colors.blue700,
        ...layout.itemsCenter,
        ...layout.justifyCenter,
      },
      imageContainer: {
        ...layout.row,
        ...layout.justifyCenter,
      },
      childContainer: {
        ...layout.itemsCenter,
        ...layout.justifyCenter,
        position: 'absolute',
        top: isLandscape() ? wp(25) : wp(50),
      },
      appTitle: {
        textAlign: 'center',
        fontSize: moderateScale(24),
        fontWeight: 'semibold',
        marginVertical: scaleSize(24),
      },
      infoContainer: {
        backgroundColor: colors.white,
        flex: 1,
      },
      info: {
        textAlign: 'center',
        color: colors.fixedWhite,
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        position: 'absolute',
        bottom: wp(15),
        marginHorizontal: scaleSize(24),
      },
      buttonText: {
        borderWidth: 1,
        borderColor: colors.fixedblue700,
        textAlign: 'center',
        marginHorizontal: scaleSize(40),
        marginTop: isLandscape() ? scaleSize(10) : scaleSize(20),
        paddingVertical: scaleSize(12),
        color: colors.fixedblue700,
        borderRadius: scaleSize(4),
        fontWeight: 'bold',
        fontSize: moderateScale(14),
      },
      termText: {
        textAlign: 'center',
        color: colors.fixedWhite,
        position: 'absolute',
        bottom: wp(8),
        fontSize: moderateScale(14),
      },
      formContainer: {
        height: hp(40),
        ...layout.fullWidth,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: scaleSize(20),
        borderTopRightRadius: scaleSize(20),
        zIndex: 10000,
        paddingHorizontal: scaleSize(24),
      },
      input: {
        backgroundColor: colors.white,
        marginTop: scaleSize(24),
      },
      submit: {marginTop: scaleSize(24)},
    });
  },
);
