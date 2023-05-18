
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Screens
import SplashScreen from '../../screens/auth/Splash/Splash';

const Stack = createNativeStackNavigator();

function AuthNav() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen}
        options={{
        headerShown: false,
        }} />
      </Stack.Navigator>

  );
}

export default AuthNav;