import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '@constants';
import {createThemedStyles} from '@hooks/useTheme';

export const boardStyles = createThemedStyles((theme: ThemeContext) => {
  const {colors, backgrounds, layout, fonts, gutters, borders} = theme;
  const styles = StyleSheet.create({
    image: {
      width: windowWidth * 0.15,
      height: windowHeight * 0.05,
    },
    addIcon: {
      bottom: 24,
      right: 24,
      elevation: 3,
      shadowOpacity: 0.7,
      shadowRadius: 4,
      color: colors.white,
    },
  });

  return {
    cardContainer: [
      layout.row,
      layout.flex_1,
      gutters.marginTop_12,
      gutters.marginHorizontal_4,
      gutters.gap_24,
      layout.itemsCenter,
      gutters.padding_4,
      borders.rounded_4,
    ],
    image: [styles.image, borders.rounded_4],
    cardTitle: [fonts.size_16, fonts.black],
    addIcon: [
      backgrounds.blue700,
      layout.absolute,
      styles.addIcon,
      gutters.padding_12,
      borders.rounded_32,
    ],
  };
});
