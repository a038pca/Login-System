import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screens } from './types/navigation';
import Login from './screens/login';
import ResetPassword from './screens/login/ResetPassword';
import Welcome from './screens/login/Welcome';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: '#FFFFFF',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'OpenSans-SemiBold',
          },
        }}>
        <Stack.Screen
          name={Screens.Login}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={Screens.ResetPassword} component={ResetPassword} />
        <Stack.Screen
          name={Screens.Welcome}
          component={Welcome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
