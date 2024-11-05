import {createDrawerNavigator} from '@react-navigation/drawer';

import {ROUTES} from '@constants';
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
        name={ROUTES.DRAWER.BOARDS}
        component={BoardsStackScreen}
      />
      <Drawer.Screen name={ROUTES.DRAWER.CARDS} component={MyCards} />
      <Drawer.Screen name={ROUTES.DRAWER.SETTINGS} component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
