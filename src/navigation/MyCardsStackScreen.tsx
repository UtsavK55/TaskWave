import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '@constants';
import MyCards from '@screens/myCards/MyCards';

const MyCardsStackScreen = () => {
  const MyCardsStack = createNativeStackNavigator<MyCardsScreenParamList>();

  return (
    <MyCardsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MyCardsStack.Screen
        name={ROUTES.MY_CARDS_STACK_SCREEN.MY_CARDS}
        component={MyCards}
      />
    </MyCardsStack.Navigator>
  );
};
export default MyCardsStackScreen;
