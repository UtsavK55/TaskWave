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
    SETTINGS_SCREEN: 'SETTINGS_SCREEN',
    INVITE_MEMBER_SCREEN: 'INVITE_MEMBER_SCREEN',
  },
  MY_CARDS_STACK_SCREEN: {
    MY_CARDS: 'MY_CARDS',
  },
} as const;

export const tokenRegex = /#token=([A-Za-z0-9]+)/;

export const memberArr = ['6728b504337c552301114468'];

export const colorArray = [
  'skyblue',
  '#DFDFDF',
  'cyan',
  'lavender',
  '#f04006',
  'orange',
  'pink',
  'orange',
  'purple',
  'gray',
  'black',
  'red',
  '#80d4ff',
  '#f04006',
  '#034ef2',
];

export const QUERY_KEYS = {
  BOARDS: 'boards',
  CARDS: 'cards',
  MY_CARDS: 'myCards',
};
