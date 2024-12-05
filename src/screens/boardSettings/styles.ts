import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const settingStyles = createThemedStyles((theme, scalingMetrics) => {
  const {colors, backgrounds, layout} = theme;
  const {wp, hp, scaleSize, moderateScale, isLandscape} = scalingMetrics;

  const styles = StyleSheet.create({
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
    image: {width: wp(100), height: hp(30), marginVertical: '50%'},
  });

  return {
    boardCardContainer: [
      layout.row,
      layout.flex_1,
      {
        marginTop: scaleSize(12),
        marginHorizontal: scaleSize(8),
        gap: scaleSize(24),
        alignItems: 'center',
        padding: scaleSize(4),
        borderRadius: scaleSize(4),
      },
    ],
    image: [styles.image],
    boardCardTitle: [
      {fontSize: moderateScale(16)},
      {fontWeight: 'bold'},
      {color: colors.black},
    ],
    addIcon: [
      backgrounds.blue700,
      layout.absolute,
      styles.addIcon,
      {padding: scaleSize(12), borderRadius: scaleSize(32)},
    ],
    cardContainer: [
      styles.cardContainer,
      backgrounds.gray50,
      {
        marginVertical: scaleSize(8),
        marginHorizontal: scaleSize(12),
        borderRadius: scaleSize(8),
        borderWidth: scaleSize(1),
        borderColor: colors.gray100,
        flexDirection: 'row' as 'row',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between' as 'space-between',
      },
    ],
    cardTitle: [{color: colors.black, padding: scaleSize(12)}],
    initials: [
      {
        color: colors.fixedWhite,
        fontWeight: 'bold' as 'bold',
        flex: 1,
        fontSize: moderateScale(16),
        width: wp(11),
        height: wp(11),
        borderRadius: scaleSize(35),
        padding: scaleSize(10),
        textAlign: 'center' as 'center',
      },
    ],
    memberContainer: [
      layout.row,
      {marginTop: scaleSize(12), gap: scaleSize(14)},
    ],
    infoContainer: {
      flex: 10,
      marginTop: scaleSize(2),
      gap: scaleSize(2),
    },
    info1: [{color: colors.gray800, fontSize: moderateScale(18)}],
    info2: [{color: colors.gray800, fontSize: moderateScale(14)}],
    removeContainer: {
      flex: 3,
      ...layout.justifyCenter,
    },
    remove: [{color: colors.red500}, {opacity: 0.9}],
    container: {
      backgroundColor: colors.white,
      marginTop: scaleSize(20),
      padding: scaleSize(10),
      ...layout.row,
      gap: scaleSize(10),
    },
    childContainer: {
      flex: 9,
      marginTop: scaleSize(4),
    },
    sectionTitle: [{color: colors.gray400, fontSize: moderateScale(20)}],
    invite: [
      {
        backgroundColor: colors.fixedblue700,
        textAlign: 'center' as 'center',
        marginHorizontal: scaleSize(20),
        marginVertical: isLandscape() ? scaleSize(10) : scaleSize(20),
        paddingVertical: scaleSize(8),
        color: colors.fixedWhite,
        borderRadius: scaleSize(4),
        fontWeight: 'bold' as 'bold',
        fontSize: moderateScale(14),
        elevation: 3,
        shadowOpacity: 0.4,
        shadowRadius: scaleSize(4),
      },
    ],
  };
});
