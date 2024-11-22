import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '@constants';
import AddBoard from '@screens/addBoard/AddBoard';
import Boards from '@screens/boards/Boards';
import BoardSettings from '@screens/boardSettings/BoardSettings';
import CardDetails from '@screens/cardDetails/CardDetails';
import Lists from '@screens/lists/Lists';
import InviteMember from '@screens/inviteMember/InviteMember';

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
        name={ROUTES.BOARDS_STACK_SCREEN.SETTINGS_SCREEN}
        component={BoardSettings}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.CARD_DETAILS_SCREEN}
        component={CardDetails}
      />
      <BoardsStack.Screen
        name={ROUTES.BOARDS_STACK_SCREEN.INVITE_MEMBER_SCREEN}
        component={InviteMember}
      />
    </BoardsStack.Navigator>
  );
};
export default BoardsStackScreen;
