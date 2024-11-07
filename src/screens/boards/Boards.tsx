import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import NoDataFound from '@components/noDataFound';
import {ROUTES} from '@constants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import useTheme from '@hooks/useTheme';
import {fetchData} from '@network/apiMethods';
import {allBoardsUrl} from '@network/apiUrls';

import {boardStyles} from './styles';

const Boards = () => {
  const {colors} = useTheme();
  const styles = boardStyles();
  const {token} = useUserLoginContext();
  const drawerNavigation = useNavigation<DrawerNavigationType>();
  const boardNavigation = useNavigation<BoardsNavigationType>();

  const [boards, setBoards] = useState<AllBoards>([]);

  const getAllBoards = async () => {
    const allBoardsInfo = await fetchData(allBoardsUrl(token));

    const allBoards: AllBoards = allBoardsInfo.map(
      ({id, name, prefs}: BoardInfo) => ({
        id,
        name,
        backgroundImageUrl: prefs?.backgroundImageScaled?.[5]?.url,
      }),
    );

    setBoards(allBoards);
  };

  useEffect(() => {
    getAllBoards();
  }, []);

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
    });
  };
  const onPressAddIcon = () => {
    boardNavigation.navigate(ROUTES.BOARDS_STACK_SCREEN.ADD_BOARD_SCREEN);
  };

  const renderBoardCard = (item: MappedBoard) => {
    const {name, backgroundImageUrl} = item;
    return (
      <TouchableOpacity onPress={() => onPressBoardCard(item)}>
        <View style={styles.cardContainer}>
          <Image source={{uri: backgroundImageUrl}} style={styles.image} />
          <Text style={styles.cardTitle}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BaseContainer>
      <Header
        headerText="Boards"
        leftNode={<HeaderIcon name="menu" />}
        rightNode={<HeaderIcon name="search" />}
        handleOnPressLeftNode={onPressDrawer}
        handleOnPressRightNode={onPressSearch}
      />
      <FlatList
        data={boards}
        renderItem={({item}) => renderBoardCard(item)}
        ListEmptyComponent={<NoDataFound item="board" />}
      />

      <TouchableOpacity onPress={onPressAddIcon}>
        <Icon name="add" size={32} style={styles.addIcon} />
      </TouchableOpacity>
    </BaseContainer>
  );
};

export default Boards;
