import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import Loader from '@components/loader';
import NoDataFound from '@components/noDataFound';
import Carousel from '@components/carousel';

import {colorArray, ROUTES} from '@constants';
import {imageArray, IMAGES} from '@constants/imageConstants';

import {useUserLoginContext} from '@contexts/Loginprovider';
import {startAnimation, truncateText} from '@helpers';
import useTheme from '@hooks/useTheme';
import useScalingMetrics from '@hooks/useScalingMetrics';
import {useBoardsQuery} from '@store/boards';
import {useCardsQuery} from '@store/cards';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import {boardStyles} from './styles';

const animate = (
  slideAnim: Animated.Value,
  translateCircularX: Animated.Value,
  translateX: Animated.Value,
) => {
  startAnimation(slideAnim, 0, 500);
  setTimeout(() => {
    startAnimation(translateCircularX, 10, 1000);
  }, 200);
  setTimeout(() => {
    startAnimation(translateX, 10, 1000);
  }, 600);
};

const renderTaskItem = ({
  item,
  boards,
  translateX,
  styles,
  colors,
}: {
  item: CardInfo;
  boards: AllBoards;
  translateX: Animated.Value;
  styles: Record<string, any>;
  colors: Colors;
}) => {
  const board = boards.find(({id}) => id === item?.idBoard);
  return (
    <Animated.View
      style={[
        styles.taskItemContainer,
        {
          transform: [{translateX: translateX}],
        },
      ]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.blue700, colors.blue300]}
        style={styles.taskItemBoardContainer}>
        <Text style={styles.taskItemBoardName}>
          {truncateText(board?.name as string, 20)}
        </Text>
      </LinearGradient>
      <View style={styles.taskItemTitleContainer}>
        <Text style={styles.taskItemtitle}>
          {truncateText(item?.name as string, 20)}
        </Text>
      </View>
    </Animated.View>
  );
};
const renderStoryItem = ({
  item,
  onPressStory,
  translateCircularX,
  styles,
}: {
  item: MappedBoard;
  onPressStory: () => void;
  translateCircularX: Animated.Value;
  styles: Record<string, any>;
}) => {
  const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
  const bgColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  return (
    <TouchableOpacity onPress={onPressStory}>
      <Animated.View
        style={[
          styles.storyItemContainer,
          {
            transform: [{translateX: translateCircularX}],
          },
        ]}>
        <View
          style={[
            styles.storyItemImageContainer,
            {
              backgroundColor: bgColor,
            },
          ]}>
          <Image source={randomImage} style={styles.storyItemImage} />
        </View>
        <View
          style={[
            styles.storyItemBorder,
            {
              borderColor: bgColor,
            },
          ]}
        />
        {/* <Text style={styles.storyItemTitle}>
          {truncateText(item?.name as string, 10)}
        </Text> */}
      </Animated.View>
    </TouchableOpacity>
  );
};

const Boards = () => {
  const styles = boardStyles();
  const {colors} = useTheme();
  const {hp, wp} = useScalingMetrics();
  const {token} = useUserLoginContext();
  const drawerNavigation = useNavigation<DrawerNavigationType>();
  const boardNavigation = useNavigation<BoardsNavigationType>();

  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(hp(40))).current;
  const translateX = useRef(new Animated.Value(500)).current;
  const translateCircularX = useRef(new Animated.Value(500)).current;
  const storyTime = useRef(new Animated.Value(-wp(100))).current;

  const {data: boards, isLoading: isBoardsLoading} = useBoardsQuery(token);

  const {data: cards, isLoading: isCardsLoading} = useCardsQuery(token, () =>
    animate(slideAnim, translateCircularX, translateX),
  );

  const onPressDrawer = () => {
    drawerNavigation.toggleDrawer();
  };

  const onPressBoardCard = (item: MappedBoard) => {
    const {id, name, backgroundImageUrl} = item;

    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.LISTS_SCREEN, {
      boardId: id,
      boardName: name,
      backgroundImageUrl: backgroundImageUrl,
      fromScreen: ROUTES.BOARDS_STACK_SCREEN.BOARDS_SCREEN,
    });
  };
  const onPressAddIcon = () => {
    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.ADD_BOARD_SCREEN);
  };

  const onPressStory = () => {
    setIsStoryVisible(true);
    startAnimation(storyTime, 0, 5000, () => {
      setIsStoryVisible(false);
      storyTime.setValue(-wp(100));
    });
  };

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  if (isBoardsLoading || isCardsLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <BaseContainer bgColor={colors.gray50}>
      <Header
        headerText="Home"
        leftNode={<HeaderIcon name="menu" />}
        handleOnPressLeftNode={onPressDrawer}
      />

      <Text style={styles.sectionTitle}>Your Boards</Text>
      <Carousel data={boards} onPressCard={onPressBoardCard} />

      <Animated.View
        style={[
          styles.bottomContainer,
          {transform: [{translateY: slideAnim}]},
        ]}>
        <Text style={styles.sectionTitle}>Stories</Text>
        <Animated.FlatList
          data={boards}
          renderItem={({item}) =>
            renderStoryItem({item, onPressStory, translateCircularX, styles})
          }
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<NoDataFound item="Story" />}
        />
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
        <Animated.FlatList
          data={cards}
          renderItem={({item}) =>
            renderTaskItem({item, boards, translateX, styles, colors})
          }
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<NoDataFound item="Task" />}
        />
      </Animated.View>
      <Animated.View
        style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
        {...panResponder.panHandlers}>
        <Pressable onPress={onPressAddIcon}>
          <Icon name="add" size={32} style={styles.addIcon} />
        </Pressable>
      </Animated.View>
      {isStoryVisible && (
        <Animated.View style={styles.storyContainer}>
          <View style={styles.progressContainer}>
            <Animated.View
              style={[styles.progress, {transform: [{translateX: storyTime}]}]}>
              <Image source={IMAGES.comingSoon} style={styles.comingSoon} />
            </Animated.View>
          </View>
        </Animated.View>
      )}
    </BaseContainer>
  );
};

export default Boards;
