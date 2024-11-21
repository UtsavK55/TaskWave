import {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import Loader from '@components/loader';
import NoDataFound from '@components/noDataFound';
import {ROUTES} from '@constants';
import {IMAGES} from '@constants/imageConstants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {fetchData} from '@network/apiMethods';
import {allBoardsUrl, getMyCardsUrl} from '@network/apiUrls';

import {myCardStyles} from './styles';

const MyCards = () => {
  const isFocused = useIsFocused();
  const {token} = useUserLoginContext();
  const drawerNavigation = useNavigation<DrawerNavigationType>();
  const boradNavigation = useNavigation<BoardsNavigationType>();
  const styles = myCardStyles();

  const [boards, setBoards] = useState<AllBoards>([]);
  const [cards, setCards] = useState<AllCards>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onPressDrawer = () => {
    drawerNavigation.toggleDrawer();
  };

  const getAllData = useCallback(async () => {
    setIsLoading(true);
    const allBoardsInfo = await fetchData(allBoardsUrl(token));
    const allBoards: AllBoards = allBoardsInfo.map(
      ({id, name, prefs}: BoardInfo) => ({
        id,
        name,
        backgroundImageUrl: prefs?.backgroundImageScaled?.[2]?.url,
      }),
    );

    setBoards(allBoards);

    const allCardsInfo = await fetchData(getMyCardsUrl(token));
    const allCards: AllCards = allCardsInfo.map(
      ({id, idBoard, name}: CardInfo) => ({
        id,
        idBoard,
        name,
      }),
    );
    
    setCards(allCards);
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    getAllData();
  }, [getAllData, isFocused]);

  const cardsArr = useMemo(() => {
    return (boardId: string) =>
      cards.filter(({idBoard}) => idBoard === boardId);
  }, [cards]);

  const onPressBoard = (item: MappedBoard) => {
    boradNavigation.navigate(ROUTES.DRAWER.BOARDS, {
      screen: ROUTES.BOARDS_STACK_SCREEN.LISTS_SCREEN,
      params: {
        boardId: item?.id,
        boardName: item?.name,
        backgroundImageUrl: item?.backgroundImageUrl,
        fromScreen: ROUTES.MY_CARDS_STACK_SCREEN.MY_CARDS,
      },
    });
  };

  const renderCard = ({item}: {item: CardInfo}) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </View>
  );

  const renderBoardCard = (item: MappedBoard) => {
    const {name, backgroundImageUrl} = item;
    return (
      <View>
        {cardsArr(item?.id).length && (
          <View style={styles.container}>
            <Pressable onPress={() => onPressBoard(item)}>
              <View style={styles.boardCardContainer}>
                <FastImage
                  source={{
                    uri: backgroundImageUrl,
                    priority: FastImage.priority.high,
                  }}
                  defaultSource={IMAGES.logoImg}
                  style={styles.image}
                />
                <Text style={styles.boardCardTitle}>{name}</Text>
              </View>
            </Pressable>
            <FlatList
              data={cardsArr(item?.id)}
              renderItem={renderCard}
              ListEmptyComponent={<NoDataFound item="card" />}
            />
          </View>
        )}
      </View>
    );
  };

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <BaseContainer>
      <Header
        headerText="My Cards"
        leftNode={<HeaderIcon name="menu" />}
        handleOnPressLeftNode={onPressDrawer}
      />
      <FlatList
        data={boards}
        renderItem={({item}) => renderBoardCard(item)}
        ListEmptyComponent={<NoDataFound item="board" />}
      />
    </BaseContainer>
  );
};

export default MyCards;
