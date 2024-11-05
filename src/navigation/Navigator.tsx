import {useEffect} from 'react';
import {Linking} from 'react-native';

import DrawerNavigator from '@navigation/DrawerNavigator';
import AuthNavigator from '@navigation/AuthNavigator';
import ShowToast from '@components/showToast';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {STORAGE_KEYS, tokenRegex} from '@constants/index';
import {storeData} from '@storage/index';

const Navigator = () => {
  const {token, setToken} = useUserLoginContext();

  useEffect(() => {
    Linking.addEventListener('url', ({url}) => {
      const tokenPattern = tokenRegex;
      const match = url.match(tokenPattern);
      if (match && match[1]) {
        setToken(match[1]);
        storeData(match[1], STORAGE_KEYS.TOKEN);
      } else {
        ShowToast('error', 'Invalid Login', 'User could not be Logged in');
      }
    });
  }, []);

  return <>{token ? <DrawerNavigator /> : <AuthNavigator />}</>;
};

export default Navigator;
