import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const dropdownStyles = createThemedStyles((theme, scalingMetrics) => {
  const {scaleSize, moderateScale} = scalingMetrics;
  const {colors} = theme;
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      padding: 16,
    },
    placeholder: {
      color: colors.black,
    },
    focusDd: {
      borderColor: colors.gray800,
    },
    dropdown: {
      height: scaleSize(50),
      paddingHorizontal: scaleSize(6),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
    },
    ddValue: {
      fontSize: moderateScale(14),
      color: colors.black,
    },
    dropdownList: {
      top: scaleSize(55),
      minWidth: '100%',
      paddingHorizontal: scaleSize(10),
      elevation: 2,
      borderWidth: 0.1,
      position: 'absolute',
      zIndex: 4,
      backgroundColor: colors.white,
      gap: scaleSize(10),
    },
    data: {
      backgroundColor: colors.white,
      padding: scaleSize(6),
      width: '100%',
      paddingRight: scaleSize(25),
    },
    dataText: {
      flex: 1,
      color: colors.black,
      fontSize: moderateScale(16),
    },
  });
});
