import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const addBoardStyles = createThemedStyles((theme, scalingMetrics) => {
  const {hp, wp, scaleSize, moderateScale} = scalingMetrics;
  const {layout, backgrounds, borders, fonts} = theme;
  return StyleSheet.create({
    container: {margin: scaleSize(12)},
    cardContainer: {
      width: wp(35),
      marginVertical: scaleSize(10),
      marginHorizontal: scaleSize(10),
      position: 'relative',
    },
    image: {
      width: '100%',
      height: hp(10),
      borderRadius: scaleSize(8),
    },
    check: {
      ...layout.absolute,
      top: scaleSize(4),
      right: scaleSize(8),
      ...backgrounds.fixedWhite,
      ...borders.rounded_16,
    },
    sectionTitle: {
      fontsize: moderateScale(16),
      ...fonts.gray800,
      ...fonts.semiBold,
    },
    input: {
      ...borders.wBottom_1,
      ...borders.blue700,
      paddingVertical: scaleSize(4),
      marginTop: scaleSize(4),
      ...fonts.black,
      marginBottom: scaleSize(12),
    },
    list: {...layout.itemsCenter, marginTop: scaleSize(12)},
    buttonText: {
      ...fonts.alignCenter,
      paddingVertical: scaleSize(12),
      marginVertical: scaleSize(12),
      marginHorizontal: scaleSize(40),
      ...borders.rounded_4,
      ...fonts.bold,
      elevation: 3,
      shadowOpacity: 0.2,
      shadowRadius: scaleSize(4),
    },
  });
});
