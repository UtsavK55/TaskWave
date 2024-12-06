import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '@constants';
import {createThemedStyles} from '@hooks/useTheme';

export const cardStyles = createThemedStyles((theme: ThemeContext) => {
  const {backgrounds, layout, fonts, gutters, borders} = theme;
  const styles = StyleSheet.create({
    image: {width: windowWidth, height: windowHeight * 0.3},
    input: {width: windowWidth * 0.85},
  });

  return {
    imageContainer: [layout.row, layout.justifyCenter],
    image: styles.image,
    cardTitle: [
      fonts.size_20,
      fonts.bold,
      fonts.gray800,
      gutters.marginHorizontal_12,
      fonts.alignCenter,
      gutters.marginTop_40,
    ],
    listContainer: [
      layout.row,
      layout.justifyBetween,
      gutters.marginTop_24,
      gutters.paddingRight_24,
      layout.itemsCenter,
      gutters.paddingLeft_12,
      gutters.paddingVertical_4,
      // borders.wBottom_1,
      // borders.gray100,
    ],
    listChildContainer: [layout.row, layout.itemsCenter],
    listTitle: [fonts.gray400, fonts.bold, gutters.marginLeft_8, fonts.size_16],
    listLabel: [fonts.gray400, fonts.size_16, gutters.marginLeft_8],
    move: [fonts.fixedblue700, fonts.semiBold, fonts.size_16],
    descContainer: [
      layout.row,
      layout.itemsCenter,
      gutters.paddingVertical_24,
      gutters.paddingLeft_12,
    ],
    input: [
      borders.wBottom_1,
      borders.gray800,
      gutters.marginHorizontal_8,
      gutters.paddingBottom_4,
      styles.input,
      fonts.black,
    ],
    border: [backgrounds.gray100, fonts.size_4],
    dateContainer: [
      layout.row,
      layout.itemsCenter,
      gutters.paddingVertical_12,
      gutters.paddingLeft_12,
    ],
    date: [fonts.gray400, fonts.size_16, gutters.marginLeft_8],
    smallBorder: [backgrounds.gray100, fonts.size_1, gutters.marginLeft_40],
  };
});
