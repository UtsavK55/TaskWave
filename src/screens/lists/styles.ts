import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '@constants';
import {createThemedStyles} from '@hooks/useTheme';

export const listStyles = createThemedStyles((theme: ThemeContext) => {
  const {backgrounds, layout, fonts, gutters, borders} = theme;
  const styles = StyleSheet.create({
    cardContainer: {
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 5,
    },
    listContainer: {
      width: windowWidth * 0.8,
    },
  });

  return {
    cardContainer: [
      styles.cardContainer,
      backgrounds.white,
      gutters.marginVertical_8,
      borders.rounded_8,
      borders.w_1,
      borders.gray100,
    ],
    cardTitle: [fonts.black, gutters.padding_12],
    imageBg: [layout.flex_1, layout.justifyCenter],
    listContainer: [gutters.margin_12, styles.listContainer],
    listChildContainer: [
      backgrounds.gray50,
      gutters.paddingVertical_8,
      gutters.paddingHorizontal_12,
      borders.rounded_8,
    ],
    listTitle: [
      fonts.black,
      fonts.size_16,
      gutters.paddingTop_4,
      gutters.paddingBottom_12,
      fonts.semiBold,
    ],
    addList: [fonts.alignCenter, fonts.blue700, fonts.bold, gutters.paddingVertical_8],
    input: [
      borders.wBottom_1,
      borders.blue700,
      fonts.size_16,
      gutters.paddingVertical_4,
    ],
    addCard: [fonts.blue700, gutters.marginTop_8],
  };
});
