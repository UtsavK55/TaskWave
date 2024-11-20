import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import Loader from '@components/loader';
import NoDataFound from '@components/noDataFound';
import Carousel from '@components/carousel';
import {colorArray, ROUTES} from '@constants';
import {imageArray} from '@constants/imageConstants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {startAnimation, truncateText} from '@helpers';
import useTheme from '@hooks/useTheme';
import useScalingMetrics from '@hooks/useScalingMetrics';
import {fetchData} from '@network/apiMethods';
import {allBoardsUrl, getMyCardsUrl, listCardUrl} from '@network/apiUrls';

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

const Boards = () => {
  const isFocused = useIsFocused();
  const styles = boardStyles();
  const {colors} = useTheme();
  const {hp, wp} = useScalingMetrics();
  const {token} = useUserLoginContext();
  const drawerNavigation = useNavigation<DrawerNavigationType>();
  const boardNavigation = useNavigation<BoardsNavigationType>();

  const [boards, setBoards] = useState<AllBoards>([]);
  const [cards, setCards] = useState<AllCards>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(hp(40))).current;
  const translateX = useRef(new Animated.Value(500)).current;
  const translateCircularX = useRef(new Animated.Value(500)).current;
  const storyTime = useRef(new Animated.Value(-wp(100))).current;

  const getAllBoards = async () => {
    setIsLoading(true);

    const allBoardsInfo = await fetchData(allBoardsUrl(token));
    const allBoards: AllBoards = allBoardsInfo.map(
      ({id, name, prefs}: BoardInfo) => ({
        id,
        name,
        backgroundImageUrl: prefs?.backgroundImageScaled?.[2]?.url,
        cardsNo: 0, // Initialize cardsNo as 0
      }),
    );

    // Loop through all boards and fetch card count for each
    const boardsWithCardCount = await Promise.all(
      allBoards.map(async board => {
        const allCardsInfo = await fetchData(
          listCardUrl(token, board.id, 'cards'),
        );
        return {
          ...board,
          cardsNo: allCardsInfo?.length,
        };
      }),
    );

    // Update the boards with the cards count
    setBoards(boardsWithCardCount);

    const allCardsInfo = await fetchData(getMyCardsUrl(token));
    const allCards: AllCards = allCardsInfo.map(
      ({id, idBoard, name, dateLastActivity}: CardInfo) => ({
        id,
        idBoard,
        name,
        dateLastActivity,
      }),
    );
    const sortedCards = allCards.sort((a, b) => {
      const dateA = new Date(a.dateLastActivity);
      const dateB = new Date(b.dateLastActivity);

      return dateB.getTime() - dateA.getTime();
    });

    setCards(sortedCards);
    setIsLoading(false);
    animate(slideAnim, translateCircularX, translateX);
  };

  useEffect(() => {
    getAllBoards();
  }, [isFocused]);

  const onPressDrawer = () => {
    drawerNavigation.toggleDrawer();
  };
  const onPressSearch = () => {
    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.SEARCH_SCREEN);
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

  const renderTaskItem = ({item}: {item: CardInfo}) => {
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
  const renderStoryItem = ({item}: {item: MappedBoard}) => {
    const randomImage =
      imageArray[Math.floor(Math.random() * imageArray.length)];
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
          <Text style={styles.storyItemTitle}>
            {truncateText(item?.name as string, 10)}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <BaseContainer bgColor={colors.gray50}>
      <Header
        headerText="Home"
        leftNode={<HeaderIcon name="menu" />}
        rightNode={<HeaderIcon name="search" />}
        handleOnPressLeftNode={onPressDrawer}
        handleOnPressRightNode={onPressSearch}
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
          renderItem={renderStoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<NoDataFound item="Story" />}
        />
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
        <Animated.FlatList
          data={cards}
          renderItem={renderTaskItem}
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
              style={[
                styles.progress,
                {transform: [{translateX: storyTime}]},
              ]}></Animated.View>
          </View>
        </Animated.View>
      )}
    </BaseContainer>
  );
};

export default Boards;
