import {LinkingOptions} from '@react-navigation/native';

export const STORAGE_KEYS = {
  TOKEN: 'token',
  DARK_MODE: 'darkMode',
};

export const ROUTES = {
  AUTH: {LOGIN: 'LOGIN'},
  DRAWER: {
    BOARDS: 'BOARDS',
    CARDS: 'CARDS',
  },
  BOARDS_STACK_SCREEN: {
    BOARDS_SCREEN: 'BOARDS_SCREEN',
    LISTS_SCREEN: 'LISTS_SCREEN',
    CARD_DETAILS_SCREEN: 'CARD_DETAILS_SCREEN',
    ADD_BOARD_SCREEN: 'ADD_BOARD_SCREEN',
    SEARCH_SCREEN: 'SEARCH_SCREEN',
    NOTIFICATION_SCREEN: 'NOTIFICATION_SCREEN',
    SETTINGS_SCREEN: 'SETTINGS_SCREEN',
  },
  MY_CARDS_STACK_SCREEN: {
    MY_CARDS: 'MY_CARDS',
  },
} as const;

export const linking: LinkingOptions<DrawerScreenParamList> = {
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
    },
  },
};

export const tokenRegex = /#token=([A-Za-z0-9]+)/;

export const memberArr = ['6728b504337c552301114468'];

export const colorArray = [
  'skyblue',
  '#DFDFDF',
  'cyan',
  'lavender',
  'orange',
  'pink',
  'orange',
  'yellow',
  'purple',
  'gray',
  'black',
  'red',
  '#80d4ff',
  '#034ef2',
];
