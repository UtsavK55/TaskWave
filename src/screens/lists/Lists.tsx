import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CommonActions,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import CustomModal from '@components/customModal';
import Dropdown from '@components/dropdown';
import Loader from '@components/loader';
import ShowToast from '@components/showToast';

import {IMAGES} from '@constants/imageConstants';
import {ROUTES} from '@constants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {isAndroid} from '@helpers';
import useTheme from '@hooks/useTheme';

import {addData, deleteData, fetchData, updateData} from '@network/apiMethods';
import {
  archiveListUrl,
  deletBoardUrl,
  deletCardUrl,
  editListUrl,
  listCardUrl,
  newCardUrl,
  newListUrl,
  updateCardList,
} from '@network/apiUrls';

import FastImage from 'react-native-fast-image';

import {listStyles} from './styles';

const Lists = () => {
  const styles = listStyles();
  const {colors, backgrounds, fonts, layout, gutters, borders} = useTheme();
  const isFocused = useIsFocused();
  const {token} = useUserLoginContext();
  const boardNavigation = useNavigation<BoardsNavigationType>();
  const drwawerNavigation = useNavigation<DrawerNavigationType>();
  const route = useRoute<RouteProp<BoardsScreenParamList, 'LISTS_SCREEN'>>();
  const {boardId, boardName, backgroundImageUrl, fromScreen} = route?.params;

  const [lists, setLists] = useState<AllLists>([]);
  const [cards, setCards] = useState<AllCards>([]);
  const [isAddList, setIsAddList] = useState(false);
  const [addingCardToListId, setAddingCardToListId] = useState<string>('');
  const [editListbyId, setEditListById] = useState<string>('');
  const [newList, setNewList] = useState<string>('');
  const [newCard, setNewCard] = useState<string>('');
  const [listTitle, setListTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCardLoading, setIsCardLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<ListInfo>({
    id: '',
    name: '',
  });
  const [selectedCard, setSelectedCard] = useState<string>('');

  const getListData = useCallback(async () => {
    setIsLoading(true);
    const allListsInfo = await fetchData(listCardUrl(token, boardId, 'lists'));
    const allLists: AllLists = allListsInfo.map(({id, name}: ListInfo) => ({
      id,
      name,
    }));
    setLists(allLists);
    setIsLoading(false);
  }, [token, boardId]);

  const getCardData = useCallback(async () => {
    setIsCardLoading(true);
    const allCardsInfo = await fetchData(listCardUrl(token, boardId, 'cards'));
    const allCards: AllCards = allCardsInfo.map(
      ({id, idList, name}: CardInfo) => ({
        id,
        idList,
        name,
      }),
    );
    setCards(allCards);
    setIsCardLoading(false);
  }, [token, boardId]);

  useEffect(() => {
    getListData();
    getCardData();
  }, [getListData, getCardData, isFocused]);

  const cardsArr = useMemo(() => {
    return (listId: string) => cards.filter(({idList}) => idList === listId);
  }, [cards]);

  const onPressBack = () => {
    setIsAddList(false);
    setAddingCardToListId('');
    setEditListById('');
    if (fromScreen === ROUTES.BOARDS_STACK_SCREEN.BOARDS_SCREEN) {
      boardNavigation.goBack();
    } else {
      drwawerNavigation.dispatch(
        CommonActions.reset({
          routes: [{name: ROUTES.DRAWER.CARDS}],
        }),
      );
    }
  };

  const onPressSetting = () => {
    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.SETTINGS_SCREEN, {
      boardId: boardId,
    });
    setIsAddList(false);
    setAddingCardToListId('');
    setEditListById('');
  };

  const onPressClear = () => {
    if (isAddList) {
      setNewList('');
      setIsAddList(false);
    } else if (editListbyId) {
      setListTitle('');
      setEditListById('');
    } else {
      setNewCard('');
      setAddingCardToListId('');
    }
  };

  const onPressCheck = async () => {
    if (isAddList && newList) {
      await addData(newListUrl(token, newList, boardId));
      getListData();
      setNewList('');
      setIsAddList(false);
    } else if (editListbyId && listTitle) {
      await updateData(editListUrl(token, listTitle, editListbyId));
      getListData();
      setListTitle('');
      setEditListById('');
    } else if (newCard && addingCardToListId) {
      await addData(newCardUrl(token, newCard, addingCardToListId));
      getCardData();
      setNewCard('');
      setAddingCardToListId('');
    }
  };

  const onInputChange = (
    value: string,
    type: 'newList' | 'editList' | 'card',
  ) => {
    type === 'newList'
      ? setNewList(value)
      : type === 'editList'
      ? setListTitle(value)
      : setNewCard(value);
  };

  const onPressCard = (id: string) => {
    if (!addingCardToListId && !editListbyId && !isAddList) {
      boardNavigation.navigate(ROUTES.DRAWER.BOARDS, {
        screen: ROUTES.BOARDS_STACK_SCREEN.CARD_DETAILS_SCREEN,
        params: {
          cardId: id,
          fromScreen: ROUTES.BOARDS_STACK_SCREEN.LISTS_SCREEN,
        },
      });
    }
  };

  const onPressListArchive = async (listId: string) => {
    if (!addingCardToListId) {
      Alert.alert(
        'Archive List',
        'Are you sure you want to archive this list',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Archive',
            style: 'destructive',
            onPress: async () => {
              await updateData(archiveListUrl(token, listId, true));
              getListData();
            },
          },
        ],
      );
    }
  };

  const onPressListTitle = (list: ListInfo) => {
    if (!addingCardToListId) {
      setListTitle(list?.name);
      setEditListById(list?.id);
    }
  };

  const onPressAddCard = (id: string) => {
    if (!editListbyId) setAddingCardToListId(id);
  };

  const onPressMove = (cardId: string, listId: string) => {
    if (!addingCardToListId && !editListbyId && !isAddList) {
      setIsVisible(true);
      const list = lists?.find(({id}) => id === listId);
      setSelectedList(list as ListInfo);
      setSelectedCard(cardId);
    }
  };

  const onSelectList = async (value: ListInfo) => {
    setSelectedList(value);
  };

  const onPressModalClear = () => {
    setIsVisible(false);
  };
  const onPressModalCheck = async () => {
    await updateData(updateCardList(token, selectedCard, selectedList?.id));
    getCardData();
    setIsVisible(false);
  };

  const onPressCardDelete = (id: string) => {
    if (!addingCardToListId && !editListbyId && !isAddList) {
      Alert.alert('Delete Card', 'Are you sure you want to delete this card', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteData(deletCardUrl(token, id));
            getCardData();
            ShowToast('success', 'Card deleted successfully');
          },
        },
      ]);
    }
  };

  const renderCard = ({item}: {item: CardInfo}) => (
    <TouchableOpacity onPress={() => onPressCard(item.id)}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardActions}>
          <Pressable
            onPress={() => onPressMove(item?.id, item?.idList as string)}>
            <HeaderIcon
              name={'move-up'}
              color={
                addingCardToListId || editListbyId || isAddList
                  ? colors.gray200
                  : colors.blue700
              }
              size={20}
            />
          </Pressable>
          <Pressable onPress={() => onPressCardDelete(item?.id)}>
            <HeaderIcon
              name={'delete'}
              color={
                addingCardToListId || editListbyId || isAddList
                  ? colors.gray200
                  : colors.red500
              }
              size={20}
            />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderList = (list: ListInfo) => (
    <View key={list.id} style={styles.listContainer}>
      <View style={styles.listChildContainer}>
        {editListbyId === list?.id ? (
          <View style={styles.titleContainer}>
            <TextInput
              editable
              placeholder="List name"
              placeholderTextColor={colors.gray400}
              autoFocus
              style={styles.input}
              value={listTitle}
              onChangeText={value => onInputChange(value, 'editList')}
            />
            <View style={styles.cardActions}>
              <Pressable onPress={onPressClear}>
                <HeaderIcon name={'clear'} color={colors.red500} size={20} />
              </Pressable>
              <Pressable onPress={onPressCheck}>
                <HeaderIcon
                  name={'check'}
                  color={listTitle ? 'green' : colors.gray200}
                  size={20}
                />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.titleContainer}>
            <View style={styles.listAction}>
              <Text style={styles.listTitle}>{list?.name}</Text>
              <Pressable
                onPress={() => onPressListTitle(list)}
                style={styles.editAction}>
                <HeaderIcon
                  name={'edit'}
                  color={addingCardToListId ? colors.gray200 : colors.gray400}
                  size={16}
                />
              </Pressable>
            </View>
            <TouchableOpacity
              onPress={() => onPressListArchive(list?.id)}
              style={styles.archiveAction}>
              <HeaderIcon
                name="archive"
                color={addingCardToListId ? colors.gray200 : colors.blue700}
              />
            </TouchableOpacity>
          </View>
        )}
        {isCardLoading ? (
          <Loader size={'small'} bgColor="rgba(0, 0, 0, 0.5)" />
        ) : (
          <FlatList data={cardsArr(list.id)} renderItem={renderCard} />
        )}
        {addingCardToListId === list.id ? (
          <View style={[styles.cardContainer, styles.titleContainer]}>
            <TextInput
              placeholder="Card name"
              placeholderTextColor={colors.gray400}
              autoFocus
              style={styles.cardTitle}
              onChangeText={value => onInputChange(value, 'card')}
            />
            <View style={styles.cardActions}>
              <Pressable onPress={onPressClear}>
                <HeaderIcon name={'clear'} color={colors.red500} size={20} />
              </Pressable>
              <Pressable onPress={onPressCheck}>
                <HeaderIcon
                  name={'check'}
                  color={newCard ? 'green' : colors.gray200}
                  size={20}
                />
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => onPressAddCard(list?.id)}>
            <Text
              style={[
                editListbyId ? fonts.gray200 : fonts.fixedblue700,
                gutters.marginTop_8,
              ]}>
              + Add Card
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const renderAddList = () => (
    <View style={styles.listContainer}>
      <View
        style={styles.listChildContainer}>
        {isAddList ? (
          <View
            style={styles.addListContainer}>
            <TextInput
              placeholder="List name"
              placeholderTextColor={colors.gray400}
              autoFocus
              style={[fonts.black]}
              onChangeText={value => onInputChange(value, 'newList')}
            />
            <View style={styles.cardActions}>
              <Pressable onPress={onPressClear}>
                <HeaderIcon name={'clear'} color={colors.red500} size={20} />
              </Pressable>
              <Pressable onPress={onPressCheck}>
                <HeaderIcon
                  name={'check'}
                  color={newList ? 'green' : colors.gray200}
                  size={20}
                />
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => setIsAddList(true)}>
            <Text style={styles.addList}>Add List</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const renderHeaderLeftIcon = () => {
    let iconName: string;

    if (isAndroid) {
      iconName = 'arrow-back';
    } else {
      iconName = 'arrow-back-ios-new';
    }

    return <HeaderIcon name={iconName} />;
  };

  const onPressDelete = async () => {
    Alert.alert('Delete Board', 'Are you sure you want to delete this board', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteData(deletBoardUrl(token, boardId));
          boardNavigation.popToTop();
          ShowToast('success', 'Board deleted successfully');
        },
      },
    ]);
  };

  const renderHeaderRightIcon = () => {
    return (
      <View style={styles.cardActions}>
        <Pressable onPress={onPressSetting}>
          <HeaderIcon name={'settings'} />
        </Pressable>
        <Pressable onPress={onPressDelete}>
          <HeaderIcon name={'delete'} />
        </Pressable>
      </View>
    );
  };

  return (
    <BaseContainer>
      <Header
        headerText={boardName}
        leftNode={renderHeaderLeftIcon()}
        rightNode={renderHeaderRightIcon()}
        handleOnPressLeftNode={onPressBack}
      />
      <FastImage
        source={{uri: backgroundImageUrl}}
        resizeMode="cover"
        defaultSource={IMAGES.titleImg}
        style={styles.imageBg}>
        {isLoading ? (
          <Loader size={'large'} bgColor="rgba(0, 0, 0, 0.5)" />
        ) : (
          <ScrollView
            horizontal
            scrollEnabled={!isAddList && !addingCardToListId && !editListbyId}>
            {lists.map(renderList)}
            {renderAddList()}
          </ScrollView>
        )}
      </FastImage>
      <CustomModal
        visible={isVisible}
        onPressClear={onPressModalClear}
        onPressCheck={onPressModalCheck}>
        <View style={[gutters.padding_12]}>
          <Text>Select List</Text>
          <Dropdown
            data={lists}
            value={selectedList}
            onSelectIndex={onSelectList}
            placeholder="Select a list"
            shouldScroll={true}
          />
        </View>
      </CustomModal>
    </BaseContainer>
  );
};

export default Lists;
