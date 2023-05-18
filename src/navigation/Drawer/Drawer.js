import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Screens
import {DrawerContent} from '../CustomDrawer/Drawercontent';
import MapSearch from '../../screens/DrawerScreens/MapSearchView/MapSearch';
import WalkingRouteSearch from '../../screens/DrawerScreens/WalkingRoutes/MapView/MapView';
import SavedLoctaion from '../../screens/DrawerScreens/WalkingRoutes/Saved Location/SavedLocation';
import PrivacyTerms from '../../screens/DrawerScreens/PrivacyPolicy/Privacy_Policy';

const Drawer = createDrawerNavigator();

export default function Drawerroute() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="MapSearch"
        component={MapSearch}
      />
  
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="WalkingRouteSearch"
        component={WalkingRouteSearch}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="SavedLoctaion"
        component={SavedLoctaion}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="PrivacyTerms"
        component={PrivacyTerms}
      />
    </Drawer.Navigator>
  );
}
