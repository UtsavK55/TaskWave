import {createDrawerNavigator} from '@react-navigation/drawer';

import {ROUTES} from '@constants';
import CustomDrawerContent from '@components/customDrawerContent';

import BoardsStackScreen from './BoardsStackScreen';
import MyCardsStackScreen from './MyCardsStackScreen';

const Drawer = createDrawerNavigator<DrawerScreenParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name={ROUTES.DRAWER.BOARDS}
        component={BoardsStackScreen}
      />
      <Drawer.Screen
        name={ROUTES.DRAWER.CARDS}
        component={MyCardsStackScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
