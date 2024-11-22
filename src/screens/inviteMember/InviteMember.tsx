import {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import NoDataFound from '@components/noDataFound';

import {colorArray} from '@constants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {getInitials, isAndroid, truncateText} from '@helpers';
import useTheme from '@hooks/useTheme';
import {fetchData, updateData} from '@network/apiMethods';
import {addMemberUrl, searchMemberUrl} from '@network/apiUrls';

import {inviteMemberStyles} from './styles';

const InviteMember = () => {
  const styles = inviteMemberStyles();
  const {token} = useUserLoginContext();
  const {colors} = useTheme();
  const boardNavigation = useNavigation<BoardsNavigationType>();
  const route =
    useRoute<RouteProp<BoardsScreenParamList, 'INVITE_MEMBER_SCREEN'>>();
  const {boardId} = route?.params;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedMembers, setSearchedMembers] = useState<AllBoardMembers>([]);

  const getAllData = async () => {
    const memberInfo = await fetchData(searchMemberUrl(token, searchTerm));
    const members = memberInfo.map(({id, fullName, username}: BoardMember) => ({
      id,
      fullName,
      username,
    }));
    setSearchedMembers(members);
    console.log(memberInfo);
  };

  useEffect(() => {
    if (searchTerm?.length > 1) {
      getAllData();
    }
  }, [searchTerm]);

  const onPressBack = () => {
    boardNavigation.goBack();
  };

  const onPressAdd = (id: string) => {
    updateData(addMemberUrl(token, boardId, id));
  };

  const renderMemberCard = ({item}: {item: BoardMember}) => {
    const {id, fullName, username} = item;
    const initials = getInitials(fullName);
    return (
      <>
        {id && (
          <View key={id} style={styles.memberCardContainer}>
            <Text
              style={[
                styles.memberInitials,
                {
                  backgroundColor:
                    colorArray[Math.floor(Math.random() * colorArray.length)],
                },
              ]}>
              {initials}
            </Text>
            <View style={styles.memberInfoContainer}>
              <Text style={styles.memberFullName}>
                {truncateText(fullName, 25)}
              </Text>
              <Text style={styles.memberUsername}>
                {truncateText(username, 25)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onPressAdd(item?.id)}
              style={styles.addButtonContainer}>
              <HeaderIcon name="add" size={28} color={colors.fixedblue700} />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <BaseContainer bgColor={colors.gray50}>
      <Header
        headerText="Invite Member"
        leftNode={
          <HeaderIcon name={isAndroid ? 'arrow-back' : 'arrow-back-ios-new'} />
        }
        handleOnPressLeftNode={onPressBack}
      />

      <View style={styles.searchBar}>
        <HeaderIcon name="search" size={24} color={colors.gray800} />
        <TextInput
          style={styles.searchInput}
          placeholder="Name, Email, Username"
          placeholderTextColor={colors.gray200}
          autoCapitalize="none"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        data={searchedMembers}
        renderItem={renderMemberCard}
        ListEmptyComponent={
          <NoDataFound item="member" style={styles.noDataText} />
        }
      />
    </BaseContainer>
  );
};

export default InviteMember;
