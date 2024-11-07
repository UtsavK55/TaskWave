import {useEffect} from 'react';
import {Linking, SafeAreaView} from 'react-native';

import DrawerNavigator from '@navigation/DrawerNavigator';
import AuthNavigator from '@navigation/AuthNavigator';
import ShowToast from '@components/showToast';
import {useUserLoginContext} from '@contexts/Loginprovider';
import {STORAGE_KEYS, tokenRegex} from '@constants';
import useTheme from '@hooks/useTheme';
import {storeData} from '@storage';

const Navigator = () => {
  const {token, setToken} = useUserLoginContext();
  const {layout} = useTheme();

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

  return (
    <SafeAreaView style={layout.flex_1}>
      {token ? <DrawerNavigator /> : <AuthNavigator />}
    </SafeAreaView>
  );
};

export default Navigator;
