import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const drawerStyles = createThemedStyles((theme, scalingMetrics) => {
  const {wp, scaleSize, moderateScale} = scalingMetrics;
  const {colors, backgrounds, fonts, layout} = theme;
  
  return StyleSheet.create({
    container: {
      padding: scaleSize(20),
      backgroundColor: colors.blue700,
    },
    initials: {
      ...fonts.fixedWhite,
      ...fonts.bold,
      fontSize: moderateScale(20),
      ...backgrounds.orange,
      width: wp(15),
      height: wp(15),
      borderRadius: scaleSize(35),
      padding: scaleSize(15),
      ...fonts.alignCenter,
    },
    fullName: {
      marginTop: scaleSize(12),
      ...fonts.fixedWhite,
      ...fonts.bold,
    },
    userInfo: {
      marginTop: scaleSize(4),
      ...fonts.fixedWhite,
    },
    logout: {
      ...layout.absolute,
      right: scaleSize(16),
      top: scaleSize(24),
    },
    itemTitle: {
      fontSize: moderateScale(16),
      marginLeft: scaleSize(10),
      ...fonts.black,
    },
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: scaleSize(16),
    },
    activeItem: {
      backgroundColor: colors.gray50,
    },
    drawerItemText: {
      fontSize: moderateScale(16),
      marginLeft: scaleSize(10),
    },
    activeText: {
      color: colors.blue700,
    },
  });
});
