import {useEffect, useState} from 'react';
import {Animated, View} from 'react-native';

import {animatedCircleStyles} from './styles';

const AnimatedCircle = ({
  scaleValue,
  opacity,
  imageOpacity,
  imageSource,
  radius,
}: AnimatedCircleProps) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prevAngle => (prevAngle + 3) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const xPosition = radius * Math.cos((angle * Math.PI) / 180);
  const yPosition = radius * Math.sin((angle * Math.PI) / 180);
  const styles = animatedCircleStyles(scaleValue);

  return (
    <View style={styles.circleContainer}>
      <Animated.View style={[styles.circleBoundary, {opacity: opacity}]} />
      <Animated.Image
        source={imageSource}
        style={[
          styles.image,
          {
            transform: [{translateX: xPosition}, {translateY: yPosition}],
            opacity: imageOpacity,
          },
        ]}
      />
    </View>
  );
};

export default AnimatedCircle;
