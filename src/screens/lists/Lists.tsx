import {useEffect, useState, useMemo, useCallback} from 'react';
import {
  FlatList,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import {ROUTES} from '@constants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import useTheme from '@hooks/useTheme';
import {addData, fetchData} from '@network/apiMethods';
import {listCardUrl, newCardUrl, newListUrl} from '@network/apiUrls';

import {listStyles} from './styles';

const Lists = () => {
  const styles = listStyles();
  const {colors} = useTheme();
  const {token} = useUserLoginContext();
  const boardNavigation = useNavigation<BoardsNavigationType>();
  const route = useRoute<RouteProp<BoardsScreenParamList, 'LISTS_SCREEN'>>();
  const {boardId, boardName, backgroundImageUrl} = route?.params;

  const [lists, setLists] = useState<AllLists>([]);
  const [cards, setCards] = useState<AllCards>([]);
  const [isAddList, setIsAddList] = useState(false);
  const [addingCardToListId, setAddingCardToListId] = useState<string>('');
  const [newList, setNewList] = useState<string>('');
  const [newCard, setNewCard] = useState<string>('');

  const getAllData = useCallback(async () => {
    const allListsInfo = await fetchData(listCardUrl(token, boardId, 'lists'));
    const allLists: AllLists = allListsInfo.map(({id, name}: ListInfo) => ({
      id,
      name,
    }));
    setLists(allLists);

    const allCardsInfo = await fetchData(listCardUrl(token, boardId, 'cards'));
    const allCards: AllCards = allCardsInfo.map(
      ({id, idList, name}: CardInfo) => ({
        id,
        idList,
        name,
      }),
    );
    setCards(allCards);
  }, [token, boardId]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const cardsArr = useMemo(() => {
    return (listId: string) => cards.filter(({idList}) => idList === listId);
  }, [cards]);

  const onPressBack = () => {
    boardNavigation.goBack();
  };

  const onPressSetting = () => {
    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.SETTINGS_SCREEN);
  };

  const onPressClear = () => {
    isAddList ? setIsAddList(false) : setAddingCardToListId('');
  };

  const onPressCheck = async () => {
    if (isAddList) {
      await addData(newListUrl(token, newList, boardId));
      getAllData();
      setNewList('');
      setIsAddList(false);
    } else {
      await addData(newCardUrl(token, newCard, addingCardToListId));
      getAllData();
      setNewCard('');
      setAddingCardToListId('');
    }
  };

  const onInputChange = (value: string, type: 'list' | 'card') => {
    type === 'list' ? setNewList(value) : setNewCard(value);
  };

  const onPressCard = (id: string) => {
    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.CARD_DETAILS_SCREEN, {
      cardId: id,
    });
  };

  const renderCard = ({item}: {item: CardInfo}) => (
    <TouchableOpacity onPress={() => onPressCard(item.id)}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderList = (list: ListInfo) => (
    <View key={list.id} style={styles.listContainer}>
      <View style={styles.listChildContainer}>
        <Text style={styles.listTitle}>{list.name}</Text>
        <FlatList data={cardsArr(list.id)} renderItem={renderCard} />
        {addingCardToListId === list.id ? (
          <TextInput
            placeholder="Card name"
            placeholderTextColor={colors.gray400}
            autoFocus
            style={styles.input}
            onChangeText={value => onInputChange(value, 'card')}
          />
        ) : (
          <Pressable onPress={() => setAddingCardToListId(list.id)}>
            <Text style={styles.addCard}>+ Add Card</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const renderAddList = () => (
    <View style={styles.listContainer}>
      <View style={styles.listChildContainer}>
        {isAddList ? (
          <TextInput
            placeholder="List name"
            placeholderTextColor={colors.gray400}
            autoFocus
            style={styles.input}
            onChangeText={value => onInputChange(value, 'list')}
          />
        ) : (
          <Pressable onPress={() => setIsAddList(true)}>
            <Text style={styles.addList}>Add List</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const renderHeaderLeftIcon = (isLeft: boolean) => {
    const iconName =
      isAddList || addingCardToListId
        ? 'clear'
        : Platform.OS === 'android'
        ? 'arrow-back'
        : 'arrow-back-ios-new';

    return <HeaderIcon name={iconName} />;
  };

  const renderHeaderRightIcon = () => {
    const iconName = isAddList || addingCardToListId ? 'check' : 'settings';
    const color =
      isAddList || addingCardToListId
        ? newCard || newList
          ? colors.white
          : colors.gray200
        : colors.white;

    return <HeaderIcon name={iconName} color={color} />;
  };

  return (
    <BaseContainer>
      <Header
        headerText={
          isAddList ? 'Add list' : addingCardToListId ? 'Add Card' : boardName
        }
        leftNode={renderHeaderLeftIcon(true)}
        rightNode={renderHeaderRightIcon()}
        handleOnPressLeftNode={
          isAddList || addingCardToListId ? onPressClear : onPressBack
        }
        handleOnPressRightNode={
          isAddList || addingCardToListId
            ? newCard || newList
              ? onPressCheck
              : () => {}
            : onPressSetting
        }
      />
      <ImageBackground
        source={{uri: backgroundImageUrl}}
        resizeMode="cover"
        style={styles.imageBg}>
        <ScrollView
          horizontal
          scrollEnabled={!isAddList && !addingCardToListId}>
          {lists.map(renderList)}
          {renderAddList()}
        </ScrollView>
      </ImageBackground>
    </BaseContainer>
  );
};

export default Lists;
