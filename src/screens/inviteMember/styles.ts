import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const inviteMemberStyles = createThemedStyles(
  (theme, scalingMetrics) => {
    const {hp, wp, scaleSize, moderateScale} = scalingMetrics;
    const {colors, layout, fonts} = theme;
    return StyleSheet.create({
      memberCardContainer: {
        ...layout.row,
        marginTop: moderateScale(12),
        gap: moderateScale(14),
        marginHorizontal: moderateScale(24),
        flex: 1,
      },
      memberInitials: {
        color: colors.fixedWhite,
        fontWeight: 'bold',
        flex: 1,
        fontSize: moderateScale(16),
        width: wp(11),
        height: wp(11),
        borderRadius: scaleSize(35),
        padding: scaleSize(10),
        textAlign: 'center',
      },

      memberInfoContainer: {
        flex: 10,
        marginTop: moderateScale(2),
        gap: moderateScale(2),
      },
      memberFullName: {
        fontSize: moderateScale(18),
        color: colors.gray800,
      },
      memberUsername: {
        fontSize: moderateScale(14),
        color: colors.gray400,
      },
      addButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(12),
        marginHorizontal: moderateScale(20),
        marginVertical: moderateScale(12),
        marginBottom: moderateScale(16),
      },
      searchInput: {
        flex: 1,
        height: moderateScale(40),
        color: colors.gray800,
      },
      noDataText: {
        textAlign: 'center',
      },
    });
  },
);
