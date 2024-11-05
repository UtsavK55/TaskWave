import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '@screens/login/Login';
import {ROUTES} from '@constants';

const AuthStack = createNativeStackNavigator<AuthScreenParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={ROUTES.AUTH.LOGIN} component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
