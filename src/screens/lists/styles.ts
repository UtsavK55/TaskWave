import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const listStyles = createThemedStyles((theme, scalingMetrics) => {
  const {backgrounds, layout, fonts, colors} = theme;
  const {wp, scaleSize, moderateScale} = scalingMetrics;

  const styles = StyleSheet.create({
    cardContainer: {
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 5,
      marginVertical: scaleSize(8),
      borderRadius: scaleSize(8),
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.gray100,
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
    },
    listContainer: {
      width: wp(80),
    },
  });

  return {
    cardContainer: [styles.cardContainer],
    cardTitle: [fonts.black, {padding: scaleSize(12)}],
    imageBg: [layout.flex_1, layout.justifyCenter],
    listContainer: [{margin: scaleSize(12)}, styles.listContainer],
    listChildContainer: [
      backgrounds.gray50,
      {
        paddingVertical: scaleSize(8),
        paddingHorizontal: scaleSize(12),
        borderRadius: scaleSize(8),
      },
    ],
    listTitle: [
      fonts.black,
      {
        fontSize: moderateScale(16),
        paddingTop: scaleSize(4),
        paddingBottom: scaleSize(12),
      },
      fonts.semiBold,
    ],
    addList: [
      fonts.alignCenter,
      fonts.fixedblue700,
      fonts.bold,
      {paddingVertical: scaleSize(8)},
    ],
    listAction: [layout.row, layout.itemsCenter, {gap: scaleSize(2)}],
    input: [
      {fontSize: moderateScale(16), paddingVertical: scaleSize(4)},
      fonts.black,
    ],
    addCard: [fonts.fixedblue700, {marginTop: scaleSize(8)}],
    titleContainer: [layout.row, layout.justifyBetween],
    cardActions: [layout.row, {gap: scaleSize(4), marginRight: scaleSize(4)}],
    editAction: [{paddingTop: scaleSize(4), paddingBottom: scaleSize(12)}],
    archiveAction: [{paddingTop: scaleSize(4), paddingBottom: scaleSize(12)}],
    addListContainer: [
      layout.row,
      layout.justifyBetween,
      layout.itemsCenter,
      {paddingHorizontal: scaleSize(8), paddingVertical: scaleSize(4)},
    ],
  };
});
