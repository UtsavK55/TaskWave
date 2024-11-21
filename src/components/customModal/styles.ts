import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const customModalStyles = createThemedStyles((theme, scalingMetrics) => {
  const {hp, wp, scaleSize} = scalingMetrics;
  const {colors} = theme;
  return StyleSheet.create({
    overlay: {
      width: wp(100),
      height: hp(100),
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.transparent,
      paddingVertical: wp(20),
    },

    modalContent: {
      width: wp(80),
      backgroundColor: colors.white,
      shadowColor: 'black',
      shadowRadius: 4,
      shadowOffset: {height: 4, width: 0},
      shadowOpacity: 0.5,
    },

    closeButton: {
      marginTop: scaleSize(10),
      textAlign: 'center',
    },
  });
});
