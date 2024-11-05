import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {UserLoginProvider} from '@contexts/Loginprovider';
import ThemeProvider from '@contexts/ThemeProvider/ThemeProvider';
import Navigator from '@navigation/Navigator';
import {ROUTES} from '@constants/index';

function App(): React.JSX.Element {

  const linking: LinkingOptions<DrawerScreenParamList> = {
    prefixes: ['taskwave://', 'taskwave://boards'],
    config: {
      screens: {
        [ROUTES.DRAWER.BOARDS]: {
          screens: {
            [ROUTES.BOARDS_STACK_SCREEN.BOARDS_SCREEN]: 'boards',
            [ROUTES.BOARDS_STACK_SCREEN.ADD_BOARD_SCREEN]: 'add-board',
            [ROUTES.BOARDS_STACK_SCREEN.LISTS_SCREEN]: 'lists',
            [ROUTES.BOARDS_STACK_SCREEN.NOTIFICATION_SCREEN]: 'notification',
            [ROUTES.BOARDS_STACK_SCREEN.SETTINGS_SCREEN]: 'board-settings',
            [ROUTES.BOARDS_STACK_SCREEN.SEARCH_SCREEN]: 'search',
            [ROUTES.BOARDS_STACK_SCREEN.CARD_DETAILS_SCREEN]: {
              path: 'card/:cardId',
              parse: {
                cardId: (cardId: string) => parseInt(cardId, 10),
              },
            },
          },
        },
        [ROUTES.DRAWER.CARDS]: 'cards',
        [ROUTES.DRAWER.SETTINGS]: 'settings',
      },
    },
  };

  return (
    <UserLoginProvider>
      <ThemeProvider>
        <NavigationContainer linking={linking}>
          <Navigator />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </UserLoginProvider>
  );
}

export default App;
