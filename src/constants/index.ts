import {Dimensions} from 'react-native';

export const STORAGE_KEYS = {
  TOKEN: 'token',
  DARK_MODE: 'darkMode',
};

export const ROUTES = {
  AUTH: {LOGIN: 'LOGIN'},
  DRAWER: {
    BOARDS: 'BOARDS',
    CARDS: 'CARDS',
    SETTINGS: 'SETTINGS',
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
} as const;

export const tokenRegex = /#token=([A-Za-z0-9]+)/;

export const logoImg = require('@assets/logo.png');
export const titleImg = require('@assets/taskWave.png');

export const {width: windowWidth, height: windowHeight} =
  Dimensions.get('window');
