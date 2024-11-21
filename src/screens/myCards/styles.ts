import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const myCardStyles = createThemedStyles((theme, scalingMetrics) => {
  const {colors, backgrounds, layout} = theme;
  const {wp, hp, scaleSize, moderateScale} = scalingMetrics;

  const styles = StyleSheet.create({
    image: {
      width: wp(55),
      height: hp(15),
    },
    addIcon: {
      bottom: scaleSize(24),
      right: scaleSize(24),
      elevation: 3,
      shadowOpacity: 0.7,
      shadowRadius: scaleSize(4),
      color: colors.white,
    },
    cardContainer: {
      shadowOffset: {width: 0, height: scaleSize(1)},
      shadowOpacity: 0.1,
      shadowRadius: scaleSize(1),
      elevation: 5,
    },
  });

  return {
    container: [
      backgrounds.gray50,
      {
        paddingVertical: scaleSize(8),
        paddingHorizontal: scaleSize(12),
        margin: scaleSize(12),
        borderRadius: scaleSize(8),
      },
    ],
    boardCardContainer: {
      ...layout.flex_1,
      marginTop: scaleSize(12),
      marginHorizontal: scaleSize(8),
      gap: scaleSize(12),
      padding: scaleSize(4),
      borderRadius: scaleSize(4),
      alignItems: 'center' as 'center',
    },

    image: [styles.image, {borderRadius: scaleSize(4)}],
    boardCardTitle: {
      fontSize: moderateScale(16),
      fontWeight: 'bold' as 'bold',
      color: colors.black,
    },
    addIcon: [
      backgrounds.blue700,
      layout.absolute,
      styles.addIcon,
      {
        padding: scaleSize(12),
        borderRadius: scaleSize(32),
      },
    ],
    cardContainer: [
      styles.cardContainer,
      backgrounds.fixedWhite,
      {
        marginVertical: scaleSize(8),
        marginHorizontal: scaleSize(12),
        borderRadius: scaleSize(8),
        borderWidth: scaleSize(1),
        borderColor: colors.gray100,
      },
    ],
    cardTitle: [{color: colors.black}, {padding: scaleSize(12)}],
  };
});
