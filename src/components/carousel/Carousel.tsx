import React, {useRef} from 'react';
import {
  Animated,
  ListRenderItemInfo,
  Pressable,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {IMAGES} from '@constants/imageConstants';
import {truncateText} from '@helpers';
import useScalingMetrics from '@hooks/useScalingMetrics';

import {carouselStyles} from './styles';

const Carousel: React.FC<CarouselProps> = ({data, onPressCard}) => {
  const {wp} = useScalingMetrics();
  const scrollX = useRef(new Animated.Value(0)).current;
  const styles = carouselStyles();

  const CARD_SIZE = wp(45) + 4 * 2; // ITEM_WIDTH + SPACING * 2

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  const renderItem = ({item, index}: ListRenderItemInfo<MappedBoard>) => {
    return (
      <CarouselCard
        item={item}
        index={index}
        scrollX={scrollX}
        CARD_SIZE={CARD_SIZE}
        onPress={onPressCard}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_SIZE}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  index,
  scrollX,
  CARD_SIZE,
  onPress,
}) => {
  const styles = carouselStyles();
  const inputRange = [
    (index - 2) * CARD_SIZE,
    (index - 1) * CARD_SIZE,
    index * CARD_SIZE,
    (index + 1) * CARD_SIZE,
    (index + 2) * CARD_SIZE,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 0.8, 1, 0.8, 0.8],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 0.4, 1, 0.4, 0.4],
    extrapolate: 'clamp',
  });

  return (
    <Pressable onPress={() => onPress(item)} style={styles.cardContainer}>
      <Animated.View
        style={[
          styles.itemContainer,
          {transform: [{scale}], opacity, flex: 1},
        ]}>
        <FastImage
          source={{
            uri: item?.backgroundImageUrl,
            priority: FastImage.priority.high,
          }}
          defaultSource={IMAGES.logoImg}
          style={styles.image}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{truncateText(item?.name, 20)}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{item?.cardsNo} tasks</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default Carousel;
