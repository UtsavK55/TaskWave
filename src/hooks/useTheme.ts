import {useContext, useMemo} from 'react';
import {ThemeContext} from '@contexts/ThemeProvider';
import useScalingMetrics from './useScalingMetrics';
import {Animated} from 'react-native';

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default useTheme;

export const createThemedStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  styleFunction: ThemedStyleFunction<T>,
) => {
  return (
    scale?: Animated.Value,
    value?: Animated.Value,
    translateY?: Animated.Value,
    fadeAnim?: Animated.Value,
  ) => {
    const theme = useTheme();
    const scalingMetrics = useScalingMetrics();

    return styleFunction(
      theme,
      scalingMetrics,
      scale,
      value,
      translateY,
      fadeAnim,
    );
  };
};
