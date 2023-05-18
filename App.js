import './src/api/ignorewarnings'
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
import MainSplash from './src/screens/auth/MainSplash';
import SplashScreen from './src/screens/auth/Splash/Splash';
import Drawerroute from './src/navigation/Drawer/Drawer';
import LocationDetail from './src/screens/DrawerScreens/WalkingRoutes/Location Details/LocationDetail';
import Reviews from './src/screens/DrawerScreens/WalkingRoutes/Reviews/Reviews';
import ParkCars from './src/screens/DrawerScreens/WalkingRoutes/Saved Location/ParkCars';
import RouteDirection from './src/screens/DrawerScreens/MapRouteDirection/RouteDirection';

import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();
function App() {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainSplash"
            component={MainSplash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
  
          <Stack.Screen
            name="Drawerroute"
            component={Drawerroute}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LocationDetail"
            component={LocationDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ParkCars"
            component={ParkCars}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RouteDirection"
            component={RouteDirection}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
