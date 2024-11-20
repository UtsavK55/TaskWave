import {createThemedStyles} from '@hooks/useTheme';

export const headerStyles = createThemedStyles((theme, scalingMetrics) => {
  const {backgrounds, layout, fonts, gutters, borders} = theme;
  const {moderateScale, scaleSize} = scalingMetrics;
  return {
    container: [
      layout.row,
      layout.justifyBetween,
      layout.itemsCenter,
      backgrounds.blue700,
    ],
    leftNodeStyle: [
      layout.flex_1,
      {paddingVertical: scaleSize(16), paddingLeft: scaleSize(16)},
    ],
    titleContainer: [layout.flex_1, {paddingVertical: scaleSize(16)}],
    title: [
      fonts.alignCenter,
      fonts.bold,
      {fontSize: moderateScale(16)},
      fonts.fixedWhite,
    ],
    rightNodeStyle: [
      layout.flex_1,
      layout.itemsEnd,
      {paddingVertical: scaleSize(16), paddingRight: scaleSize(16)},
    ],
    bottomBorder: [borders.wBottom_1, layout.fullWidth, borders.gray100],
  };
});
