import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import SplashScreen from '@components/splashScreen';
import {linking, ROUTES} from '@constants';
import {UserLoginProvider} from '@contexts/Loginprovider';
import ThemeProvider from '@contexts/ThemeProvider';
import Navigator from '@navigation/Navigator';

function App(): React.JSX.Element {
  const [isSplashScreen, setIsSplahScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplahScreen(false);
    }, 3100);
  }, []);
  return (
    <UserLoginProvider>
      <ThemeProvider>
        <NavigationContainer linking={linking}>
          {isSplashScreen ? <SplashScreen /> : <Navigator />}
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </UserLoginProvider>
  );
}

export default App;
