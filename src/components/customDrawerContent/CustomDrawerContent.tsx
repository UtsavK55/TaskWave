import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import BaseContainer from '@components/baseContainer';
import {ROUTES, STORAGE_KEYS} from '@constants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import useScalingMetrics from '@hooks/useScalingMetrics';
import useTheme from '@hooks/useTheme';
import {fetchData} from '@network/apiMethods';
import {getUserUrl} from '@network/apiUrls';
import {storeData} from '@storage';

import {drawerStyles} from './styles';

const useFetchUserData = (token: string) => {
  const [userData, setUserData] = useState<UserDetails>({
    id: '',
    email: '',
    fullName: '',
    initials: '',
    username: '',
  });

  useEffect(() => {
    const getUserData = async () => {
      const user = await fetchData(getUserUrl(token));
      const {id, email, fullName, initials, username} = user;
      setUserData({id, email, fullName, initials, username});
    };

    if (token) {
      getUserData();
    }
  }, [token]);

  return userData;
};

const DrawerItem = ({
  routeName,
  iconName,
  label,
  isActive,
  onPress,
  colors,
  styles,
  scaleSize,
}: DrawerItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.drawerItem, isActive && styles.activeItem]}
      onPress={onPress}>
      <Icon
        name={iconName}
        size={scaleSize(24)}
        color={isActive ? colors.blue700 : colors.black}
      />
      <Text style={[styles.itemTitle, isActive && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({
  navigation,
  state,
}: DrawerContentComponentProps) => {
  const styles = drawerStyles();
  const {token, setToken} = useUserLoginContext();
  const {colors} = useTheme();
  const {scaleSize} = useScalingMetrics();
  const activeRoute = state?.routeNames[state.index];

  const isActive = (routeName: string) => routeName === activeRoute;

  const userData = useFetchUserData(token);

  const {initials, fullName, username, email} = userData;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          setToken('');
          storeData('', STORAGE_KEYS.TOKEN);
        },
      },
    ]);
  };

  return (
    <BaseContainer>
      <View style={styles.container}>
        <Text style={styles.initials}>{initials}</Text>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.userInfo}>@{username}</Text>
        <Text style={styles.userInfo}>{email}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Icon
            name="exit-outline"
            size={scaleSize(28)}
            color={colors.fixedWhite}
          />
        </TouchableOpacity>
      </View>

      <DrawerItem
        routeName={ROUTES.DRAWER.BOARDS}
        iconName="grid-outline"
        label="Boards"
        isActive={isActive(ROUTES.DRAWER.BOARDS)}
        onPress={() => navigation.navigate(ROUTES.DRAWER.BOARDS)}
        colors={colors}
        styles={styles}
        scaleSize={scaleSize}
      />

      <DrawerItem
        routeName={ROUTES.DRAWER.CARDS}
        iconName="card-outline"
        label="My Cards"
        isActive={isActive(ROUTES.DRAWER.CARDS)}
        onPress={() => navigation.navigate(ROUTES.DRAWER.CARDS)}
        colors={colors}
        styles={styles}
        scaleSize={scaleSize}
      />
    </BaseContainer>
  );
};

export default CustomDrawerContent;
