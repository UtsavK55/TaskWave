import {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

import {IMAGES} from '@constants/imageConstants';
import useScalingMetrics from '@hooks/useScalingMetrics';
import {startAnimation} from '@helpers';

import {splashStyles} from './styles';

const animate = (
  value: Animated.Value,
  scale: Animated.Value,
  translateY: Animated.Value,
  fadeAnim: Animated.Value,
  toScale: number,
  toTranslate: number,
) => {
  startAnimation(value, 4, 2000);
  startAnimation(scale, toScale, 2000);
  setTimeout(() => {
    startAnimation(translateY, toTranslate, 1000);
    startAnimation(fadeAnim, 1, 1000);
  }, 2000);
};

const SplashScreen = () => {
  const value = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const styles = splashStyles(scale, value, translateY, fadeAnim);
  const {scaleSize} = useScalingMetrics();

  useEffect(() => {
    animate(value, scale, translateY, fadeAnim, scaleSize(1.3), scaleSize(-40));
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.view1} />
      <View style={styles.imageContainer1}>
        <Animated.Image
          source={IMAGES.logoImg}
          resizeMode="contain"
          style={styles.image1}
        />
        <Animated.View style={styles.imageContainer2}>
          <Animated.Image
            source={IMAGES.taskWaveTitle}
            style={styles.image2}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;
