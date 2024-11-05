import {createDrawerNavigator} from '@react-navigation/drawer';

import {ROUTES} from '@constants/index';
import BoardsStackScreen from '@navigation/BoardsStackScreen';
import MyCards from '@screens/myCards/MyCards';
import Settings from '@screens/settings/Settings';

const Drawer = createDrawerNavigator<DrawerScreenParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name={ROUTES.Drawer.BOARDS}
        component={BoardsStackScreen}
      />
      <Drawer.Screen name={ROUTES.Drawer.CARDS} component={MyCards} />
      <Drawer.Screen name={ROUTES.Drawer.SETTINGS} component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
