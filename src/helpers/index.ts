import {Animated, Platform} from 'react-native';

import {API_KEY} from '@network/apiConstant';

export const isAndroid = Platform.OS === 'android';

export const animatedTransform = (
  scale?: Animated.Value,
  translateY?: Animated.Value,
  rotate?: Animated.Value,
) => {
  const transforms = [];

  if (scale) transforms.push({scale});
  if (translateY) transforms.push({translateY});
  if (rotate)
    transforms.push({
      rotate: rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    });

  return transforms;
};

export const startAnimation = (
  anim: Animated.Value,
  toValue: number,
  duration: number,
  afterAnim?: () => void,
) => {
  Animated.timing(anim, {
    toValue: toValue,
    duration: duration,
    useNativeDriver: true,
  }).start(afterAnim ? () => afterAnim() : () => {});
};

export const truncateText = (text: string, maxLength: number): string => {
  return text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export const appendAuthParams = (url: string, token: string): string => {
  return `${url}key=${API_KEY}&token=${token}`;
};

export const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  const firstInitial = nameParts[0].charAt(0).toUpperCase(); // First letter of the first name
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : ''; // First letter of the last name
  return firstInitial + (lastInitial ? `${lastInitial}` : ''); // Return initials (e.g. "J.D.")
};
