import type layout from '@theme/layout';

declare global {
  type Theme = {
    backgrounds: Backgrounds;
    borders: Borders;
    colors: Colors;
    fonts: Fonts;
    gutters: Gutters;
    layout: typeof layout;
    variant: Variant;
  };

  type ScalingMetrics = {
    horizontalScale: (size: number) => number;
    verticalScale: (size: number) => number;
    moderateScale: (size: number, factor?: number) => number;
    wp: (widthPercent: number | string) => number;
    hp: (heightPercent: number | string) => number;
    scaleSize: (size: number, factor?: number) => number;
    isLandscape: () => boolean;
  };

  type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

  type ThemedStyleFunction<T> = (
    theme: ThemeContext,
    scalingMetrics: ScalingMetrics,
    scale?: Animated.Value,
    value?: Animated.Value,
    translateY?: Animated.Value,
    fadeAnim?: Animated.Value,
  ) => T;
}
