import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {FlatList, Pressable, Text, View, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseContainer from '@components/baseContainer';
import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';
import Loader from '@components/loader';
import NoDataFound from '@components/noDataFound';

import {IMAGES} from '@constants/imageConstants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {isAndroid} from '@helpers';
import useScalingMetrics from '@hooks/useScalingMetrics';
import useTheme from '@hooks/useTheme';
import {addData, fetchData} from '@network/apiMethods';
import {createBoardUrl, getCustomBgUrl} from '@network/apiUrls';

import {addBoardStyles} from './styles';

const AddBoard = () => {
  const {token} = useUserLoginContext();
  const styles = addBoardStyles();
  const {colors, backgrounds, fonts} = useTheme();
  const boardNavigation = useNavigation<BoardsNavigationType>();
  const {isLandscape} = useScalingMetrics();

  const [customBgPics, setCustomBgPics] = useState<AllCustomBgPics>([]);
  const [boardName, setBoardName] = useState<string>('');
  const [bgImageId, setBgImageId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllData = async () => {
    setIsLoading(true);
    const customBg = await fetchData(getCustomBgUrl(token));
    const customPics = customBg.filter(
      ({pack}: {pack: {name: string}}) => pack?.name === 'Photos',
    );
    const customPictures = customPics.map(({id, scaled}: CustomBg) => ({
      id,
      backgroundImageUrl: scaled?.[2]?.url,
    }));
    setCustomBgPics(customPictures);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const onPressBack = () => {
    boardNavigation.goBack();
  };

  const onInputChange = (value: string) => {
    setBoardName(value);
  };

  const onPressCard = (imageId: string) => {
    setBgImageId(imageId);
  };

  const onPressCreateBoard = async () => {
    if (boardName && bgImageId) {
      await addData(createBoardUrl(token, boardName, bgImageId));
      boardNavigation.goBack();
    }
  };

  const renderBgCard = ({item}: {item: CustomBgPic}) => {
    return (
      <Pressable onPress={() => onPressCard(item?.id)}>
        <View style={styles.cardContainer}>
          <FastImage
            source={{uri: item?.backgroundImageUrl}}
            style={styles.image}
            defaultSource={IMAGES.titleImg}
          />
          {bgImageId === item?.id && (
            <Icon
              name="check-circle"
              size={24}
              color={colors.blue700}
              style={styles.check}
            />
          )}
        </View>
      </Pressable>
    );
  };

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  return (
    <BaseContainer>
      <Header
        headerText="Create Board"
        leftNode={
          <HeaderIcon name={isAndroid ? 'arrow-back' : 'arrow-back-ios-new'} />
        }
        handleOnPressLeftNode={onPressBack}
      />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Board</Text>
        <TextInput
          placeholder="Enter board name"
          placeholderTextColor={colors.gray200}
          autoFocus
          style={styles.input}
          onChangeText={value => onInputChange(value)}
        />
        <Text style={styles.sectionTitle}>Board Background</Text>
        <FlatList
          horizontal={isLandscape()}
          data={customBgPics}
          renderItem={renderBgCard}
          numColumns={isLandscape() ? 0 : 2}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<NoDataFound item="background image" />}
          key={isLandscape() ? 'landscape' : 'portrait'}
        />
        <Pressable onPress={onPressCreateBoard}>
          <Text
            style={[
              boardName && bgImageId ? fonts.fixedWhite : fonts.gray200,
              boardName && bgImageId
                ? backgrounds.fixedblue700
                : backgrounds.gray50,
              styles.buttonText,
            ]}>
            Create Board
          </Text>
        </Pressable>
      </View>
    </BaseContainer>
  );
};

export default AddBoard;
