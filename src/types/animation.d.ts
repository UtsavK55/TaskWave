interface AnimatedCircleProps {
  scaleValue: Animated.Value;
  opacity: number;
  imageOpacity: number;
  imageSource: any;
  radius: number;
}

interface CircleBoundary {
  id: number;
  scaleValue: Animated.Value;
  fadeAnim: Animated.Value;
  imageOpacity: Animated.Value;
  imageSource: any[];
}

type CircleBoundaries = CircleBoundary[];
