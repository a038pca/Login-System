import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screens } from './enum/screens';
import Login from './screens/login';
import ResetPassword from './screens/login/ResetPassword';
import Welcome from './screens/login/Welcome';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Screens.Login} component={Login} />
        <Stack.Screen name={Screens.ResetPassword} component={ResetPassword} />
        <Stack.Screen name={Screens.Welcome} component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
