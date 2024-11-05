import {ROUTES} from '@constants/index';

declare global {
  type AuthScreenNames = keyof typeof ROUTES.AUTH;
  type AuthScreenParamList = Record<AuthScreenNames, undefined>;
  type AuthNavigationType = NavigationProp<AuthScreenParamList>;

  type DrawerScreenNames = keyof typeof ROUTES.DRAWER;
  type DrawerScreenParamList = Record<DrawerScreenNames, undefined>;
  type DrawerNavigationType = NavigationProp<DrawerScreenParamList>;

  type BoardsScreenNames = keyof typeof ROUTES.BOARDS_STACK_SCREEN;
  type BoardsScreenParamList = Record<BoardsScreenNames, undefined>;
  type BoardsNavigationType = NavigationProp<BoardScreenParamList>;
}
