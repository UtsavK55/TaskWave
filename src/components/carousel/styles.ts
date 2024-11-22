import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const carouselStyles = createThemedStyles((theme, scalingMetrics) => {
  const {colors, layout} = theme;
  const {wp, scaleSize, moderateScale} = scalingMetrics;
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: scaleSize(12),
    },
    flatListContent: {
      paddingRight: scaleSize((wp(100) - wp(45)) / 2),
      paddingLeft: scaleSize(24),
      marginTop: scaleSize(12),
    },
    cardContainer: {height: wp(55)},
    itemContainer: {
      width: wp(45),
      marginHorizontal: scaleSize(4),
      backgroundColor: colors.white,
      borderRadius: scaleSize(10),
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      flex: 2,
      width: '100%',
      borderTopLeftRadius: scaleSize(10),
      borderTopRightRadius: scaleSize(10),
    },
    bottomContainer: {flex: 1, paddingHorizontal: scaleSize(10)},
    title: {
      fontSize: moderateScale(20),
      marginVertical: scaleSize(10),
      fontWeight: 'bold',
      color: colors.gray800,
    },
    infoContainer: {...layout.row, ...layout.justifyBetween},
    info: {color: colors.gray400},
  });
});
