import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import BaseContainer from '@src/components/baseContainer';
import CustomModal from '@src/components/customModal';
import Dropdown from '@src/components/dropdown';
import Header from '@src/components/header';
import HeaderIcon from '@src/components/headerIcon';
import {IMAGES, ROUTES} from '@src/constants';
import {useUserLoginContext} from '@src/contexts/Loginprovider';
import useTheme from '@src/hooks/useTheme';
import {deleteData, fetchData, updateData} from '@src/network/apiMethods';
import {
  cardInfoUrl,
  deletCardUrl,
  getListUrl,
  listCardUrl,
  updateCardDesc,
  updateCardList,
} from '@src/network/apiUrls';
import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {cardStyles} from './styles';
import {isAndroid} from '@src/helpers';
import DateAndTimePicker from '@src/components/dateTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '@src/components/loader';
import ShowToast from '@src/components/showToast';

const CardDetails = () => {
  const styles = cardStyles();
  const {colors, layout, borders, backgrounds, gutters, fonts} = useTheme();
  const {token} = useUserLoginContext();
  const boardNavigation = useNavigation<BoardsNavigationType>();
  const drwawerNavigation = useNavigation<DrawerNavigationType>();
  const route =
    useRoute<RouteProp<BoardsScreenParamList, 'CARD_DETAILS_SCREEN'>>();
  const {cardId} = route?.params;

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    id: '',
    desc: '',
    start: '',
    due: '',
    dueComplete: false,
    idList: '',
    name: '',
    idBoard: '',
  });

  const [list, setList] = useState<ListInfo>({id: '', name: ''});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<ListInfo>({
    id: '',
    name: '',
  });
  const [lists, setLists] = useState<ListInfo[]>([]);
  const [description, setDescription] = useState<string>('');
  const [isAddDescription, setIsAddDescription] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllData = async () => {
    setIsLoading(true);
    const card = await fetchData(cardInfoUrl(token, cardId));
    console.log(card);
    const {id, desc, start, due, dueComplete, idList, name, idBoard} = card;
    const cardInfo = {id, desc, start, due, dueComplete, idList, name, idBoard};
    setCardDetails(cardInfo);
    setDescription(desc);
    setDate(start);

    const list = await fetchData(getListUrl(token, idList));
    const listInfo = {id: list?.id, name: list?.name};
    setList(listInfo);
    setSelectedList(listInfo);

    const allListsInfo = await fetchData(
      listCardUrl(token, cardInfo?.idBoard, 'lists'),
    );
    const allLists: AllLists = allListsInfo.map(({id, name}: ListInfo) => ({
      id,
      name,
    }));
    setLists(allLists);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const {id, desc, start, due, dueComplete, idList, name} = cardDetails;

  const onPressBack = () => {
    if (route?.params?.fromScreen === ROUTES.BOARDS_STACK_SCREEN.LISTS_SCREEN) {
      boardNavigation.goBack();
    } else {
      drwawerNavigation.dispatch(
        
        CommonActions.reset({
          routes: [{name: ROUTES.DRAWER.CARDS}],
        }),
      );
    }
  };

  const onPressMove = () => {
    setIsVisible(true);
  };

  
  const onPressDescClear = () => {
    setIsAddDescription(false);
    setDescription(desc);
  };
  
  const onPressDescCheck = async () => {
    await updateData(updateCardDesc(token, id, description));
    getAllData();
    setIsAddDescription(false);
  };
  
  const onPressClear = () => {
    setIsVisible(false);
  };
  const onPressCheck = async () => {
    await updateData(updateCardList(token, id, selectedList?.id));
    getAllData();
    setIsVisible(false);
  };

  const onSelectList = async (value: ListInfo) => {
    setSelectedList(value);
  };

  const onChangeText = (text: string) => {
    setDescription(text);
  };

  const onPressDelete = async () => {
    Alert.alert('Delete Card', 'Are you sure you want to delete this card', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteData(deletCardUrl(token, id));
          boardNavigation.goBack();
          ShowToast('success', 'Card deleted successfully');
        },
      },
    ]);
  };

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <BaseContainer>
      <Header
        headerText={isAddDescription ? 'Description' : 'Card Details'}
        leftNode={
          <HeaderIcon
            name={
              isAddDescription
                ? 'clear'
                : isAndroid
                ? 'arrow-back'
                : 'arrow-back-ios-new'
            }
          />
        }
        rightNode={
          isAddDescription ? (
            description ? (
              <HeaderIcon name="check" color={colors.fixedWhite} />
            ) : (
              <HeaderIcon name="check" color={colors.gray200} />
            )
          ) : (
            <HeaderIcon name="delete" color={colors.fixedWhite} />
          )
        }
        handleOnPressLeftNode={
          isAddDescription ? onPressDescClear : onPressBack
        }
        handleOnPressRightNode={
          isAddDescription && description ? onPressDescCheck : onPressDelete
        }
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={IMAGES.formTop} style={styles.image} />
        </View>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.listContainer}>
          <View style={styles.listChildContainer}>
            <Icon name="list" size={24} color={colors.gray400} />
            <Text style={styles.listTitle}>List:</Text>
            <Text style={styles.listLabel}>{list?.name}</Text>
          </View>
          <Pressable onPress={onPressMove}>
            <Text style={styles.move}>Move</Text>
          </Pressable>
        </View>
        <View style={styles.descContainer}>
          <Icon name="info-outline" size={24} color={colors.gray400} />
          {isAddDescription ? (
            <TextInput
              editable
              multiline
              numberOfLines={4}
              // maxLength={40}
              placeholder="Add card description"
              placeholderTextColor={colors.gray200}
              style={styles.input}
              autoFocus
              value={description}
              onChangeText={text => onChangeText(text)}
            />
          ) : (
            <Pressable onPress={() => setIsAddDescription(true)}>
              <Text style={styles.input}>{desc || 'Add card description'}</Text>
            </Pressable>
          )}
        </View>
        {/* <Text style={styles.border} /> */}
        {/* <TouchableOpacity style={styles.dateContainer}>
          <Icon name="access-time" size={24} color={colors.gray400} />
          <Text style={styles.date}>Start Date</Text>
        </TouchableOpacity>
        <Text style={styles.smallBorder} />
        <TouchableOpacity style={styles.dateContainer}>
          <Icon
            name="check-box-outline-blank"
            size={24}
            color={colors.gray400}
          />
          <Text style={styles.date}>Due Date</Text>
        </TouchableOpacity> */}
        {/* <Text style={styles.border} /> */}
      </ScrollView>
      <CustomModal
        visible={isVisible}
        onPressClear={onPressClear}
        onPressCheck={onPressCheck}>
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

export default CardDetails;
