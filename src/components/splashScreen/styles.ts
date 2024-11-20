import {animatedTransform} from '@src/helpers';
import {createThemedStyles} from '@src/hooks/useTheme';
import {Animated, StyleSheet} from 'react-native';

export const splashStyles = createThemedStyles(
  (theme, scalingMetrics, scale, value, translateY, fadeAnim) => {
    const {colors, layout} = theme;
    const {hp, wp, scaleSize} = scalingMetrics;

    return StyleSheet.create({
      container: {
        ...layout.flex_1,
        ...layout.justifyCenter,
        ...layout.itemsCenter,
        backgroundColor: colors.fixedblue700,
      },
      view1: {
        backgroundColor: colors.white,
        width: wp(66),
        height: hp(30),
        position: 'absolute',
        borderRadius: scaleSize(120),
        transform: animatedTransform(scale),
      },
      imageContainer1: {
        ...layout.justifyCenter,
        ...layout.itemsCenter,
        marginTop: scaleSize(40),
      },
      image1: {
        width: wp(53),
        height: hp(15),
        borderRadius: scaleSize(70),
        paddingVertical: scaleSize(12),
        transform: [...animatedTransform(scale, translateY, value)],
      },
      imageContainer2: {
        opacity: fadeAnim,
        alignItems: 'center',
      },
      image2: {
        width: wp(80),
        height: hp(5),
        transform: [...animatedTransform(new Animated.Value(1), translateY)],
      },
    });
  },
);
