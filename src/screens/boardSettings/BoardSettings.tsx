import {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import Loader from '@components/loader';
import NoDataFound from '@components/noDataFound';
import ShowToast from '@components/showToast';

import {colorArray, ROUTES} from '@constants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {getInitials, isAndroid, truncateText} from '@helpers';
import useTheme from '@hooks/useTheme';
import {deleteData, fetchData, updateData} from '@network/apiMethods';
import {
  archiveListUrl,
  deleteMemberUrl,
  getArchiveListUrl,
  getMembersOfBoardUrl,
  getUserUrl,
} from '@network/apiUrls';

import {settingStyles} from './styles';

const renderCard = ({
  item,
  onPressUnarchive,
  styles,
  colors,
  gutters,
}: {
  item: ListInfo;
  onPressUnarchive: (id: string) => void;
  styles: Record<string, any>;
  colors: Colors;
  gutters: Gutters;
}) => (
  <TouchableOpacity onPress={() => onPressUnarchive(item.id)}>
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Icon
        name="unarchive"
        size={24}
        color={colors.fixedblue700}
        style={gutters.marginHorizontal_12}
      />
    </View>
  </TouchableOpacity>
);

const renderMemberCard = ({
  item,
  styles,
  onPressRemove,
  userData,
}: {
  item: BoardMember;
  styles: Record<string, any>;
  onPressRemove: (id: string) => void;
  userData: UserDetails;
}) => {
  const {id, fullName, username} = item;
  const initials = getInitials(fullName);
  return (
    <View key={id} style={styles.memberContainer}>
      <Text
        style={[
          styles.initials,
          {
            backgroundColor:
              colorArray[Math.floor(Math.random() * colorArray.length)],
          },
        ]}>
        {initials}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info1}>{truncateText(fullName, 25)}</Text>
        <Text style={styles.info2}>{truncateText(username, 25)}</Text>
      </View>
      {userData.id != item?.id && (
        <TouchableOpacity
          onPress={() => onPressRemove(id)}
          style={styles.removeContainer}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Section = ({
  iconName,
  sectionTitle,
  data,
  renderItem,
  ListEmptyComponent,
  onPressInvite,
  inviteText,
  keyExtractor,
  styles,
  colors,
}: SectionProps) => (
  <View style={styles.container}>
    <HeaderIcon name={iconName} size={28} color={colors.gray200} />
    <View style={styles.childContainer}>
      <Text style={styles.sectionTitle}>
        {sectionTitle} ({data?.length || 0})
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={keyExtractor}
      />
      {onPressInvite && inviteText && (
        <TouchableOpacity onPress={onPressInvite}>
          <Text style={styles.invite}>{inviteText}</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const BoardSettings = () => {
  const isFocused = useIsFocused();
  const {token} = useUserLoginContext();
  const {gutters, colors} = useTheme();
  const boardNavigation = useNavigation<BoardsNavigationType>();
  const route = useRoute<RouteProp<BoardsScreenParamList, 'SETTINGS_SCREEN'>>();
  const {boardId} = route?.params;

  const styles = settingStyles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lists, setLists] = useState<AllLists>([]);
  const [allMembers, setAllMembers] = useState<AllBoardMembers>([]);
  const [userData, setUserData] = useState<UserDetails>({
    id: '',
    email: '',
    fullName: '',
    initials: '',
    username: '',
  });

  const getAllData = useCallback(async () => {
    setIsLoading(true);
    const allListsInfo = await fetchData(getArchiveListUrl(token, boardId));
    const allLists: AllLists = allListsInfo.map(({id, name}: ListInfo) => ({
      id,
      name,
    }));
    setLists(allLists);

    const allMembersInfo = await fetchData(
      getMembersOfBoardUrl(token, boardId),
    );
    setAllMembers(allMembersInfo);

    const user = await fetchData(getUserUrl(token));
    const {id, email, fullName, initials, username} = user;
    setUserData({id, email, fullName, initials, username});

    setIsLoading(false);
  }, [token, boardId]);

  useEffect(() => {
    getAllData();
  }, [getAllData, isFocused]);

  const onPressBack = () => {
    boardNavigation.goBack();
  };

  const onPressUnarchive = (listId: string) => {
    Alert.alert(
      'Unarchive List',
      'Are you sure you want to unarchive this list',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Unarchive',
          style: 'destructive',
          onPress: async () => {
            await updateData(archiveListUrl(token, listId, false));
            getAllData();
            ShowToast('success', 'List unarchived successfully');
          },
        },
      ],
    );
  };

  const onPressRemove = (id: string) => {
    Alert.alert(
      'Remove member',
      'Are you sure you want to remove this member?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await deleteData(deleteMemberUrl(token, boardId, id));
            getAllData();
            ShowToast('success', 'Member removed successfully');
          },
        },
      ],
    );
  };

  const onPressInvite = () => {
    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.INVITE_MEMBER_SCREEN, {
      boardId: boardId,
    });
  };

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <BaseContainer bgColor={colors.gray50}>
      <Header
        headerText="Board Settings"
        leftNode={
          <HeaderIcon name={isAndroid ? 'arrow-back' : 'arrow-back-ios-new'} />
        }
        handleOnPressLeftNode={onPressBack}
      />
      <Section
        iconName="person-outline"
        sectionTitle="Board Members"
        data={allMembers}
        renderItem={({item}: {item: BoardMember}) =>
          renderMemberCard({item, styles, onPressRemove, userData})
        }
        ListEmptyComponent={(<NoDataFound item="member" />) as React.ReactNode}
        onPressInvite={onPressInvite}
        inviteText="Invite"
        styles={styles}
        colors={colors}
      />
      <Section
        iconName="archive"
        sectionTitle="Archived lists"
        data={lists}
        renderItem={({item}: {item: ListInfo}) =>
          renderCard({item, onPressUnarchive, styles, colors, gutters})
        }
        keyExtractor={item => item.id}
        styles={styles}
        colors={colors}
      />
    </BaseContainer>
  );
};

export default BoardSettings;
