import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@hooks/useTheme';

export const animatedCircleStyles = createThemedStyles(
  (theme, scalingMetrics, scale) => {
    const {hp, wp, scaleSize} = scalingMetrics;
    const {colors} = theme;
    return StyleSheet.create({
      circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      },
      circleBoundary: {
        borderWidth: 2,
        width: wp(93),
        height: wp(93),
        borderRadius: scaleSize(190),
        borderColor: colors.white,
        position: 'absolute',
        transform: [{scale: scale}],
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: wp(10),
        height: wp(10),
        position: 'absolute',
        transform: [{scale: scale}],
      },
    });
  },
);
