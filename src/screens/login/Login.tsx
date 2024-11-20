import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';

import AnimatedCircle from '@components/animatedCircle';
import BaseContainer from '@components/baseContainer';
import ShowToast from '@components/showToast';
import {imageArray, IMAGES} from '@constants/imageConstants';
import useScalingMetrics from '@hooks/useScalingMetrics';
import {startAnimation} from '@helpers';
import {loginUrl} from '@network/apiUrls';

import {loginStyles} from './styles';

// Utility function to handle animation
const startCircleAnimations = (
  scale: Animated.Value,
  fadeAnim: Animated.Value,
  opacity: Animated.Value,
  toScale: number,
) => {
  startAnimation(scale, toScale, 6000);
  startAnimation(fadeAnim, 0, 6000);
  startAnimation(opacity, 0, 9000);
};

// Custom hook to manage the circles
const useCircles = (scaleSize: Function) => {
  const [circles, setCircles] = useState<CircleBoundaries>([]);

  const addCircle = () => {
    const randomImage =
      imageArray[Math.floor(Math.random() * imageArray.length)];
    const newCircle = {
      id: Date.now(),
      scaleValue: new Animated.Value(scaleSize(0.34)),
      fadeAnim: new Animated.Value(1),
      imageOpacity: new Animated.Value(1),
      imageSource: randomImage,
    };

    startCircleAnimations(
      newCircle.scaleValue,
      newCircle.fadeAnim,
      newCircle.imageOpacity,
      scaleSize(1.1),
    );

    setCircles(prevCircles => [...prevCircles, newCircle]);
  };

  useEffect(() => {
    addCircle();
    const intervalId = setInterval(addCircle, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkFadedCircles = () => {
      setCircles(prevCircles =>
        prevCircles.filter(circle => circle.fadeAnim._value > 0),
      );
    };

    const intervalId = setInterval(checkFadedCircles, 500);
    return () => clearInterval(intervalId);
  }, [circles]);

  return circles;
};

const Login = () => {
  const styles = loginStyles();
  const {scaleSize} = useScalingMetrics();
  const circles = useCircles(scaleSize);

  const handleLogin = async () => {
    const url = loginUrl;
    try {
      await Linking.openURL(url);
    } catch {
      ShowToast(
        'error',
        'Login Error',
        'Cannot login curretly. Please try again after some time',
      );
    }
  };
  return (
    <BaseContainer>
      <View style={styles.topContainer}>
        <View style={styles.childContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={IMAGES.logoImg}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          {circles.map(circle => (
            <AnimatedCircle
              key={circle.id}
              scaleValue={circle.scaleValue}
              opacity={circle.fadeAnim}
              imageOpacity={circle.imageOpacity}
              imageSource={circle.imageSource}
              radius={scaleSize(150)}
            />
          ))}
        </View>

        <Text style={styles.info}>Move teamwork forward even on the go</Text>
        <Text style={styles.termText}>
          The experience of sorted and organized teamwork
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </BaseContainer>
  );
};

export default Login;
