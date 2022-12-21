import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Main from '@screens/Main';
import Search from '@screens/Search';
import Login from '@screens/Login';
import Register from '@/screens/Register';
import Shop from '@screens/Shop';
import Reservation from '@/screens/Reservation';
import ReservationResult from '@/screens/ReservationResult';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Reservation" component={Reservation} />
      <Stack.Screen name="ReservationResult" component={ReservationResult} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
