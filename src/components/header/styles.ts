import {createThemedStyles} from '@hooks/useTheme';

export const headerStyles = createThemedStyles((theme: ThemeContext) => {
  const {backgrounds, layout, fonts, gutters, borders} = theme;

  return {
    container: [
      layout.row,
      layout.justifyBetween,
      layout.itemsCenter,
      backgrounds.blue700,
    ],
    leftNodeStyle: [
      layout.flex_1,
      gutters.paddingLeft_16,
      gutters.paddingVertical_16,
    ],
    titleContainer: [layout.flex_1, gutters.paddingVertical_16],
    title: [fonts.alignCenter, fonts.bold, fonts.size_16, fonts.white],
    rightNodeStyle: [
      layout.flex_1,
      layout.itemsEnd,
      gutters.paddingRight_16,
      gutters.paddingVertical_16,
    ],
    bottomBorder: [borders.wBottom_1, layout.fullWidth, borders.gray100],
  };
});
