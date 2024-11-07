import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '@constants';
import {createThemedStyles} from '@hooks/useTheme';

export const loginStyles = createThemedStyles((theme: ThemeContext) => {
  const {backgrounds, layout, fonts, gutters, borders} = theme;
  const styles = StyleSheet.create({
    image: {
      width: windowWidth * 0.33,
      height: windowHeight * 0.15,
    },
  });

  return {
    container: [layout.flex_1, backgrounds.blue700],
    welcomeTitle: [
      fonts.alignCenter,
      gutters.marginTop_80,
      fonts.white,
      fonts.bold,
      fonts.size_40,
    ],
    imageContainer: [layout.row, layout.justifyCenter, gutters.marginTop_40],
    image: [
      styles.image,
      borders.rounded_70,
      backgrounds.white,
      gutters.paddingVertical_12,
    ],
    appTitle: [
      fonts.alignCenter,
      fonts.white,
      fonts.size_24,
      fonts.semibold,
      gutters.marginVertical_12,
    ],
    infoContainer: [backgrounds.white, layout.fullHeight, gutters.marginTop_80],
    info: [
      fonts.alignCenter,
      fonts.black,
      fonts.size_24,
      fonts.bold,
      gutters.marginTop_32,
      gutters.paddingHorizontal_32,
    ],
    buttonText: [
      borders.w_1,
      borders.blue700,
      fonts.alignCenter,
      gutters.marginHorizontal_40,
      gutters.marginTop_80,
      gutters.paddingVertical_12,
      fonts.blue700,
      borders.rounded_4,
      fonts.bold,
    ],
    termText: [
      fonts.alignCenter,
      fonts.gray800,
      gutters.marginTop_24,
      gutters.paddingHorizontal_40,
    ],
  };
});
