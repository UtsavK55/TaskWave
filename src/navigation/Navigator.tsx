import {useEffect} from 'react';
import {Linking, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import ShowToast from '@components/showToast';
import CustomStatusBar from '@components/customStatusBar';
import {STORAGE_KEYS, tokenRegex} from '@constants';
import {useUserLoginContext} from '@contexts/Loginprovider';
import useTheme from '@hooks/useTheme';
import DrawerNavigator from '@navigation/DrawerNavigator';
import Login from '@screens/login/Login';
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
    <SafeAreaProvider>
      <CustomStatusBar />
      <SafeAreaView style={layout.flex_1}>
        {token ? <DrawerNavigator /> : <Login />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Navigator;
