import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddBoard from '@screens/addBoard/AddBoard';
import Boards from '@screens/boards/Boards';
import BoardSettings from '@screens/boardSettings/BoardSettings';
import CardDetails from '@screens/cardDetails/CardDetails';
import Lists from '@screens/lists/Lists';
import Notification from '@screens/notification/Notification';
import Search from '@screens/search/Search';
import {ROUTES} from '@constants';

const BoardsStackScreen = () => {
  const BoardsStack = createNativeStackNavigator<BoardsScreenParamList>();

  return (
    <BoardsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.BOARDS_SCREEN}
        component={Boards}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.ADD_BOARD_SCREEN}
        component={AddBoard}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.LISTS_SCREEN}
        component={Lists}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.NOTIFICATION_SCREEN}
        component={Notification}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.SETTINGS_SCREEN}
        component={BoardSettings}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.SEARCH_SCREEN}
        component={Search}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.CARD_DETAILS_SCREEN}
        component={CardDetails}
      />
    </BoardsStack.Navigator>
  );
};
export default BoardsStackScreen;
