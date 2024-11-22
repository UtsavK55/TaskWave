import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const boardStyles = createThemedStyles((theme, scalingMetrics) => {
  const {colors, layout} = theme;
  const {hp, wp, scaleSize, moderateScale} = scalingMetrics;
  return StyleSheet.create({
    addIcon: {
      position: 'absolute',
      bottom: scaleSize(24),
      right: scaleSize(24),
      elevation: 3,
      shadowOpacity: 0.7,
      shadowRadius: scaleSize(4),
      backgroundColor: colors.fixedblue700,
      padding: scaleSize(12),
      borderRadius: scaleSize(32),
      color: colors.fixedWhite,
    },
    bottomContainer: {
      height: hp(45),
      ...layout.fullWidth,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      borderTopLeftRadius: scaleSize(16),
      borderTopRightRadius: scaleSize(16),
    },
    sectionTitle: {
      marginTop: scaleSize(10),
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      marginHorizontal: scaleSize(20),
      color: colors.gray800,
    },
    container: {flex: 1, backgroundColor: colors.gray50},
    storyContainer: {
      position: 'absolute',
      width: wp(100),
      height: hp(100),
      backgroundColor: colors.gray100,
      ...layout.col,
      ...layout.itemsCenter,
    },
    progressContainer: {
      width: wp(100),
      height: wp(1.5),
      marginTop: scaleSize(20),
      backgroundColor: colors.gray50,
      ...layout.col,
      ...layout.itemsCenter,
    },
    progress: {
      backgroundColor: colors.gray800,
      width: wp(100),
      height: wp(1),
      position: 'absolute',
      borderRadius: scaleSize(10),
    },
    taskTitle: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      marginHorizontal: scaleSize(20),
      color: colors.gray800,
    },
    list: {
      marginTop: scaleSize(16),
      paddingHorizontal: scaleSize(12),
    },
    storyItemContainer: {
      width: wp(12),
      height: wp(12),
      marginHorizontal: scaleSize(10),
    },
    storyItemImageContainer: {
      width: '100%',
      height: '100%',
      borderRadius: scaleSize(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyItemImage: {
      width: wp(8),
      height: wp(8),
    },
    storyItemBorder: {
      borderWidth: scaleSize(1),
      width: '100%',
      height: '100%',
      borderRadius: scaleSize(190),
      position: 'absolute',
      transform: [{scale: 1.2}],
      justifyContent: 'center',
      alignItems: 'center',
    },
    storyItemTitle: {
      color: colors.gray800,
      fontSize: moderateScale(12),
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: scaleSize(8),
    },
    taskItemContainer: {
      width: wp(30),
      height: wp(35),
      marginHorizontal: scaleSize(10),
      position: 'relative',
      backgroundColor: colors.white,
      borderRadius: scaleSize(10),
      ...layout.flex_1,
      ...layout.itemsCenter,
      shadowOpacity: 0.3,
      shadowRadius: scaleSize(4),
    },
    taskItemBoardContainer: {
      flex: 3,
      width: '100%',
      borderTopLeftRadius: scaleSize(10),
      borderTopRightRadius: scaleSize(10),
      ...layout.justifyCenter,
    },
    taskItemBoardName: {
      color: colors.fixedWhite,
      paddingHorizontal: scaleSize(24),
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    taskItemTitleContainer: {flex: 2, ...layout.justifyCenter},
    taskItemtitle: {
      color: colors.gray800,
      fontSize: moderateScale(16),
      paddingHorizontal: scaleSize(10),
    },
  });
});
