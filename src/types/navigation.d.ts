import {ROUTES} from '@constants';

declare global {
  type AuthScreenNames = keyof typeof ROUTES.AUTH;
  type AuthScreenParamList = Record<AuthScreenNames, undefined>;
  type AuthNavigationType = NavigationProp<AuthScreenParamList>;

  type DrawerScreenNames = keyof typeof ROUTES.DRAWER;
  type DrawerScreenParamList = Record<DrawerScreenNames, undefined>;
  type DrawerNavigationType = NavigationProp<DrawerScreenParamList>;

  type BoardsScreenNames = keyof typeof ROUTES.BOARDS_STACK_SCREEN;
  type BoardsScreenParamList = {
    BOARDS_SCREEN: undefined;
    LISTS_SCREEN: {
      boardId: string;
      boardName: string;
      backgroundImageUrl: string;
      fromScreen: string;
    };
    CARD_DETAILS_SCREEN: {fromScreen: string; cardId: string};
    ADD_BOARD_SCREEN: undefined;
    SETTINGS_SCREEN: {boardId: string};
    INVITE_MEMBER_SCREEN: {boardId: string};
  };
  type BoardsNavigationType = NavigationProp<BoardsScreenParamList>;

  type MyCardsScreenNames = keyof typeof ROUTES.BOARDS_STACK_SCREEN;
  type MyCardsScreenParamList = {
    MY_CARDS: undefined;
    CARD_DETAILS_SCREEN: {fromScreen: string; cardId: string};
  };
  type MyCardsNavigationType = NavigationPropMyCards<ScreenParamList>;

  interface DrawerItemProps {
    routeName: string;
    iconName: string;
    label: string;
    isActive: boolean;
    onPress: () => void;
    colors: Colors;
    styles: Record<string, any>;
    scaleSize: (size: number, factor?: number | undefined) => number;
  }
}
